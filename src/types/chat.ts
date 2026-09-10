export type MessageRole = "system" | "user" | "assistant";

export type MessageStatus =
  | "pending"
  | "streaming"
  | "complete"
  | "error"
  | "cancelled";

export type AttachmentStatus = "uploading" | "ready" | "error";

export interface Attachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  status: AttachmentStatus;
  dataUrl?: string;
  textContent?: string;
  error?: string;
}

export interface TokenUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface ApiError {
  code: string;
  message: string;
  retryable: boolean;
  status?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  updatedAt?: string;
  status: MessageStatus;
  model?: string;
  usage?: TokenUsage;
  attachments?: Attachment[];
  error?: ApiError;
  feedback?: "up" | "down" | null;
}

export interface Conversation {
  id: string;
  title: string;
  model: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  pinned?: boolean;
  archived?: boolean;
}

export type ChatStatus = "idle" | "submitting" | "streaming" | "error";
