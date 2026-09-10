export const MAX_MESSAGE_CHARS = 16_000;
export const MAX_ATTACHMENTS = 4;
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export const MAX_TEXT_FILE_BYTES = 400_000;
export const MAX_OUTPUT_TOKENS = 2048;
export const MIN_OUTPUT_TOKENS = 256;

export const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"]);
export const TEXT_TYPES = new Set([
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
  "text/html",
  "text/css",
  "text/javascript",
  "application/javascript",
  "text/x-python",
]);

const TEXT_EXT = /\.(txt|md|markdown|csv|json|ts|tsx|js|jsx|py|html|css|yml|yaml|sql|sh|xml)$/i;

export function isImageFile(file: File): boolean {
  return IMAGE_TYPES.has(file.type) || /\.(png|jpe?g|gif|webp)$/i.test(file.name);
}

export function isTextFile(file: File): boolean {
  return TEXT_TYPES.has(file.type) || TEXT_EXT.test(file.name);
}

export function validateMessage(content: string): string | null {
  const trimmed = content.trim();
  if (!trimmed) return "Message is empty.";
  if (trimmed.length > MAX_MESSAGE_CHARS) {
    return `Message is too long (${trimmed.length.toLocaleString()} / ${MAX_MESSAGE_CHARS.toLocaleString()} characters).`;
  }
  return null;
}

export function clampTemperature(n: number): number {
  if (!Number.isFinite(n)) return 0.7;
  return Math.min(1.5, Math.max(0, n));
}

export function clampTopP(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(1, Math.max(0, n));
}

export function clampMaxTokens(n: number): number {
  if (!Number.isFinite(n)) return 1024;
  return Math.min(MAX_OUTPUT_TOKENS, Math.max(MIN_OUTPUT_TOKENS, Math.round(n)));
}
