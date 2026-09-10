import type { ModelDefinition } from "@/types/model";

export const MODELS: ModelDefinition[] = [
  {
    id: "grok-4.5",
    name: "Grok 4.5",
    shortName: "4.5",
    description: "Flagship reasoning, code, and multimodal chat",
    contextTokens: 131072,
    maxOutputTokens: 4096,
    defaultMaxOutput: 1024,
    vision: true,
    tools: true,
    streaming: true,
  },
  {
    id: "grok-3",
    name: "Grok 3",
    shortName: "3",
    description: "Balanced quality for everyday work",
    contextTokens: 131072,
    maxOutputTokens: 4096,
    defaultMaxOutput: 1024,
    vision: true,
    tools: false,
    streaming: true,
  },
  {
    id: "grok-3-mini",
    name: "Grok 3 Mini",
    shortName: "Mini",
    description: "Fast, efficient replies",
    contextTokens: 131072,
    maxOutputTokens: 2048,
    defaultMaxOutput: 768,
    vision: false,
    tools: false,
    streaming: true,
  },
];

export const DEFAULT_MODEL_ID = MODELS[0]!.id;

export const MODEL_IDS = new Set(MODELS.map((m) => m.id));

export function getModel(id: string | undefined | null): ModelDefinition {
  return MODELS.find((m) => m.id === id) ?? MODELS[0]!;
}

export const DEFAULT_SYSTEM_INSTRUCTION =
  "You are Gemma, a concise and highly capable AI assistant with a calm technical voice. Prefer markdown when it helps: headings, lists, and fenced code with a language tag. Be direct. Do not invent APIs, URLs, or library names. If you are unsure, say so.";
