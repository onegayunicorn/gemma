import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cg19qu9B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground shadow-[var(--shadow)]", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
function mapHttpError(status, body) {
	const snippet = body.replace(/\s+/g, " ").slice(0, 240);
	if (status === 401 || status === 403) return {
		code: "auth",
		message: "The AI provider rejected this request. Try again later.",
		retryable: false,
		status
	};
	if (status === 429) return {
		code: "rate_limit",
		message: "Too many requests. Wait a moment, then retry.",
		retryable: true,
		status
	};
	if (status === 400) return {
		code: "invalid_request",
		message: snippet || "The request was rejected. Try a shorter prompt or fewer attachments.",
		retryable: false,
		status
	};
	if (status === 413) return {
		code: "context",
		message: "This conversation is too large for the model. Start a new chat.",
		retryable: false,
		status
	};
	if (status >= 500) return {
		code: "upstream",
		message: "The model is temporarily unavailable. Retry in a moment.",
		retryable: true,
		status
	};
	return {
		code: "unknown",
		message: snippet || `Request failed (${status}).`,
		retryable: status >= 500,
		status
	};
}
var ChatRequestError = class extends Error {
	error;
	constructor(error) {
		super(error.message);
		this.name = "ChatRequestError";
		this.error = error;
	}
};
var TIME_FORMAT = {
	hour: "2-digit",
	minute: "2-digit"
};
function formatTime(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleTimeString([], TIME_FORMAT);
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function estimateTokens(text) {
	if (!text) return 0;
	return Math.max(1, Math.ceil(text.length / 4));
}
function formatTokenCount(n) {
	if (n < 1e3) return `${n}`;
	if (n < 1e4) return `${(n / 1e3).toFixed(1)}k`;
	return `${Math.round(n / 1e3)}k`;
}
function titleFromPrompt(content) {
	const cleaned = content.replace(/\s+/g, " ").trim();
	if (!cleaned) return "New chat";
	if (cleaned.length <= 42) return cleaned;
	return `${cleaned.slice(0, 42).trimEnd()}…`;
}
function startOfDay(date) {
	const copy = new Date(date);
	copy.setHours(0, 0, 0, 0);
	return copy.getTime();
}
function conversationGroup(updatedAt, pinned) {
	if (pinned) return "Pinned";
	const then = startOfDay(new Date(updatedAt));
	const diff = startOfDay(/* @__PURE__ */ new Date()) - then;
	const day = 864e5;
	if (diff < day) return "Today";
	if (diff < day * 2) return "Yesterday";
	if (diff < day * 7) return "Last 7 days";
	return "Older";
}
function downloadText(filename, contents, mime) {
	const blob = new Blob([contents], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function conversationToMarkdown(title, messages) {
	return `# ${title}\n\n${messages.filter((m) => m.role === "user" || m.role === "assistant").map((m) => `### ${m.role === "user" ? "You" : "Gemma"}\n\n${m.content}`).join("\n\n")}\n`;
}
function conversationToText(title, messages) {
	return `${title}\n\n${messages.filter((m) => m.role === "user" || m.role === "assistant").map((m) => `${m.role === "user" ? "You" : "Gemma"}:\n${m.content}`).join("\n\n")}\n`;
}
function createId(prefix = "id") {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return `${prefix}_${crypto.randomUUID()}`;
	return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
var MODELS = [
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
		streaming: true
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
		streaming: true
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
		streaming: true
	}
];
var DEFAULT_MODEL_ID = MODELS[0].id;
var MODEL_IDS = new Set(MODELS.map((m) => m.id));
function getModel(id) {
	return MODELS.find((m) => m.id === id) ?? MODELS[0];
}
var DEFAULT_SYSTEM_INSTRUCTION = "You are Gemma, a concise and highly capable AI assistant with a calm technical voice. Prefer markdown when it helps: headings, lists, and fenced code with a language tag. Be direct. Do not invent APIs, URLs, or library names. If you are unsure, say so.";
var MAX_MESSAGE_CHARS = 16e3;
var MAX_OUTPUT_TOKENS = 2048;
var IMAGE_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp"
]);
var TEXT_TYPES = /* @__PURE__ */ new Set([
	"text/plain",
	"text/markdown",
	"text/csv",
	"application/json",
	"text/html",
	"text/css",
	"text/javascript",
	"application/javascript",
	"text/x-python"
]);
var TEXT_EXT = /\.(txt|md|markdown|csv|json|ts|tsx|js|jsx|py|html|css|yml|yaml|sql|sh|xml)$/i;
function isImageFile(file) {
	return IMAGE_TYPES.has(file.type) || /\.(png|jpe?g|gif|webp)$/i.test(file.name);
}
function isTextFile(file) {
	return TEXT_TYPES.has(file.type) || TEXT_EXT.test(file.name);
}
function validateMessage(content) {
	const trimmed = content.trim();
	if (!trimmed) return "Message is empty.";
	if (trimmed.length > 16e3) return `Message is too long (${trimmed.length.toLocaleString()} / ${MAX_MESSAGE_CHARS.toLocaleString()} characters).`;
	return null;
}
function clampTemperature(n) {
	if (!Number.isFinite(n)) return .7;
	return Math.min(1.5, Math.max(0, n));
}
function clampTopP(n) {
	if (!Number.isFinite(n)) return 1;
	return Math.min(1, Math.max(0, n));
}
function clampMaxTokens(n) {
	if (!Number.isFinite(n)) return 1024;
	return Math.min(MAX_OUTPUT_TOKENS, Math.max(256, Math.round(n)));
}
async function* parseSse(response) {
	const reader = response.body?.getReader();
	if (!reader) {
		yield {
			type: "error",
			error: {
				code: "empty",
				message: "Empty response from the server.",
				retryable: true
			}
		};
		return;
	}
	const decoder = new TextDecoder();
	let buffer = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const parts = buffer.split("\n\n");
		buffer = parts.pop() ?? "";
		for (const part of parts) {
			const line = part.split("\n").map((l) => l.trim()).find((l) => l.startsWith("data:"));
			if (!line) continue;
			const data = line.slice(5).trim();
			if (!data) continue;
			try {
				yield JSON.parse(data);
			} catch {}
		}
	}
}
async function* streamChat(request, signal) {
	const response = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
		signal
	});
	const contentType = response.headers.get("content-type") ?? "";
	if (!response.ok || !contentType.includes("text/event-stream")) {
		let error = {
			code: "http",
			message: `Request failed (${response.status}).`,
			retryable: response.status >= 500,
			status: response.status
		};
		try {
			const json = await response.json();
			if (json.error) error = json.error;
		} catch {}
		throw new ChatRequestError(error);
	}
	yield* parseSse(response);
}
async function checkAiAvailable() {
	try {
		const res = await fetch("/api/chat", { method: "GET" });
		if (!res.ok) return false;
		const json = await res.json();
		return Boolean(json.available);
	} catch {
		return false;
	}
}
var defaults = {
	theme: "dark",
	enterToSend: true,
	showTimestamps: true,
	compactMessages: false,
	saveConversations: true,
	generation: {
		temperature: .7,
		topP: 1,
		maxOutputTokens: 1024,
		systemInstruction: DEFAULT_SYSTEM_INSTRUCTION
	}
};
var useSettingsStore = create()(persist((set) => ({
	...defaults,
	hydrated: false,
	setTheme: (theme) => set({ theme }),
	setEnterToSend: (enterToSend) => set({ enterToSend }),
	setShowTimestamps: (showTimestamps) => set({ showTimestamps }),
	setCompactMessages: (compactMessages) => set({ compactMessages }),
	setSaveConversations: (saveConversations) => set({ saveConversations }),
	setTemperature: (value) => set((s) => ({ generation: {
		...s.generation,
		temperature: clampTemperature(value)
	} })),
	setTopP: (value) => set((s) => ({ generation: {
		...s.generation,
		topP: clampTopP(value)
	} })),
	setMaxOutputTokens: (value) => set((s) => ({ generation: {
		...s.generation,
		maxOutputTokens: clampMaxTokens(value)
	} })),
	setSystemInstruction: (systemInstruction) => set((s) => ({ generation: {
		...s.generation,
		systemInstruction
	} })),
	resetGeneration: () => set({ generation: defaults.generation })
}), {
	name: "gemma-settings",
	partialize: (s) => ({
		theme: s.theme,
		enterToSend: s.enterToSend,
		showTimestamps: s.showTimestamps,
		compactMessages: s.compactMessages,
		saveConversations: s.saveConversations,
		generation: s.generation
	}),
	onRehydrateStorage: () => (state) => {
		if (state) state.hydrated = true;
	}
}));
var MAX_CONVERSATIONS = 60;
var abortController = null;
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function sanitizeConversation(c) {
	return {
		...c,
		messages: c.messages.map((m) => m.status === "streaming" || m.status === "pending" ? {
			...m,
			status: "cancelled",
			updatedAt: nowIso()
		} : m)
	};
}
function sortConversations(list) {
	return [...list].sort((a, b) => {
		if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
		return b.updatedAt.localeCompare(a.updatedAt);
	});
}
function persistable(state) {
	if (!useSettingsStore.getState().saveConversations) return {
		conversations: [],
		activeId: null,
		drafts: {}
	};
	return {
		conversations: state.conversations.slice(0, MAX_CONVERSATIONS).map((c) => ({
			...c,
			messages: c.messages.map((m) => ({
				...m,
				attachments: m.attachments?.map((a) => a.dataUrl && a.dataUrl.length > 25e4 ? {
					...a,
					dataUrl: void 0
				} : a)
			}))
		})),
		activeId: state.activeId,
		drafts: state.drafts
	};
}
async function runGeneration(set, get, conversationId, assistantId) {
	abortController?.abort();
	const controller = new AbortController();
	abortController = controller;
	const conversation = get().conversations.find((c) => c.id === conversationId);
	if (!conversation) return;
	const settings = useSettingsStore.getState();
	const history = conversation.messages.filter((m) => m.id !== assistantId && (m.role === "user" || m.role === "assistant") && m.status !== "error").map((m) => ({
		role: m.role,
		content: m.content,
		attachments: m.attachments
	}));
	set(() => ({ status: "streaming" }));
	const patchAssistant = (patch) => {
		set((s) => ({ conversations: s.conversations.map((c) => c.id !== conversationId ? c : {
			...c,
			updatedAt: nowIso(),
			messages: c.messages.map((m) => m.id === assistantId ? {
				...m,
				...patch,
				updatedAt: nowIso()
			} : m)
		}) }));
	};
	try {
		for await (const event of streamChat({
			conversationId,
			messages: history,
			model: conversation.model,
			settings: settings.generation
		}, controller.signal)) if (event.type === "delta") {
			const current = get().conversations.find((c) => c.id === conversationId)?.messages.find((m) => m.id === assistantId);
			patchAssistant({
				status: "streaming",
				content: `${current?.content ?? ""}${event.text}`
			});
		} else if (event.type === "usage") patchAssistant({ usage: event.usage });
		else if (event.type === "error") {
			patchAssistant({
				status: "error",
				error: event.error
			});
			set(() => ({ status: "error" }));
			return;
		} else if (event.type === "done") patchAssistant({ status: "complete" });
		const final = get().conversations.find((c) => c.id === conversationId)?.messages.find((m) => m.id === assistantId);
		if (final && final.status === "streaming") patchAssistant({ status: "complete" });
		set(() => ({ status: "idle" }));
	} catch (err) {
		if (controller.signal.aborted) {
			const current = get().conversations.find((c) => c.id === conversationId)?.messages.find((m) => m.id === assistantId);
			patchAssistant({
				status: current?.content ? "cancelled" : "cancelled",
				error: current?.content ? void 0 : {
					code: "cancelled",
					message: "Generation stopped.",
					retryable: true
				}
			});
			set(() => ({ status: "idle" }));
			return;
		}
		patchAssistant({
			status: "error",
			error: err instanceof ChatRequestError ? err.error : {
				code: "network",
				message: err instanceof Error ? err.message : "Failed to generate a response.",
				retryable: true
			}
		});
		set(() => ({ status: "error" }));
	} finally {
		if (abortController === controller) abortController = null;
	}
}
var useChatStore = create()(persist((set, get) => ({
	conversations: [],
	activeId: null,
	status: "idle",
	drafts: {},
	hydrated: false,
	createConversation: (model) => {
		const id = createId("convo");
		const conversation = {
			id,
			title: "New chat",
			model: model ?? get().conversations.find((c) => c.id === get().activeId)?.model ?? DEFAULT_MODEL_ID,
			createdAt: nowIso(),
			updatedAt: nowIso(),
			messages: []
		};
		set((s) => ({
			conversations: sortConversations([conversation, ...s.conversations]).slice(0, MAX_CONVERSATIONS),
			activeId: id
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
			return {
				conversations,
				drafts,
				activeId: s.activeId === id ? conversations[0]?.id ?? null : s.activeId
			};
		});
	},
	renameConversation: (id, title) => {
		const next = title.trim() || "Untitled";
		set((s) => ({ conversations: s.conversations.map((c) => c.id === id ? {
			...c,
			title: next.slice(0, 80),
			updatedAt: nowIso()
		} : c) }));
	},
	pinConversation: (id) => {
		set((s) => ({ conversations: sortConversations(s.conversations.map((c) => c.id === id ? {
			...c,
			pinned: !c.pinned,
			updatedAt: nowIso()
		} : c)) }));
	},
	duplicateConversation: (id) => {
		const source = get().conversations.find((c) => c.id === id);
		if (!source) return null;
		const nextId = createId("convo");
		const cloned = {
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
				status: m.status === "streaming" || m.status === "pending" ? "complete" : m.status
			}))
		};
		set((s) => ({
			conversations: sortConversations([cloned, ...s.conversations]),
			activeId: nextId
		}));
		return nextId;
	},
	setModel: (model) => {
		const { activeId } = get();
		if (!activeId) return;
		set((s) => ({ conversations: s.conversations.map((c) => c.id === activeId ? {
			...c,
			model,
			updatedAt: nowIso()
		} : c) }));
	},
	setDraft: (conversationId, draft) => {
		set((s) => ({ drafts: {
			...s.drafts,
			[conversationId]: draft
		} }));
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
		const userMsg = {
			id: createId("msg"),
			conversationId,
			role: "user",
			content: trimmed,
			createdAt: nowIso(),
			status: "complete",
			attachments: attachments?.filter((a) => a.status === "ready")
		};
		const assistantMsg = {
			id: createId("msg"),
			conversationId,
			role: "assistant",
			content: "",
			createdAt: nowIso(),
			status: "pending",
			model: conversation.model
		};
		const isFirst = conversation.messages.length === 0;
		set((s) => ({
			status: "submitting",
			drafts: {
				...s.drafts,
				[conversationId]: ""
			},
			conversations: sortConversations(s.conversations.map((c) => c.id !== conversationId ? c : {
				...c,
				title: isFirst ? titleFromPrompt(trimmed || attachments?.[0]?.name || "New chat") : c.title,
				updatedAt: nowIso(),
				messages: [
					...c.messages,
					userMsg,
					assistantMsg
				]
			}))
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
		set((s) => ({ conversations: s.conversations.map((c) => c.id !== activeId ? c : {
			...c,
			messages: c.messages.map((m) => m.id === messageId ? {
				...m,
				content: "",
				status: "pending",
				error: void 0,
				updatedAt: nowIso()
			} : m)
		}) }));
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
		const assistantMsg = {
			id: createId("msg"),
			conversationId: activeId,
			role: "assistant",
			content: "",
			createdAt: nowIso(),
			status: "pending",
			model: convo.model
		};
		set((s) => ({ conversations: s.conversations.map((c) => c.id !== activeId ? c : {
			...c,
			title: index === 0 ? titleFromPrompt(content) : c.title,
			updatedAt: nowIso(),
			messages: [
				...c.messages.slice(0, index),
				{
					...c.messages[index],
					content: content.trim(),
					updatedAt: nowIso()
				},
				assistantMsg
			]
		}) }));
		await runGeneration(set, get, activeId, assistantMsg.id);
	},
	setFeedback: (messageId, feedback) => {
		const { activeId } = get();
		if (!activeId) return;
		set((s) => ({ conversations: s.conversations.map((c) => c.id !== activeId ? c : {
			...c,
			messages: c.messages.map((m) => m.id === messageId ? {
				...m,
				feedback
			} : m)
		}) }));
	},
	exportConversation: (id, format) => {
		const convo = get().conversations.find((c) => c.id === id);
		if (!convo) return;
		const slug = convo.title.replace(/[^\w\s-]+/g, "").trim().slice(0, 40) || "conversation";
		if (format === "json") {
			downloadText(`${slug}.json`, JSON.stringify({
				version: 1,
				conversation: convo
			}, null, 2), "application/json");
			return;
		}
		const msgs = convo.messages.map((m) => ({
			role: m.role,
			content: m.content
		}));
		if (format === "md") {
			downloadText(`${slug}.md`, conversationToMarkdown(convo.title, msgs), "text/markdown");
			return;
		}
		downloadText(`${slug}.txt`, conversationToText(convo.title, msgs), "text/plain");
	},
	importConversation: (raw) => {
		if (!raw || typeof raw !== "object") return null;
		const obj = raw;
		const source = obj.conversation ?? obj;
		if (!source || !Array.isArray(source.messages)) return null;
		const id = createId("convo");
		const imported = {
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
				status: "complete"
			}))
		};
		set((s) => ({
			conversations: sortConversations([imported, ...s.conversations]),
			activeId: id
		}));
		return id;
	},
	clearAll: () => {
		abortController?.abort();
		set({
			conversations: [],
			activeId: null,
			drafts: {},
			status: "idle"
		});
	}
}), {
	name: "gemma-conversations",
	partialize: persistable,
	merge: (persisted, current) => {
		const p = persisted;
		const conversations = (p?.conversations ?? []).map(sanitizeConversation);
		return {
			...current,
			...p,
			conversations,
			status: "idle"
		};
	},
	onRehydrateStorage: () => (state) => {
		if (state) state.hydrated = true;
	}
}));
var useUiStore = create((set) => ({
	sidebarOpen: false,
	settingsOpen: false,
	searchOpen: false,
	shortcutsOpen: false,
	setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
	toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
	setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
	setSearchOpen: (searchOpen) => set({ searchOpen }),
	setShortcutsOpen: (shortcutsOpen) => set({ shortcutsOpen })
}));
function isTypingTarget(target) {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}
function useKeyboardShortcuts() {
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const meta = event.metaKey || event.ctrlKey;
			const ui = useUiStore.getState();
			const chat = useChatStore.getState();
			if (event.key === "Escape") {
				if (chat.status === "streaming") {
					event.preventDefault();
					chat.stopGeneration();
					return;
				}
				ui.setSearchOpen(false);
				ui.setSettingsOpen(false);
				ui.setShortcutsOpen(false);
				ui.setSidebarOpen(false);
				return;
			}
			if (meta && event.key.toLowerCase() === "k") {
				event.preventDefault();
				ui.setSearchOpen(!ui.searchOpen);
				return;
			}
			if (meta && event.key.toLowerCase() === "n") {
				event.preventDefault();
				chat.createConversation();
				return;
			}
			if (meta && event.key === "/") {
				event.preventDefault();
				ui.setShortcutsOpen(!ui.shortcutsOpen);
				return;
			}
			if (meta && event.key === ",") {
				event.preventDefault();
				ui.setSettingsOpen(!ui.settingsOpen);
				return;
			}
			if (isTypingTarget(event.target)) return;
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
}
function resolveTheme(pref) {
	if (pref === "system") return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	return pref;
}
function ThemeSync() {
	const theme = useSettingsStore((s) => s.theme);
	(0, import_react.useEffect)(() => {
		const apply = () => {
			document.documentElement.dataset.theme = resolveTheme(theme);
		};
		apply();
		if (theme !== "system") return;
		const mq = window.matchMedia("(prefers-color-scheme: light)");
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, [theme]);
	return null;
}
function AppProviders({ children }) {
	useKeyboardShortcuts();
	const theme = useSettingsStore((s) => s.theme);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 220,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: theme === "light" ? "light" : "dark",
				position: "bottom-center",
				toastOptions: { classNames: {
					toast: "bg-surface text-foreground border border-border shadow-[var(--shadow)] font-sans",
					title: "text-foreground",
					description: "text-muted"
				} }
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var styles_default = "/assets/styles-wmjWd2KE.css";
var APP_NAME = "Gemma";
var THEME_BOOT = `try{var r=JSON.parse(localStorage.getItem("gemma-settings")||"null");var t=r&&r.state&&r.state.theme?r.state.theme:"dark";if(t==="system")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){}`;
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Gemma AI assistant — a Dark Mistral chat interface powered by xAI Grok."
			},
			{
				name: "theme-color",
				content: "#0F1117"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		"data-theme": "dark",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "h-full bg-background font-sans text-foreground antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter = () => import("./routes-5G7ZL9Zn.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var CONTEXT_CHAR_BUDGET = 24e3;
function attachmentText(attachments) {
	if (!attachments?.length) return "";
	const parts = [];
	for (const file of attachments) if (file.textContent) parts.push(`\n\n[File: ${file.name}]\n\`\`\`\n${file.textContent.slice(0, 12e3)}\n\`\`\``);
	return parts.join("");
}
function toOpenAiContent(content, attachments) {
	const images = (attachments ?? []).filter((a) => a.dataUrl && a.mimeType.startsWith("image/") && a.status === "ready");
	const text = `${content}${attachmentText(attachments)}`.slice(0, MAX_MESSAGE_CHARS);
	if (images.length === 0) return text;
	return [{
		type: "text",
		text: text || "Describe the attached image."
	}, ...images.map((img) => ({
		type: "image_url",
		image_url: { url: img.dataUrl }
	}))];
}
function selectContext(messages) {
	const picked = [];
	let used = 0;
	for (let i = messages.length - 1; i >= 0; i--) {
		const msg = messages[i];
		const size = msg.content.length + (msg.attachments?.reduce((n, a) => n + (a.textContent?.length ?? 0), 0) ?? 0);
		if (picked.length > 0 && used + size > CONTEXT_CHAR_BUDGET) break;
		picked.unshift(msg);
		used += size;
	}
	return picked;
}
function buildUpstreamBody(input) {
	const model = MODEL_IDS.has(input.model) ? input.model : DEFAULT_MODEL_ID;
	const temperature = clampTemperature(input.settings.temperature);
	const topP = clampTopP(input.settings.topP);
	const maxTokens = clampMaxTokens(input.settings.maxOutputTokens);
	const system = (input.settings.systemInstruction || "You are Gemma, a concise and highly capable AI assistant with a calm technical voice. Prefer markdown when it helps: headings, lists, and fenced code with a language tag. Be direct. Do not invent APIs, URLs, or library names. If you are unsure, say so.").slice(0, 4e3);
	const history = selectContext(input.messages.filter((m) => m.role !== "system"));
	return {
		model,
		messages: [{
			role: "system",
			content: system
		}, ...history.map((m) => ({
			role: m.role,
			content: toOpenAiContent(m.content, m.attachments)
		}))],
		stream: true,
		temperature,
		max_tokens: maxTokens,
		stream_options: { include_usage: true },
		...topP < 1 ? { top_p: topP } : {}
	};
}
async function startXaiStream(input, signal) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return Response.json({ error: {
		code: "unavailable",
		message: "AI is not available in this environment.",
		retryable: false
	} }, { status: 503 });
	const body = buildUpstreamBody(input);
	let upstream;
	try {
		upstream = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify(body),
			signal
		});
	} catch (err) {
		if (err instanceof DOMException && err.name === "AbortError") return new Response(null, { status: 499 });
		return Response.json({ error: {
			code: "network",
			message: "Could not reach the model. Check your connection and retry.",
			retryable: true
		} }, { status: 502 });
	}
	if (!upstream.ok) {
		const text = await upstream.text().catch(() => "");
		const mapped = mapHttpError(upstream.status, text);
		return Response.json({ error: mapped }, { status: upstream.status });
	}
	if (!upstream.body) return Response.json({ error: {
		code: "empty",
		message: "The model returned an empty stream.",
		retryable: true
	} }, { status: 502 });
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	const reader = upstream.body.getReader();
	const stream = new ReadableStream({
		async start(controller) {
			let buffer = "";
			const emit = (payload) => {
				controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
			};
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					buffer += decoder.decode(value, { stream: true });
					const lines = buffer.split("\n");
					buffer = lines.pop() ?? "";
					for (const raw of lines) {
						const line = raw.trim();
						if (!line.startsWith("data:")) continue;
						const data = line.slice(5).trim();
						if (!data) continue;
						if (data === "[DONE]") {
							emit({ type: "done" });
							continue;
						}
						try {
							const json = JSON.parse(data);
							const delta = json.choices?.[0]?.delta?.content;
							if (delta) emit({
								type: "delta",
								text: delta
							});
							if (json.usage) emit({
								type: "usage",
								usage: {
									inputTokens: json.usage.prompt_tokens,
									outputTokens: json.usage.completion_tokens,
									totalTokens: json.usage.total_tokens
								}
							});
						} catch {}
					}
				}
				controller.close();
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError") {
					controller.close();
					return;
				}
				emit({
					type: "error",
					error: {
						code: "stream",
						message: "The stream was interrupted. Partial output was kept.",
						retryable: true
					}
				});
				controller.close();
			}
		},
		cancel() {
			reader.cancel();
		}
	});
	return new Response(stream, { headers: {
		"Content-Type": "text/event-stream; charset=utf-8",
		"Cache-Control": "no-cache, no-transform",
		Connection: "keep-alive"
	} });
}
function asRequest(raw) {
	if (!raw || typeof raw !== "object") return null;
	const body = raw;
	if (!Array.isArray(body.messages)) return null;
	const messages = body.messages.map((item) => {
		if (!item || typeof item !== "object") return null;
		const m = item;
		if (m.role !== "user" && m.role !== "assistant" && m.role !== "system") return null;
		if (typeof m.content !== "string") return null;
		return {
			role: m.role,
			content: m.content.slice(0, MAX_MESSAGE_CHARS),
			attachments: Array.isArray(m.attachments) ? m.attachments : void 0
		};
	}).filter((m) => m !== null);
	if (messages.length === 0) return null;
	const settingsRaw = body.settings ?? {};
	const model = typeof body.model === "string" && MODEL_IDS.has(body.model) ? body.model : DEFAULT_MODEL_ID;
	return {
		conversationId: typeof body.conversationId === "string" ? body.conversationId : "unknown",
		messages,
		model,
		settings: {
			temperature: clampTemperature(Number(settingsRaw.temperature)),
			topP: clampTopP(Number(settingsRaw.topP ?? 1)),
			maxOutputTokens: clampMaxTokens(Number(settingsRaw.maxOutputTokens)),
			systemInstruction: typeof settingsRaw.systemInstruction === "string" ? settingsRaw.systemInstruction : ""
		}
	};
}
var Route = createFileRoute("/api/chat")({ server: { handlers: {
	GET: async () => {
		return Response.json({ available: Boolean(process.env.XAI_API_KEY) });
	},
	POST: async ({ request }) => {
		let parsed;
		try {
			parsed = await request.json();
		} catch {
			return Response.json({ error: {
				code: "invalid_request",
				message: "Request body must be JSON.",
				retryable: false
			} }, { status: 400 });
		}
		const input = asRequest(parsed);
		if (!input) return Response.json({ error: {
			code: "invalid_request",
			message: "A non-empty messages array is required.",
			retryable: false
		} }, { status: 400 });
		return startXaiStream(input, request.signal);
	}
} } });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	ApiChatRoute: Route.update({
		id: "/api/chat",
		path: "/api/chat",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { cn as S, formatTime as _, checkAiAvailable as a, TooltipContent as b, MODELS as d, getModel as f, formatBytes as g, estimateTokens as h, useSettingsStore as i, isImageFile as l, conversationGroup as m, useUiStore as n, createId as p, useChatStore as r, MAX_MESSAGE_CHARS as s, router_exports as t, isTextFile as u, formatTokenCount as v, TooltipTrigger as x, Tooltip as y };
