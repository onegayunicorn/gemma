import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/chat/CodeBlock";

const components: Components = {
  a: ({ href, children }) => {
    const safe = href && /^(https?:|mailto:|#)/i.test(href) ? href : undefined;
    return (
      <a href={safe} target={safe?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  },
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) => {
    const text = String(children ?? "");
    const match = /language-([\w+-]+)/.exec(className ?? "");
    const isBlock = Boolean(match) || text.includes("\n");
    if (isBlock) {
      return <CodeBlock code={text} language={match?.[1]} />;
    }
    return <code>{text}</code>;
  },
};

export function MessageContent({ content, streaming }: { content: string; streaming?: boolean }) {
  return (
    <div className="markdown-body">
      {content ? <Markdown remarkPlugins={[remarkGfm]} components={components}>{content}</Markdown> : null}
      {streaming ? <span className="streaming-caret" aria-hidden /> : null}
    </div>
  );
}
