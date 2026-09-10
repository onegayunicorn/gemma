import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MODELS, getModel } from "@/lib/models";
import { useChatStore } from "@/stores/chat-store";

export function ModelSelector() {
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const setModel = useChatStore((s) => s.setModel);
  const createConversation = useChatStore((s) => s.createConversation);
  const status = useChatStore((s) => s.status);
  const current = getModel(conversations.find((c) => c.id === activeId)?.model);
  const disabled = status === "streaming";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={disabled} className="gap-1 font-normal text-muted">
          {current.name}
          <ChevronDown className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel>Model</DropdownMenuLabel>
        {MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onSelect={() => {
              if (!activeId) createConversation(model.id);
              else setModel(model.id);
            }}
            className="items-start py-2"
          >
            <span className="mt-0.5 w-4 shrink-0">
              {model.id === current.id ? <Check className="size-3.5 text-accent" /> : null}
            </span>
            <span>
              <span className="block text-sm">{model.name}</span>
              <span className="block text-xs text-muted">{model.description}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
