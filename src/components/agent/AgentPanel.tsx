import { X, Send, Sparkles, Globe, Search, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

interface AgentPanelProps {
  onClose: () => void;
  /** Position of the panel in viewport px (top-left corner). */
  style: React.CSSProperties;
  titleId: string;
}

const capabilities = [
  { icon: Globe, label: "Browse the web" },
  { icon: Search, label: "Research topics" },
  { icon: Zap, label: "Automate tasks" },
];

export function AgentPanel({ onClose, style, titleId }: AgentPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

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
          <p className="truncate text-xs text-muted-foreground">Idle · ready when you are</p>
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

      <div className="max-h-[50vh] space-y-3 overflow-y-auto px-4 py-4">
        <div className="rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
          Hi! I&apos;m your autonomous web agent. Ask me to explore this site or run a task and
          I&apos;ll take it from here.
        </div>
        <ul className="grid gap-2">
          {capabilities.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-foreground"
            >
              <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <form
        className="flex items-center gap-2 border-t border-border px-3 py-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Ask the agent anything…"
          aria-label="Message the agent"
          className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
