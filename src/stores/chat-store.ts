import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatRequestError } from "@/lib/ai/errors";
import { titleFromPrompt, conversationToMarkdown, conversationToText, downloadText } from "@/lib/formatting";
import { createId } from "@/lib/ids";
import { DEFAULT_MODEL_ID } from "@/lib/models";
import { validateMessage } from "@/lib/validation";
import { streamChat } from "@/services/ai/chat-client";
import { useSettingsStore } from "@/stores/settings-store";
import type { Attachment, ChatStatus, Conversation, Message } from "@/types/chat";

const MAX_CONVERSATIONS = 60;

let abortController: AbortController | null = null;

function nowIso() {
  return new Date().toISOString();
}

function sanitizeConversation(c: Conversation): Conversation {
  return {
    ...c,
    messages: c.messages.map((m) =>
      m.status === "streaming" || m.status === "pending"
        ? { ...m, status: "cancelled" as const, updatedAt: nowIso() }
        : m,
    ),
  };
}

function sortConversations(list: Conversation[]): Conversation[] {
  return [...list].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

interface ChatState {
  conversations: Conversation[];
  activeId: string | null;
  status: ChatStatus;
  drafts: Record<string, string>;
  hydrated: boolean;
  createConversation: (model?: string) => string;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  pinConversation: (id: string) => void;
  duplicateConversation: (id: string) => string | null;
  setModel: (model: string) => void;
  setDraft: (conversationId: string, draft: string) => void;
  sendMessage: (content: string, attachments?: Attachment[]) => Promise<void>;
  stopGeneration: () => void;
  retryMessage: (messageId: string) => Promise<void>;
  regenerate: (messageId: string) => Promise<void>;
  editAndResubmit: (messageId: string, content: string) => Promise<void>;
  setFeedback: (messageId: string, feedback: "up" | "down" | null) => void;
  exportConversation: (id: string, format: "md" | "json" | "txt") => void;
  importConversation: (raw: unknown) => string | null;
  clearAll: () => void;
}

function persistable(state: ChatState) {
  if (!useSettingsStore.getState().saveConversations) {
    return { conversations: [], activeId: null, drafts: {} };
  }
  return {
    conversations: state.conversations.slice(0, MAX_CONVERSATIONS).map((c) => ({
      ...c,
      messages: c.messages.map((m) => ({
        ...m,
        attachments: m.attachments?.map((a) =>
          a.dataUrl && a.dataUrl.length > 250_000 ? { ...a, dataUrl: undefined } : a,
        ),
      })),
    })),
    activeId: state.activeId,
    drafts: state.drafts,
  };
}

async function runGeneration(
  set: (fn: (s: ChatState) => Partial<ChatState> | ChatState) => void,
  get: () => ChatState,
  conversationId: string,
  assistantId: string,
) {
  abortController?.abort();
  const controller = new AbortController();
  abortController = controller;

  const conversation = get().conversations.find((c) => c.id === conversationId);
  if (!conversation) return;

  const settings = useSettingsStore.getState();
  const history = conversation.messages
    .filter((m) => m.id !== assistantId && (m.role === "user" || m.role === "assistant") && m.status !== "error")
    .map((m) => ({
      role: m.role,
      content: m.content,
      attachments: m.attachments,
    }));

  set(() => ({ status: "streaming" }));

  const patchAssistant = (patch: Partial<Message>) => {
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id !== conversationId
          ? c
          : {
              ...c,
              updatedAt: nowIso(),
              messages: c.messages.map((m) => (m.id === assistantId ? { ...m, ...patch, updatedAt: nowIso() } : m)),
            },
      ),
    }));
  };

  try {
    for await (const event of streamChat(
      {
        conversationId,
        messages: history,
        model: conversation.model,
        settings: settings.generation,
      },
      controller.signal,
    )) {
      if (event.type === "delta") {
        const current = get().conversations.find((c) => c.id === conversationId)?.messages.find((m) => m.id === assistantId);
        patchAssistant({
          status: "streaming",
          content: `${current?.content ?? ""}${event.text}`,
        });
      } else if (event.type === "usage") {
        patchAssistant({ usage: event.usage });
      } else if (event.type === "error") {
        patchAssistant({ status: "error", error: event.error });
        set(() => ({ status: "error" }));
        return;
      } else if (event.type === "done") {
        patchAssistant({ status: "complete" });
      }
    }
    const final = get().conversations.find((c) => c.id === conversationId)?.messages.find((m) => m.id === assistantId);
    if (final && final.status === "streaming") {
      patchAssistant({ status: "complete" });
    }
    set(() => ({ status: "idle" }));
  } catch (err) {
    if (controller.signal.aborted) {
      const current = get().conversations.find((c) => c.id === conversationId)?.messages.find((m) => m.id === assistantId);
      patchAssistant({
        status: current?.content ? "cancelled" : "cancelled",
        error: current?.content
          ? undefined
          : { code: "cancelled", message: "Generation stopped.", retryable: true },
      });
      set(() => ({ status: "idle" }));
      return;
    }
    const apiError =
      err instanceof ChatRequestError
        ? err.error
        : {
            code: "network",
            message: err instanceof Error ? err.message : "Failed to generate a response.",
            retryable: true,
          };
    patchAssistant({ status: "error", error: apiError });
    set(() => ({ status: "error" }));
  } finally {
    if (abortController === controller) abortController = null;
  }
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeId: null,
      status: "idle",
      drafts: {},
      hydrated: false,

      createConversation: (model) => {
        const id = createId("convo");
        const conversation: Conversation = {
          id,
          title: "New chat",
          model: model ?? get().conversations.find((c) => c.id === get().activeId)?.model ?? DEFAULT_MODEL_ID,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          messages: [],
        };
        set((s) => ({
          conversations: sortConversations([conversation, ...s.conversations]).slice(0, MAX_CONVERSATIONS),
          activeId: id,
        }));
        return id;
      },

      selectConversation: (id) => {
        if (get().status === "streaming") return;
        set({ activeId: id });
      },

      deleteConversation: (id) => {
        set((s) => {
          const conversations = s.conversations.filter((c) => c.id !== id);
          const drafts = { ...s.drafts };
          delete drafts[id];
          const activeId = s.activeId === id ? (conversations[0]?.id ?? null) : s.activeId;
          return { conversations, drafts, activeId };
        });
      },

      renameConversation: (id, title) => {
        const next = title.trim() || "Untitled";
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === id ? { ...c, title: next.slice(0, 80), updatedAt: nowIso() } : c,
          ),
        }));
      },

      pinConversation: (id) => {
        set((s) => ({
          conversations: sortConversations(
            s.conversations.map((c) => (c.id === id ? { ...c, pinned: !c.pinned, updatedAt: nowIso() } : c)),
          ),
        }));
      },

      duplicateConversation: (id) => {
        const source = get().conversations.find((c) => c.id === id);
        if (!source) return null;
        const nextId = createId("convo");
        const cloned: Conversation = {
          ...source,
          id: nextId,
          title: `${source.title} copy`,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          pinned: false,
          messages: source.messages.map((m) => ({
            ...m,
            id: createId("msg"),
            conversationId: nextId,
            status: m.status === "streaming" || m.status === "pending" ? "complete" : m.status,
          })),
        };
        set((s) => ({
          conversations: sortConversations([cloned, ...s.conversations]),
          activeId: nextId,
        }));
        return nextId;
      },

      setModel: (model) => {
        const { activeId } = get();
        if (!activeId) return;
        set((s) => ({
          conversations: s.conversations.map((c) => (c.id === activeId ? { ...c, model, updatedAt: nowIso() } : c)),
        }));
      },

      setDraft: (conversationId, draft) => {
        set((s) => ({ drafts: { ...s.drafts, [conversationId]: draft } }));
      },

      sendMessage: async (content, attachments) => {
        const trimmed = content.trim();
        const hasFiles = Boolean(attachments?.some((a) => a.status === "ready"));
        if (!trimmed && !hasFiles) return;
        if (trimmed) {
          const invalid = validateMessage(trimmed);
          if (invalid) throw new Error(invalid);
        }
        if (get().status === "streaming" || get().status === "submitting") return;

        let conversationId = get().activeId;
        if (!conversationId) conversationId = get().createConversation();
        const conversation = get().conversations.find((c) => c.id === conversationId);
        if (!conversation) return;

        const userMsg: Message = {
          id: createId("msg"),
          conversationId,
          role: "user",
          content: trimmed,
          createdAt: nowIso(),
          status: "complete",
          attachments: attachments?.filter((a) => a.status === "ready"),
        };
        const assistantMsg: Message = {
          id: createId("msg"),
          conversationId,
          role: "assistant",
          content: "",
          createdAt: nowIso(),
          status: "pending",
          model: conversation.model,
        };

        const isFirst = conversation.messages.length === 0;
        set((s) => ({
          status: "submitting",
          drafts: { ...s.drafts, [conversationId!]: "" },
          conversations: sortConversations(
            s.conversations.map((c) =>
              c.id !== conversationId
                ? c
                : {
                    ...c,
                    title: isFirst ? titleFromPrompt(trimmed || attachments?.[0]?.name || "New chat") : c.title,
                    updatedAt: nowIso(),
                    messages: [...c.messages, userMsg, assistantMsg],
                  },
            ),
          ),
        }));

        await runGeneration(set, get, conversationId, assistantMsg.id);
      },

      stopGeneration: () => {
        abortController?.abort();
      },

      retryMessage: async (messageId) => {
        const { activeId, conversations, status } = get();
        if (!activeId || status === "streaming") return;
        const convo = conversations.find((c) => c.id === activeId);
        if (!convo) return;
        const target = convo.messages.find((m) => m.id === messageId);
        if (!target || target.role !== "assistant") return;
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id !== activeId
              ? c
              : {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === messageId
                      ? { ...m, content: "", status: "pending", error: undefined, updatedAt: nowIso() }
                      : m,
                  ),
                },
          ),
        }));
        await runGeneration(set, get, activeId, messageId);
      },

      regenerate: async (messageId) => {
        await get().retryMessage(messageId);
      },

      editAndResubmit: async (messageId, content) => {
        const invalid = validateMessage(content);
        if (invalid) throw new Error(invalid);
        const { activeId, conversations, status } = get();
        if (!activeId || status === "streaming") return;
        const convo = conversations.find((c) => c.id === activeId);
        if (!convo) return;
        const index = convo.messages.findIndex((m) => m.id === messageId);
        if (index < 0 || convo.messages[index]?.role !== "user") return;

        const assistantMsg: Message = {
          id: createId("msg"),
          conversationId: activeId,
          role: "assistant",
          content: "",
          createdAt: nowIso(),
          status: "pending",
          model: convo.model,
        };

        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id !== activeId
              ? c
              : {
                  ...c,
                  title: index === 0 ? titleFromPrompt(content) : c.title,
                  updatedAt: nowIso(),
                  messages: [
                    ...c.messages.slice(0, index),
                    { ...c.messages[index]!, content: content.trim(), updatedAt: nowIso() },
                    assistantMsg,
                  ],
                },
          ),
        }));
        await runGeneration(set, get, activeId, assistantMsg.id);
      },

      setFeedback: (messageId, feedback) => {
        const { activeId } = get();
        if (!activeId) return;
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id !== activeId
              ? c
              : {
                  ...c,
                  messages: c.messages.map((m) => (m.id === messageId ? { ...m, feedback } : m)),
                },
          ),
        }));
      },

      exportConversation: (id, format) => {
        const convo = get().conversations.find((c) => c.id === id);
        if (!convo) return;
        const slug = convo.title.replace(/[^\w\s-]+/g, "").trim().slice(0, 40) || "conversation";
        if (format === "json") {
          downloadText(
            `${slug}.json`,
            JSON.stringify({ version: 1, conversation: convo }, null, 2),
            "application/json",
          );
          return;
        }
        const msgs = convo.messages.map((m) => ({ role: m.role, content: m.content }));
        if (format === "md") {
          downloadText(`${slug}.md`, conversationToMarkdown(convo.title, msgs), "text/markdown");
          return;
        }
        downloadText(`${slug}.txt`, conversationToText(convo.title, msgs), "text/plain");
      },

      importConversation: (raw) => {
        if (!raw || typeof raw !== "object") return null;
        const obj = raw as { version?: number; conversation?: Conversation; messages?: Message[] };
        const source = obj.conversation ?? (obj as Conversation);
        if (!source || !Array.isArray(source.messages)) return null;
        const id = createId("convo");
        const imported: Conversation = {
          id,
          title: typeof source.title === "string" ? source.title : "Imported chat",
          model: typeof source.model === "string" ? source.model : DEFAULT_MODEL_ID,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          pinned: false,
          messages: source.messages.map((m) => ({
            ...m,
            id: createId("msg"),
            conversationId: id,
            status: "complete",
          })),
        };
        set((s) => ({
          conversations: sortConversations([imported, ...s.conversations]),
          activeId: id,
        }));
        return id;
      },

      clearAll: () => {
        abortController?.abort();
        set({ conversations: [], activeId: null, drafts: {}, status: "idle" });
      },
    }),
    {
      name: "gemma-conversations",
      partialize: persistable,
      merge: (persisted, current) => {
        const p = persisted as Partial<ChatState> | undefined;
        const conversations = (p?.conversations ?? []).map(sanitizeConversation);
        return {
          ...current,
          ...p,
          conversations,
          status: "idle" as const,
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export function getActiveConversation(): Conversation | undefined {
  const { conversations, activeId } = useChatStore.getState();
  return conversations.find((c) => c.id === activeId);
}
