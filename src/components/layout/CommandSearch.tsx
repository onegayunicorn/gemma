import { Command } from "cmdk";
import { Keyboard, MessageSquare, Plus, Settings2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatStore } from "@/stores/chat-store";
import { useUiStore } from "@/stores/ui-store";

export function CommandSearch() {
  const open = useUiStore((s) => s.searchOpen);
  const setOpen = useUiStore((s) => s.setSearchOpen);
  const setSettingsOpen = useUiStore((s) => s.setSettingsOpen);
  const setShortcutsOpen = useUiStore((s) => s.setShortcutsOpen);
  const conversations = useChatStore((s) => s.conversations);
  const selectConversation = useChatStore((s) => s.selectConversation);
  const createConversation = useChatStore((s) => s.createConversation);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Jump to a conversation or run a command.</DialogDescription>
        </DialogHeader>
        <Command className="bg-surface text-foreground" loop>
          <Command.Input
            placeholder="Search conversations…"
            className="h-12 w-full border-b border-border bg-transparent px-4 pr-10 text-sm outline-none placeholder:text-muted"
          />
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="px-2 py-6 text-center text-sm text-muted">No results.</Command.Empty>
            <Command.Group heading="Actions" className="mb-2 text-[10px] font-medium tracking-widest text-muted uppercase [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              <Command.Item
                value="new chat"
                onSelect={() => {
                  createConversation();
                  close();
                }}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover"
              >
                <Plus className="size-3.5 text-muted" /> New chat
              </Command.Item>
              <Command.Item
                value="open settings"
                onSelect={() => {
                  close();
                  setSettingsOpen(true);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover"
              >
                <Settings2 className="size-3.5 text-muted" /> Open settings
              </Command.Item>
              <Command.Item
                value="keyboard shortcuts"
                onSelect={() => {
                  close();
                  setShortcutsOpen(true);
                }}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover"
              >
                <Keyboard className="size-3.5 text-muted" /> Keyboard shortcuts
              </Command.Item>
            </Command.Group>
            {conversations.length > 0 ? (
              <Command.Group
                heading="Conversations"
                className="text-[10px] font-medium tracking-widest text-muted uppercase [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {conversations.map((conversation) => (
                  <Command.Item
                    key={conversation.id}
                    value={`${conversation.title} ${conversation.messages.map((m) => m.content).join(" ").slice(0, 240)}`}
                    onSelect={() => {
                      selectConversation(conversation.id);
                      close();
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover"
                  >
                    <MessageSquare className="size-3.5 shrink-0 text-muted" />
                    <span className="truncate">{conversation.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            ) : null}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
