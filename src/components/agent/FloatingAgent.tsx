import { useCallback, useEffect, useId, useRef, useState } from "react";
import agentIcon from "@/assets/ai-agent-icon.png";
import { AgentPanel } from "./AgentPanel";

const ICON_SIZE = 72;
const MARGIN = 16;
const STORAGE_KEY = "floating-agent-position";
const DRAG_THRESHOLD = 4;

type Point = { x: number; y: number };

function clampToViewport({ x, y }: Point): Point {
  const maxX = Math.max(MARGIN, window.innerWidth - ICON_SIZE - MARGIN);
  const maxY = Math.max(MARGIN, window.innerHeight - ICON_SIZE - MARGIN);
  return {
    x: Math.min(Math.max(x, MARGIN), maxX),
    y: Math.min(Math.max(y, MARGIN), maxY),
  };
}

function defaultPosition(): Point {
  return clampToViewport({
    x: window.innerWidth - ICON_SIZE - 24,
    y: window.innerHeight - ICON_SIZE - 24,
  });
}

/**
 * Isolated, reusable floating AI agent launcher.
 * Purely presentational for now — no AI wiring.
 */
export function FloatingAgent() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const offset = useRef<Point>({ x: 0, y: 0 });
  const moved = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Restore session position after hydration.
  useEffect(() => {
    let next = defaultPosition();
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Point;
        if (typeof parsed?.x === "number" && typeof parsed?.y === "number") {
          next = clampToViewport(parsed);
        }
      }
    } catch {
      /* ignore */
    }
    setPosition(next);
    setMounted(true);
  }, []);

  // Keep inside bounds on resize / orientation change.
  useEffect(() => {
    if (!mounted) return;
    const onResize = () => setPosition((p) => clampToViewport(p));
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [mounted]);

  const persist = useCallback((p: Point) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      /* ignore */
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    buttonRef.current?.setPointerCapture(e.pointerId);
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    moved.current = false;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    e.preventDefault();
    const next = clampToViewport({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
    if (
      Math.abs(next.x - position.x) > DRAG_THRESHOLD ||
      Math.abs(next.y - position.y) > DRAG_THRESHOLD
    ) {
      moved.current = true;
    }
    setPosition(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    buttonRef.current?.releasePointerCapture?.(e.pointerId);
    setDragging(false);
    persist(position);
  };

  const handleClick = () => {
    if (moved.current) {
      moved.current = false;
      return;
    }
    setOpen((v) => !v);
  };

  // Outside click + Escape to close.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        !document.getElementById("floating-agent-root")?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!mounted) return null;

  // Panel placement: prefer above-left of the icon, clamped into the viewport.
  const panelWidth = Math.min(352, window.innerWidth - 24);
  const panelLeft = Math.min(
    Math.max(12, position.x + ICON_SIZE / 2 - panelWidth / 2),
    Math.max(12, window.innerWidth - panelWidth - 12),
  );
  const openAbove = position.y > window.innerHeight / 2;
  const panelStyle: React.CSSProperties = openAbove
    ? { left: panelLeft, bottom: window.innerHeight - position.y + 12 }
    : { left: panelLeft, top: position.y + ICON_SIZE + 12 };

  return (
    <div id="floating-agent-root">
      {open && (
        <AgentPanel titleId={titleId} style={panelStyle} onClose={() => setOpen(false)} />
      )}
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close AI agent" : "Open AI agent"}
        aria-expanded={open}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={handleClick}
        style={{ left: position.x, top: position.y, width: ICON_SIZE, height: ICON_SIZE }}
        className={`fixed z-[9999] touch-none select-none rounded-full bg-transparent p-0 transition-[transform,filter] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
          dragging
            ? "cursor-grabbing scale-105 drop-shadow-[0_12px_24px_rgb(0_0_0/0.3)]"
            : "cursor-grab drop-shadow-[0_8px_20px_rgb(0_0_0/0.25)] hover:scale-105"
        }`}
      >
        <img
          src={agentIcon}
          alt="AI agent"
          width={ICON_SIZE}
          height={ICON_SIZE}
          draggable={false}
          loading="lazy"
          className="pointer-events-none size-full object-contain"
        />
      </button>
    </div>
  );
}
