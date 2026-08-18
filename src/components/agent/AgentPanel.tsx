import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { askAgent, type AgentMessage } from "@/lib/agent.functions";

interface AgentPanelProps {
  onClose: () => void;
  /** Position of the panel in viewport px. */
  style: React.CSSProperties;
  titleId: string;
}

/** Grab a plain-text snapshot of the page so the agent can answer about it. */
function capturePageContext(): string {
  const main = document.querySelector("main") ?? document.body;
  const clone = main.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("#floating-agent-root, script, style, noscript").forEach((n) => n.remove());
  const text = (clone.innerText || clone.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
  return `Page title: ${document.title}\nURL: ${location.pathname}\n\n${text}`.slice(0, 12000);
}

const suggestions = [
  "What is this page about?",
  "Summarize the main sections",
  "Who is on the committee?",
];

export function AgentPanel({ onClose, style, titleId }: AgentPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ask = useServerFn(askAgent);

  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || pending) return;
    const next: AgentMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError(null);
    setPending(true);
    try {
      const result = await ask({
        data: { messages: next.slice(-12), pageContext: capturePageContext() },
      });
      if (result.ok) {
        setMessages((m) => [...m, { role: "assistant", content: result.reply }]);
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.error(e);
      setError("Couldn't reach the agent. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      style={style}
      className="fixed z-[9998] w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_20px_60px_-15px_rgb(0_0_0/0.35)] animate-in fade-in zoom-in-95 duration-150"
    >
      <header className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="truncate text-sm font-semibold">
            AI Autonomous Agent
          </h2>
          <p className="truncate text-xs text-muted-foreground">
            {pending ? "Thinking…" : "Ask me about this page"}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close agent panel"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </header>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="max-h-[50vh] min-h-[9rem] space-y-3 overflow-y-auto px-4 py-4"
      >
        <div className="rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
          Hi! I&apos;m your autonomous web agent. Ask me anything about the content on this page.
        </div>

        {messages.length === 0 && (
          <ul className="grid gap-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => void send(s)}
                  className="w-full rounded-lg border border-border px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                : "w-fit max-w-[90%] whitespace-pre-wrap rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-foreground"
            }
          >
            {m.content}
          </div>
        ))}

        {pending && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            Reading the page…
          </div>
        )}

        {error && (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>

      <form
        className="flex items-center gap-2 border-t border-border px-3 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the agent anything…"
          aria-label="Message the agent"
          className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={pending || !input.trim()}
          aria-label="Send message"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {pending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
}
