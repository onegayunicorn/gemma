import { createId } from "@/lib/ids";
import {
  isImageFile,
  isTextFile,
  MAX_ATTACHMENTS,
  MAX_IMAGE_BYTES,
  MAX_TEXT_FILE_BYTES,
} from "@/lib/validation";
import type { Attachment } from "@/types/chat";

const IMAGE_MAX_EDGE = 1280;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsText(file);
  });
}

function resizeImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, IMAGE_MAX_EDGE / Math.max(img.width, img.height));
      if (scale >= 1) {
        resolve(dataUrl);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export async function fileToAttachment(file: File): Promise<Attachment> {
  const id = createId("file");
  if (isImageFile(file)) {
    if (file.size > MAX_IMAGE_BYTES) {
      return {
        id,
        name: file.name,
        mimeType: file.type || "image/*",
        size: file.size,
        status: "error",
        error: "Image is larger than 3 MB.",
      };
    }
    const raw = await readAsDataUrl(file);
    const dataUrl = await resizeImage(raw);
    return {
      id,
      name: file.name,
      mimeType: file.type || "image/jpeg",
      size: file.size,
      status: "ready",
      dataUrl,
    };
  }
  if (isTextFile(file)) {
    if (file.size > MAX_TEXT_FILE_BYTES) {
      return {
        id,
        name: file.name,
        mimeType: file.type || "text/plain",
        size: file.size,
        status: "error",
        error: "File is too large.",
      };
    }
    const textContent = await readAsText(file);
    return {
      id,
      name: file.name,
      mimeType: file.type || "text/plain",
      size: file.size,
      status: "ready",
      textContent,
    };
  }
  return {
    id,
    name: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    status: "error",
    error: "Unsupported file type.",
  };
}

export async function filesToAttachments(files: File[], existingCount: number): Promise<Attachment[]> {
  const room = Math.max(0, MAX_ATTACHMENTS - existingCount);
  const slice = Array.from(files).slice(0, room);
  return Promise.all(slice.map(fileToAttachment));
}
