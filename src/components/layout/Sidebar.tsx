import {
  Download,
  MoreHorizontal,
  Pin,
  Plus,
  Search,
  Trash2,
  Copy,
  Pencil,
  Upload,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { conversationGroup, type DateGroup } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";
import { useUiStore } from "@/stores/ui-store";
import type { Conversation } from "@/types/chat";

const GROUP_ORDER: DateGroup[] = ["Pinned", "Today", "Yesterday", "Last 7 days", "Older"];

function ConversationRow({ conversation, active }: { conversation: Conversation; active: boolean }) {
  const selectConversation = useChatStore((s) => s.selectConversation);
  const deleteConversation = useChatStore((s) => s.deleteConversation);
  const renameConversation = useChatStore((s) => s.renameConversation);
  const pinConversation = useChatStore((s) => s.pinConversation);
  const duplicateConversation = useChatStore((s) => s.duplicateConversation);
  const exportConversation = useChatStore((s) => s.exportConversation);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState(conversation.title);

  return (
    <div
      className={cn(
        "group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm",
        active ? "bg-hover text-foreground" : "text-muted hover:bg-hover hover:text-foreground",
      )}
    >
      {renaming ? (
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            renameConversation(conversation.id, title);
            setRenaming(false);
          }}
        >
          <Input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              renameConversation(conversation.id, title);
              setRenaming(false);
            }}
            className="h-7"
          />
        </form>
      ) : (
        <button
          type="button"
          className="min-w-0 flex-1 truncate text-left"
          onClick={() => {
            selectConversation(conversation.id);
            setSidebarOpen(false);
          }}
        >
          {conversation.pinned ? <Pin className="mr-1 inline size-3 text-accent" /> : null}
          {conversation.title}
        </button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label="Conversation actions"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setRenaming(true)}>
            <Pencil className="size-3.5" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => pinConversation(conversation.id)}>
            <Pin className="size-3.5" /> {conversation.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => duplicateConversation(conversation.id)}>
            <Copy className="size-3.5" /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => exportConversation(conversation.id, "md")}>
            <Download className="size-3.5" /> Export Markdown
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => exportConversation(conversation.id, "json")}>
            <Download className="size-3.5" /> Export JSON
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem danger onSelect={() => deleteConversation(conversation.id)}>
            <Trash2 className="size-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function SidebarBody() {
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const createConversation = useChatStore((s) => s.createConversation);
  const importConversation = useChatStore((s) => s.importConversation);
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
  const fileRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const filtered = conversations.filter((c) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) || c.messages.some((m) => m.content.toLowerCase().includes(q))
      );
    });
    const map = new Map<DateGroup, Conversation[]>();
    for (const c of filtered) {
      const group = conversationGroup(c.updatedAt, c.pinned);
      const list = map.get(group) ?? [];
      list.push(c);
      map.set(group, list);
    }
    return GROUP_ORDER.map((g) => [g, map.get(g) ?? []] as const).filter(([, list]) => list.length > 0);
  }, [conversations, query]);

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="text-xs font-medium tracking-wide text-muted uppercase">Conversations</span>
      </div>
      <div className="space-y-2 px-3">
        <div className="flex gap-1.5">
          <Button
            className="flex-1 justify-start"
            onClick={() => {
              createConversation();
              setSidebarOpen(false);
            }}
          >
            <Plus /> New chat
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Search conversations"
            onClick={() => setSearchOpen(true)}
          >
            <Search />
          </Button>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="pl-8"
            aria-label="Search conversations"
          />
        </div>
      </div>
      <ScrollArea className="mt-3 flex-1 px-2">
        {groups.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-muted">No conversations yet.</p>
        ) : (
          groups.map(([group, list]) => (
            <div key={group} className="mb-4">
              <div className="px-2 pb-1 text-[10px] font-medium tracking-widest text-muted uppercase">{group}</div>
              {list.map((c) => (
                <ConversationRow key={c.id} conversation={c} active={c.id === activeId} />
              ))}
            </div>
          ))
        )}
      </ScrollArea>
      <div className="border-t border-border p-3">
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            try {
              const json = JSON.parse(await file.text());
              importConversation(json);
            } catch {
              /* ignore invalid import */
            }
          }}
        />
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted" onClick={() => fileRef.current?.click()}>
          <Upload /> Import
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden h-full w-64 shrink-0 border-r border-border lg:flex lg:flex-col">
      <SidebarBody />
    </aside>
  );
}
