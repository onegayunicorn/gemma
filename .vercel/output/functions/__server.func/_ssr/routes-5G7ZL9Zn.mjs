import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime, n as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as Download, D as ArrowUp, E as Check, O as ArrowDown, S as Ellipsis, T as ChevronDown, _ as Paperclip, a as Trash2, b as Keyboard, c as Square, d as Search, f as RotateCcw, g as Pencil, h as Pin, l as Sparkles, m as Plus, n as User, o as ThumbsUp, p as RefreshCw, r as Upload, s as ThumbsDown, t as X, u as Settings2, v as MessageSquare, w as Copy, x as FileText, y as Menu } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { S as cn, _ as formatTime, a as checkAiAvailable, b as TooltipContent, d as MODELS, f as getModel, g as formatBytes, h as estimateTokens, i as useSettingsStore, l as isImageFile, m as conversationGroup, n as useUiStore, p as createId, r as useChatStore, s as MAX_MESSAGE_CHARS, u as isTextFile, v as formatTokenCount, x as TooltipTrigger, y as Tooltip } from "./router-Cg19qu9B.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
import { a as python, c as javascript, d as core_default, i as sql, l as css, n as xml, o as markdown, r as typescript, s as json, t as yaml, u as bash } from "../_libs/highlight.js.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root } from "../_libs/radix-ui__react-scroll-area.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-label.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-5G7ZL9Zn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AttachmentPreview({ files, onRemove }) {
	if (files.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-2 flex flex-wrap gap-2",
		children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center gap-2 rounded-md border border-border bg-hover px-2 py-1.5",
			children: [
				file.dataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: file.dataUrl,
					alt: "",
					className: "h-10 w-10 rounded-sm object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-40 truncate text-xs",
						children: file.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-muted",
						children: file.status === "error" ? file.error : formatBytes(file.size)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onRemove(file.id),
					className: "rounded-sm p-0.5 text-muted hover:text-foreground",
					"aria-label": `Remove ${file.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
				})
			]
		}, file.id))
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-surface text-foreground border border-border hover:bg-hover",
			ghost: "text-muted hover:text-foreground hover:bg-hover",
			danger: "text-danger hover:bg-danger/10",
			cyan: "bg-cyan/15 text-cyan hover:bg-cyan/25"
		},
		size: {
			default: "h-9 px-3",
			sm: "h-8 px-2.5 text-xs",
			lg: "h-11 px-4",
			icon: "h-9 w-9",
			"icon-sm": "h-8 w-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-40 overflow-hidden rounded-md border border-border bg-surface p-1 shadow-[var(--shadow)]", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, danger, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none", "focus:bg-hover data-disabled:pointer-events-none data-disabled:opacity-40", inset && "pl-8", danger ? "text-danger" : "text-foreground", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-[11px] font-medium tracking-wide text-muted uppercase", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
function ModelSelector() {
	const conversations = useChatStore((s) => s.conversations);
	const activeId = useChatStore((s) => s.activeId);
	const setModel = useChatStore((s) => s.setModel);
	const createConversation = useChatStore((s) => s.createConversation);
	const status = useChatStore((s) => s.status);
	const current = getModel(conversations.find((c) => c.id === activeId)?.model);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			disabled: status === "streaming",
			className: "gap-1 font-normal text-muted",
			children: [current.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "start",
		className: "w-72",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Model" }), MODELS.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onSelect: () => {
				if (!activeId) createConversation(model.id);
				else setModel(model.id);
			},
			className: "items-start py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 w-4 shrink-0",
				children: model.id === current.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-accent" }) : null
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm",
				children: model.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-muted",
				children: model.description
			})] })]
		}, model.id))]
	})] });
}
var IMAGE_MAX_EDGE = 1280;
function readAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file."));
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.readAsDataURL(file);
	});
}
function readAsText(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file."));
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.readAsText(file);
	});
}
function resizeImage(dataUrl) {
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
			resolve(canvas.toDataURL("image/jpeg", .82));
		};
		img.onerror = () => resolve(dataUrl);
		img.src = dataUrl;
	});
}
async function fileToAttachment(file) {
	const id = createId("file");
	if (isImageFile(file)) {
		if (file.size > 3145728) return {
			id,
			name: file.name,
			mimeType: file.type || "image/*",
			size: file.size,
			status: "error",
			error: "Image is larger than 3 MB."
		};
		const dataUrl = await resizeImage(await readAsDataUrl(file));
		return {
			id,
			name: file.name,
			mimeType: file.type || "image/jpeg",
			size: file.size,
			status: "ready",
			dataUrl
		};
	}
	if (isTextFile(file)) {
		if (file.size > 4e5) return {
			id,
			name: file.name,
			mimeType: file.type || "text/plain",
			size: file.size,
			status: "error",
			error: "File is too large."
		};
		const textContent = await readAsText(file);
		return {
			id,
			name: file.name,
			mimeType: file.type || "text/plain",
			size: file.size,
			status: "ready",
			textContent
		};
	}
	return {
		id,
		name: file.name,
		mimeType: file.type || "application/octet-stream",
		size: file.size,
		status: "error",
		error: "Unsupported file type."
	};
}
async function filesToAttachments(files, existingCount) {
	const room = Math.max(0, 4 - existingCount);
	const slice = Array.from(files).slice(0, room);
	return Promise.all(slice.map(fileToAttachment));
}
function ChatInput() {
	const activeId = useChatStore((s) => s.activeId);
	const drafts = useChatStore((s) => s.drafts);
	const setDraft = useChatStore((s) => s.setDraft);
	const sendMessage = useChatStore((s) => s.sendMessage);
	const stopGeneration = useChatStore((s) => s.stopGeneration);
	const status = useChatStore((s) => s.status);
	const enterToSend = useSettingsStore((s) => s.enterToSend);
	const [files, setFiles] = (0, import_react.useState)([]);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const textareaRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const draftKey = activeId ?? "new";
	const value = drafts[draftKey] ?? "";
	const busy = status === "streaming" || status === "submitting";
	const canSend = Boolean(value.trim() || files.some((f) => f.status === "ready")) && !busy;
	(0, import_react.useEffect)(() => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
	}, [value]);
	async function addFiles(list) {
		const next = await filesToAttachments(list, files.length);
		setFiles((prev) => [...prev, ...next]);
	}
	async function onSubmit(e) {
		e?.preventDefault();
		if (!canSend) return;
		const content = value;
		const attachments = files.filter((f) => f.status === "ready");
		setFiles([]);
		await sendMessage(content, attachments);
		textareaRef.current?.focus();
	}
	function onKeyDown(e) {
		if (e.key === "Enter" && !e.shiftKey && enterToSend) {
			e.preventDefault();
			onSubmit();
		}
	}
	function onPaste(e) {
		const pasted = Array.from(e.clipboardData.files);
		if (pasted.length) {
			e.preventDefault();
			addFiles(pasted);
		}
	}
	function onDrop(e) {
		e.preventDefault();
		setDragging(false);
		const dropped = Array.from(e.dataTransfer.files);
		if (dropped.length) addFiles(dropped);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => void onSubmit(e),
		onDragEnter: (e) => {
			e.preventDefault();
			setDragging(true);
		},
		onDragOver: (e) => e.preventDefault(),
		onDragLeave: () => setDragging(false),
		onDrop,
		className: cn("relative rounded-md border border-border bg-surface p-2 transition-colors", dragging && "border-accent"),
		children: [
			dragging ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/80 text-sm text-foreground",
				children: "Drop files here"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentPreview, {
				files,
				onRemove: (id) => setFiles((prev) => prev.filter((f) => f.id !== id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				ref: textareaRef,
				value,
				onChange: (e) => setDraft(draftKey, e.target.value.slice(0, MAX_MESSAGE_CHARS)),
				onKeyDown,
				onPaste,
				placeholder: "Message Gemma…",
				disabled: status === "submitting",
				rows: 1,
				className: "max-h-52 min-h-12 w-full resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted",
				"aria-label": "Message Gemma"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-1 pb-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							hidden: true,
							multiple: true,
							accept: "image/*,.txt,.md,.json,.csv,.ts,.tsx,.js,.py,.html,.css,.yml,.yaml,.sql,.sh",
							onChange: (e) => {
								addFiles(Array.from(e.target.files ?? []));
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon-sm",
							"aria-label": "Attach file",
							onClick: () => fileRef.current?.click(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSelector, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [value.length > 12800 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted tabular-nums",
						children: [
							value.length.toLocaleString(),
							" / ",
							MAX_MESSAGE_CHARS.toLocaleString()
						]
					}) : null, busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "icon-sm",
						onClick: stopGeneration,
						"aria-label": "Stop generation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5 fill-current" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon-sm",
						disabled: !canSend,
						"aria-label": "Send message",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
					})]
				})]
			})
		]
	});
}
function Tip({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: label })] });
}
function MessageActions({ message, onEdit }) {
	const retryMessage = useChatStore((s) => s.retryMessage);
	const setFeedback = useChatStore((s) => s.setFeedback);
	const status = useChatStore((s) => s.status);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const busy = status === "streaming" || status === "submitting";
	async function copy() {
		await navigator.clipboard.writeText(message.content);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	}
	if (message.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1 flex justify-end opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
			label: "Edit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				onClick: onEdit,
				disabled: busy,
				"aria-label": "Edit message",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
			label: copied ? "Copied" : "Copy",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				onClick: copy,
				"aria-label": "Copy message",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
				label: copied ? "Copied" : "Copy",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: copy,
					"aria-label": "Copy response",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
				label: "Regenerate",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					disabled: busy,
					onClick: () => retryMessage(message.id),
					"aria-label": "Regenerate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
				label: "Good response",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: () => setFeedback(message.id, message.feedback === "up" ? null : "up"),
					"aria-label": "Good response",
					className: message.feedback === "up" ? "text-cyan" : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
				label: "Poor response",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: () => setFeedback(message.id, message.feedback === "down" ? null : "down"),
					"aria-label": "Poor response",
					className: message.feedback === "down" ? "text-danger" : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, {})
				})
			})
		]
	});
}
core_default.registerLanguage("javascript", javascript);
core_default.registerLanguage("js", javascript);
core_default.registerLanguage("typescript", typescript);
core_default.registerLanguage("ts", typescript);
core_default.registerLanguage("tsx", typescript);
core_default.registerLanguage("jsx", javascript);
core_default.registerLanguage("python", python);
core_default.registerLanguage("py", python);
core_default.registerLanguage("json", json);
core_default.registerLanguage("html", xml);
core_default.registerLanguage("xml", xml);
core_default.registerLanguage("css", css);
core_default.registerLanguage("bash", bash);
core_default.registerLanguage("sh", bash);
core_default.registerLanguage("shell", bash);
core_default.registerLanguage("sql", sql);
core_default.registerLanguage("markdown", markdown);
core_default.registerLanguage("md", markdown);
core_default.registerLanguage("yaml", yaml);
core_default.registerLanguage("yml", yaml);
function highlight(code, language) {
	if (language && core_default.getLanguage(language)) try {
		return core_default.highlight(code, { language }).value;
	} catch {}
	return core_default.highlightAuto(code).value;
}
function CodeBlock({ code, language }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const html = highlight(code.replace(/\n$/, ""), language);
	const label = language || "code";
	async function copy() {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1400);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group my-3 overflow-hidden rounded-md border border-border bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border bg-hover/60 px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] tracking-wide text-muted uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: copy,
				className: "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] text-muted hover:bg-hover hover:text-foreground",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), copied ? "Copied" : "Copy"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: cn("overflow-x-auto p-3 font-mono text-[12.5px] leading-relaxed"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { dangerouslySetInnerHTML: { __html: html } })
		})]
	});
}
var components = {
	a: ({ href, children }) => {
		const safe = href && /^(https?:|mailto:|#)/i.test(href) ? href : void 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: safe,
			target: safe?.startsWith("http") ? "_blank" : void 0,
			rel: "noreferrer",
			children
		});
	},
	pre: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }),
	code: ({ className, children }) => {
		const text = String(children ?? "");
		const match = /language-([\w+-]+)/.exec(className ?? "");
		if (Boolean(match) || text.includes("\n")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			code: text,
			language: match?.[1]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: text });
	}
};
function MessageContent({ content, streaming }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "markdown-body",
		children: [content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			components,
			children: content
		}) : null, streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "streaming-caret",
			"aria-hidden": true
		}) : null]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-11 w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted", "transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--accent),0_0_18px_color-mix(in_oklab,var(--accent)_28%,transparent)]", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
function ChatMessage({ message }) {
	const isUser = message.role === "user";
	const showTimestamps = useSettingsStore((s) => s.showTimestamps);
	const compact = useSettingsStore((s) => s.compactMessages);
	const editAndResubmit = useChatStore((s) => s.editAndResubmit);
	const retryMessage = useChatStore((s) => s.retryMessage);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(message.content);
	const streaming = message.status === "streaming";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group animate-message-in flex gap-3", isUser && "flex-row-reverse"),
		"aria-label": isUser ? "Your message" : "Gemma response",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md", isUser ? "bg-accent/20 text-accent" : "bg-cyan/15 text-cyan"),
			"aria-hidden": true,
			children: isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("min-w-0 max-w-[min(100%,44rem)]", isUser && "items-end"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-md px-4 leading-relaxed", compact ? "py-2" : "py-3", isUser ? "bg-user" : "border border-border bg-assistant", message.status === "error" && "border-danger/40"),
				children: [
					message.attachments && message.attachments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex flex-wrap gap-2",
						children: message.attachments.map((file) => file.dataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: file.dataUrl,
							alt: file.name,
							className: "h-24 w-24 rounded-sm border border-border object-cover"
						}, file.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-sm border border-border bg-hover px-2 py-1 font-mono text-[11px] text-muted",
							children: file.name
						}, file.id))
					}) : null,
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							editAndResubmit(message.id, draft);
							setEditing(false);
						},
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							rows: 4
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: () => setEditing(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								children: "Save & resubmit"
							})]
						})]
					}) : isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap",
						children: message.content
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageContent, {
						content: message.content,
						streaming
					}),
					message.status === "error" && message.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-sm border border-danger/30 bg-danger/10 px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-danger",
								children: "Unable to generate response"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: message.error.message
							}),
							message.error.retryable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								size: "sm",
								className: "mt-2",
								onClick: () => retryMessage(message.id),
								children: "Retry"
							}) : null
						]
					}) : null,
					message.status === "cancelled" && message.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Generation stopped."
					}) : null,
					showTimestamps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1.5 block text-[11px] text-muted tabular-nums",
						children: formatTime(message.createdAt)
					}) : null
				]
			}), !editing && message.status !== "pending" && message.status !== "streaming" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageActions, {
				message,
				onEdit: isUser ? () => setEditing(true) : void 0
			}) : null]
		})]
	});
}
var PROMPTS = [
	{
		title: "Explain quantum computing",
		body: "Explain quantum computing to a curious software engineer in plain language, then give a tiny Python-flavoured analogy."
	},
	{
		title: "Build a React component",
		body: "Write a polished React + TypeScript autocomplete component with keyboard support and a brief usage example."
	},
	{
		title: "Research Australian history",
		body: "Give a concise briefing on the Federation of Australia: causes, key figures, and lasting effects."
	},
	{
		title: "Debug this approach",
		body: "I have a chat UI that feels laggy while streaming tokens. Walk me through the likely causes and a clean React architecture."
	}
];
function EmptyState() {
	const sendMessage = useChatStore((s) => s.sendMessage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center px-4 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex size-12 items-center justify-center rounded-md border border-border bg-surface text-cyan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Gemma AI Assistant"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted",
				children: "Dark Mistral interface. Ask anything — code, research, or a hard design problem."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2",
				children: PROMPTS.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void sendMessage(prompt.body),
					className: "rounded-md border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-accent/50 hover:bg-hover",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: prompt.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 line-clamp-2 text-xs text-muted",
						children: prompt.body
					})]
				}, prompt.title))
			})
		]
	});
}
function TypingIndicator() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 text-muted",
		"aria-live": "polite",
		"aria-label": "Gemma is responding",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-8 items-center justify-center rounded-md bg-cyan/15 text-cyan",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "typing-dot size-1.5 rounded-full bg-cyan",
				style: { animationDelay: `${i * .16}s` }
			}, i))
		})]
	});
}
function useAutoScroll(deps) {
	const containerRef = (0, import_react.useRef)(null);
	const bottomRef = (0, import_react.useRef)(null);
	const stickRef = (0, import_react.useRef)(true);
	const [isStuck, setIsStuck] = (0, import_react.useState)(true);
	const onScroll = (0, import_react.useCallback)(() => {
		const el = containerRef.current;
		if (!el) return;
		const stuck = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
		stickRef.current = stuck;
		setIsStuck(stuck);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!stickRef.current) return;
		bottomRef.current?.scrollIntoView({ block: "end" });
	}, deps);
	return {
		containerRef,
		bottomRef,
		onScroll,
		isStuck,
		scrollToBottom: (0, import_react.useCallback)(() => {
			stickRef.current = true;
			setIsStuck(true);
			bottomRef.current?.scrollIntoView({
				block: "end",
				behavior: "smooth"
			});
		}, [])
	};
}
function ConversationView() {
	const conversations = useChatStore((s) => s.conversations);
	const activeId = useChatStore((s) => s.activeId);
	const status = useChatStore((s) => s.status);
	const messages = conversations.find((c) => c.id === activeId)?.messages ?? [];
	const { containerRef, bottomRef, onScroll, isStuck, scrollToBottom } = useAutoScroll([messages.map((m) => `${m.id}:${m.content.length}:${m.status}`).join("|"), status]);
	const empty = messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-0 flex-1 flex-col",
		children: [
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: containerRef,
				onScroll,
				className: "min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-3xl space-y-5",
					"aria-live": "polite",
					children: [messages.map((message) => {
						if (message.role === "assistant" && (message.status === "pending" || message.status === "streaming" && !message.content)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingIndicator, {}, message.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatMessage, { message }, message.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottomRef })]
				})
			}),
			!empty && !isStuck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-28 flex justify-center sm:bottom-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: "pointer-events-auto shadow-[var(--shadow)]",
					onClick: scrollToBottom,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5" }), " New messages"]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "composer",
				className: "border-t border-border px-3 pt-3 pb-14 sm:px-6 sm:pb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatInput, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-xs text-muted",
						children: "Gemma can be wrong. Double-check anything that matters."
					})]
				})
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-background/70", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-5 shadow-[var(--shadow)]", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-3 right-3 rounded-md p-1 text-muted hover:bg-hover hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 space-y-1", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-base font-semibold", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function CommandSearch() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Jump to a conversation or run a command." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				className: "bg-surface text-foreground",
				loop: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					placeholder: "Search conversations…",
					className: "h-12 w-full border-b border-border bg-transparent px-4 pr-10 text-sm outline-none placeholder:text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-80 overflow-y-auto p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
							className: "px-2 py-6 text-center text-sm text-muted",
							children: "No results."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
							heading: "Actions",
							className: "mb-2 text-[10px] font-medium tracking-widest text-muted uppercase [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "new chat",
									onSelect: () => {
										createConversation();
										close();
									},
									className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 text-muted" }), " New chat"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "open settings",
									onSelect: () => {
										close();
										setSettingsOpen(true);
									},
									className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-3.5 text-muted" }), " Open settings"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
									value: "keyboard shortcuts",
									onSelect: () => {
										close();
										setShortcutsOpen(true);
									},
									className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-3.5 text-muted" }), " Keyboard shortcuts"]
								})
							]
						}),
						conversations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Conversations",
							className: "text-[10px] font-medium tracking-widest text-muted uppercase [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
							children: conversations.map((conversation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
								value: `${conversation.title} ${conversation.messages.map((m) => m.content).join(" ").slice(0, 240)}`,
								onSelect: () => {
									selectConversation(conversation.id);
									close();
								},
								className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-hover",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-3.5 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: conversation.title
								})]
							}, conversation.id))
						}) : null
					]
				})]
			})]
		})
	});
}
function Header() {
	const toggleSidebar = useUiStore((s) => s.toggleSidebar);
	const setSettingsOpen = useUiStore((s) => s.setSettingsOpen);
	const setShortcutsOpen = useUiStore((s) => s.setShortcutsOpen);
	const conversations = useChatStore((s) => s.conversations);
	const activeId = useChatStore((s) => s.activeId);
	const status = useChatStore((s) => s.status);
	const active = conversations.find((c) => c.id === activeId);
	const model = getModel(active?.model);
	const used = estimateTokens((active?.messages ?? []).map((m) => m.content).join(" "));
	const pct = Math.min(100, Math.round(used / model.contextTokens * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					className: "lg:hidden",
					onClick: toggleSidebar,
					"aria-label": "Open sidebar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "flex items-center gap-2 text-[15px] font-semibold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full bg-cyan", status === "streaming" ? "animate-pulse" : "") }), "Gemma AI"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-xs text-muted sm:inline",
					children: "Dark Mistral"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 sm:gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 sm:flex",
					title: "Estimated context",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 w-16 overflow-hidden rounded-full bg-hover",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-accent",
							style: { width: `${pct}%` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted tabular-nums",
						children: [
							formatTokenCount(used),
							" / ",
							formatTokenCount(model.contextTokens)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: () => setShortcutsOpen(true),
					"aria-label": "Keyboard shortcuts",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: () => setSettingsOpen(true),
					"aria-label": "Settings",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
				})
			]
		})]
	});
}
var SHORTCUTS = [
	{
		keys: ["⌘", "N"],
		action: "New chat"
	},
	{
		keys: ["⌘", "K"],
		action: "Search conversations"
	},
	{
		keys: ["⌘", ","],
		action: "Open settings"
	},
	{
		keys: ["⌘", "/"],
		action: "Keyboard shortcuts"
	},
	{
		keys: ["Esc"],
		action: "Stop generation / close dialogs"
	},
	{
		keys: ["Enter"],
		action: "Send message"
	},
	{
		keys: ["Shift", "Enter"],
		action: "New line"
	}
];
function isMac() {
	if (typeof navigator === "undefined") return true;
	return /Mac|iPhone|iPad/.test(navigator.platform) || /Mac OS/.test(navigator.userAgent);
}
function ShortcutsModal() {
	const open = useUiStore((s) => s.shortcutsOpen);
	const setOpen = useUiStore((s) => s.setShortcutsOpen);
	const mac = isMac();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Keyboard shortcuts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Stay in the editor without reaching for the mouse." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: SHORTCUTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: item.action
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex items-center gap-1",
						children: item.keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded-sm border border-border bg-hover px-1.5 py-0.5 font-mono text-[11px] text-muted",
							children: key === "⌘" ? mac ? "⌘" : "Ctrl" : key
						}, key))
					})]
				}, item.action))
			})]
		})
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-9 w-full rounded-md border border-border bg-surface px-3 py-1 text-sm text-foreground placeholder:text-muted", "transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--accent),0_0_18px_color-mix(in_oklab,var(--accent)_28%,transparent)]", "disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
		orientation: "vertical",
		className: "flex w-1.5 touch-none p-px select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "relative flex-1 rounded-full bg-border" })
	})]
}));
ScrollArea.displayName = Root.displayName;
var GROUP_ORDER = [
	"Pinned",
	"Today",
	"Yesterday",
	"Last 7 days",
	"Older"
];
function ConversationRow({ conversation, active }) {
	const selectConversation = useChatStore((s) => s.selectConversation);
	const deleteConversation = useChatStore((s) => s.deleteConversation);
	const renameConversation = useChatStore((s) => s.renameConversation);
	const pinConversation = useChatStore((s) => s.pinConversation);
	const duplicateConversation = useChatStore((s) => s.duplicateConversation);
	const exportConversation = useChatStore((s) => s.exportConversation);
	const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
	const [renaming, setRenaming] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)(conversation.title);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm", active ? "bg-hover text-foreground" : "text-muted hover:bg-hover hover:text-foreground"),
		children: [renaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "flex-1",
			onSubmit: (e) => {
				e.preventDefault();
				renameConversation(conversation.id, title);
				setRenaming(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus: true,
				value: title,
				onChange: (e) => setTitle(e.target.value),
				onBlur: () => {
					renameConversation(conversation.id, title);
					setRenaming(false);
				},
				className: "h-7"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "min-w-0 flex-1 truncate text-left",
			onClick: () => {
				selectConversation(conversation.id);
				setSidebarOpen(false);
			},
			children: [conversation.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "mr-1 inline size-3 text-accent" }) : null, conversation.title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
				"aria-label": "Conversation actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			align: "end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => setRenaming(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), " Rename"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => pinConversation(conversation.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-3.5" }),
						" ",
						conversation.pinned ? "Unpin" : "Pin"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => duplicateConversation(conversation.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), " Duplicate"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => exportConversation(conversation.id, "md"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Export Markdown"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: () => exportConversation(conversation.id, "json"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), " Export JSON"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					danger: true,
					onSelect: () => deleteConversation(conversation.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Delete"]
				})
			]
		})] })]
	});
}
function SidebarBody() {
	const conversations = useChatStore((s) => s.conversations);
	const activeId = useChatStore((s) => s.activeId);
	const createConversation = useChatStore((s) => s.createConversation);
	const importConversation = useChatStore((s) => s.importConversation);
	const setSearchOpen = useUiStore((s) => s.setSearchOpen);
	const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
	const fileRef = (0, import_react.useRef)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const groups = (0, import_react.useMemo)(() => {
		const filtered = conversations.filter((c) => {
			if (!query.trim()) return true;
			const q = query.toLowerCase();
			return c.title.toLowerCase().includes(q) || c.messages.some((m) => m.content.toLowerCase().includes(q));
		});
		const map = /* @__PURE__ */ new Map();
		for (const c of filtered) {
			const group = conversationGroup(c.updatedAt, c.pinned);
			const list = map.get(group) ?? [];
			list.push(c);
			map.set(group, list);
		}
		return GROUP_ORDER.map((g) => [g, map.get(g) ?? []]).filter(([, list]) => list.length > 0);
	}, [conversations, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between px-3 pt-3 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Conversations"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "flex-1 justify-start",
						onClick: () => {
							createConversation();
							setSidebarOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New chat"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "icon",
						"aria-label": "Search conversations",
						onClick: () => setSearchOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search",
						className: "pl-8",
						"aria-label": "Search conversations"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "mt-3 flex-1 px-2",
				children: groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-6 text-center text-xs text-muted",
					children: "No conversations yet."
				}) : groups.map(([group, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 pb-1 text-[10px] font-medium tracking-widest text-muted uppercase",
						children: group
					}), list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationRow, {
						conversation: c,
						active: c.id === activeId
					}, c.id))]
				}, group))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "application/json",
					hidden: true,
					onChange: async (e) => {
						const file = e.target.files?.[0];
						e.target.value = "";
						if (!file) return;
						try {
							const json = JSON.parse(await file.text());
							importConversation(json);
						} catch {}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full justify-start text-muted",
					onClick: () => fileRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}), " Import"]
				})]
			})
		]
	});
}
function Sidebar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "hidden h-full w-64 shrink-0 border-r border-border lg:flex lg:flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, {})
	});
}
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted", className),
	...props
}));
Label.displayName = Root$1.displayName;
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none items-center select-none", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1 w-full grow overflow-hidden rounded-full bg-hover",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-accent bg-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60" })]
}));
Slider.displayName = Slider$1.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors", "data-[state=checked]:bg-accent data-[state=unchecked]:bg-hover", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-50", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-3.5 w-3.5 rounded-full bg-foreground shadow-sm transition-transform", "data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]") })
}));
Switch.displayName = Switch$1.displayName;
var THEMES = [
	{
		id: "dark",
		label: "Dark"
	},
	{
		id: "oled",
		label: "OLED"
	},
	{
		id: "light",
		label: "Light"
	},
	{
		id: "system",
		label: "System"
	}
];
function Row({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-foreground",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted",
				children: hint
			}) : null]
		}), children]
	});
}
function SettingsPanel() {
	const open = useUiStore((s) => s.settingsOpen);
	const setOpen = useUiStore((s) => s.setSettingsOpen);
	const theme = useSettingsStore((s) => s.theme);
	const setTheme = useSettingsStore((s) => s.setTheme);
	const enterToSend = useSettingsStore((s) => s.enterToSend);
	const setEnterToSend = useSettingsStore((s) => s.setEnterToSend);
	const showTimestamps = useSettingsStore((s) => s.showTimestamps);
	const setShowTimestamps = useSettingsStore((s) => s.setShowTimestamps);
	const compactMessages = useSettingsStore((s) => s.compactMessages);
	const setCompactMessages = useSettingsStore((s) => s.setCompactMessages);
	const saveConversations = useSettingsStore((s) => s.saveConversations);
	const setSaveConversations = useSettingsStore((s) => s.setSaveConversations);
	const generation = useSettingsStore((s) => s.generation);
	const setTemperature = useSettingsStore((s) => s.setTemperature);
	const setTopP = useSettingsStore((s) => s.setTopP);
	const setMaxOutputTokens = useSettingsStore((s) => s.setMaxOutputTokens);
	const setSystemInstruction = useSettingsStore((s) => s.setSystemInstruction);
	const resetGeneration = useSettingsStore((s) => s.resetGeneration);
	const clearAll = useChatStore((s) => s.clearAll);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (!next) setConfirmClear(false);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[min(40rem,calc(100dvh-2rem))] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Appearance, chat behaviour, and generation for Gemma." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-medium tracking-widest text-muted uppercase",
						children: "Appearance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-1.5",
						children: THEMES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTheme(item.id),
							className: cn("rounded-md border px-2 py-2 text-xs font-medium transition-colors", theme === item.id ? "border-accent bg-accent/15 text-foreground" : "border-border bg-hover/40 text-muted hover:bg-hover hover:text-foreground"),
							children: item.label
						}, item.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Chat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Enter to send",
							hint: "Shift+Enter always inserts a newline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: enterToSend,
								onCheckedChange: setEnterToSend,
								"aria-label": "Enter to send"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Show timestamps",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: showTimestamps,
								onCheckedChange: setShowTimestamps,
								"aria-label": "Show timestamps"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Compact messages",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: compactMessages,
								onCheckedChange: setCompactMessages,
								"aria-label": "Compact messages"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Save chats on this device",
							hint: "Stored locally in your browser",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: saveConversations,
								onCheckedChange: (value) => {
									setSaveConversations(value);
									if (!value) {
										try {
											localStorage.removeItem("gemma-conversations");
										} catch {}
										toast.message("Future chats will not be saved");
									}
								},
								"aria-label": "Save conversations"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-medium tracking-widest text-muted uppercase",
								children: "Generation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: resetGeneration,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Reset"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "temperature",
										children: "Temperature"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted tabular-nums",
										children: generation.temperature.toFixed(2)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									id: "temperature",
									min: 0,
									max: 1.5,
									step: .05,
									value: [generation.temperature],
									onValueChange: (v) => setTemperature(v[0] ?? .7)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "top-p",
										children: "Top P"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted tabular-nums",
										children: generation.topP.toFixed(2)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									id: "top-p",
									min: 0,
									max: 1,
									step: .05,
									value: [generation.topP],
									onValueChange: (v) => setTopP(v[0] ?? 1)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "max-tokens",
										children: "Max output tokens"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted tabular-nums",
										children: generation.maxOutputTokens
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									id: "max-tokens",
									min: 256,
									max: 2048,
									step: 128,
									value: [generation.maxOutputTokens],
									onValueChange: (v) => setMaxOutputTokens(v[0] ?? 1024)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "system-instruction",
									children: "System instruction"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "system-instruction",
									className: "mt-2 min-h-28",
									value: generation.systemInstruction,
									onChange: (e) => setSystemInstruction(e.target.value.slice(0, 4e3))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted",
							children: [
								"Models: ",
								MODELS.map((m) => m.name).join(" · "),
								". Replies are generated by xAI Grok."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-widest text-muted uppercase",
							children: "Data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 mb-3 text-xs text-muted",
							children: "Clears every conversation from this browser. This cannot be undone."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "danger",
							size: "sm",
							onClick: () => {
								if (!confirmClear) {
									setConfirmClear(true);
									return;
								}
								clearAll();
								try {
									localStorage.removeItem("gemma-conversations");
								} catch {}
								setConfirmClear(false);
								toast.message("All conversations deleted");
							},
							children: confirmClear ? "Click again to confirm" : "Delete all conversations"
						})
					]
				})
			]
		})
	});
}
var Sheet = Dialog$1;
var SheetContent = import_react.forwardRef(({ className, children, side = "left", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, { className: "fixed inset-0 z-50 bg-background/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed z-50 flex h-full w-[min(20rem,calc(100%-2rem))] flex-col border-border bg-surface shadow-[var(--shadow)]", side === "left" ? "inset-y-0 left-0 border-r" : "inset-y-0 right-0 border-l", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
			className: "sr-only",
			children: "Conversations"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
			className: "sr-only",
			children: "Browse and manage Gemma conversations"
		}),
		children
	]
})] }));
SheetContent.displayName = "SheetContent";
function MainLayout() {
	const sidebarOpen = useUiStore((s) => s.sidebarOpen);
	const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
	const [aiAvailable, setAiAvailable] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		checkAiAvailable().then((ok) => {
			if (!cancelled) setAiAvailable(ok);
		}).catch(() => {
			if (!cancelled) setAiAvailable(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#composer",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2",
				children: "Skip to composer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: sidebarOpen,
				onOpenChange: setSidebarOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "left",
					className: "w-72 bg-background p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					aiAvailable === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-danger/30 bg-danger/10 px-4 py-2 text-center text-xs text-danger",
						children: "Gemma is offline in this environment. You can still browse saved chats, but new replies cannot be generated."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationView, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutsModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSearch, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainLayout, {});
}
//#endregion
export { Home as component };
