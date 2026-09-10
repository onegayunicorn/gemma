import { env } from "@/env";

// Public-safe configuration. Keep the actual OAuth client secret in the
// deployment environment and never commit credentials to source control.
export const PREVIEW_CLIENT_ID = "grok_preview";
export const PREVIEW_CLIENT_SECRET = env.GROK_AUTH_CLIENT_SECRET ?? "";

export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
