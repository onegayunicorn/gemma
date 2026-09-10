import { FileText, X } from "lucide-react";
import { formatBytes } from "@/lib/formatting";
import type { Attachment } from "@/types/chat";

export function AttachmentPreview({
  files,
  onRemove,
}: {
  files: Attachment[];
  onRemove: (id: string) => void;
}) {
  if (files.length === 0) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="relative flex items-center gap-2 rounded-md border border-border bg-hover px-2 py-1.5"
        >
          {file.dataUrl ? (
            <img src={file.dataUrl} alt="" className="h-10 w-10 rounded-sm object-cover" />
          ) : (
            <FileText className="size-4 text-muted" />
          )}
          <div className="min-w-0">
            <div className="max-w-40 truncate text-xs">{file.name}</div>
            <div className="text-[10px] text-muted">
              {file.status === "error" ? file.error : formatBytes(file.size)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(file.id)}
            className="rounded-sm p-0.5 text-muted hover:text-foreground"
            aria-label={`Remove ${file.name}`}
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
