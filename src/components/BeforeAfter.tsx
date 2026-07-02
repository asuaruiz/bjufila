import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";
import { ux } from "../lib/img";

export function BeforeAfter({
  beforeId,
  afterId,
  className = "",
}: {
  beforeId: string;
  afterId: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative select-none overflow-hidden rounded-3xl ${className}`}
      style={{ aspectRatio: "4 / 3", touchAction: "pan-y" }}
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* After (base) */}
      <img
        src={ux(afterId, 900, 675)}
        alt="After professional cleaning"
        width={900}
        height={675}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute bottom-4 right-4 rounded-full bg-navy-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        After
      </span>

      {/* Before (clipped via clip-path so the image never distorts) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={ux(beforeId, 900, 675)}
          alt="Before cleaning"
          width={900}
          height={675}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "grayscale(0.55) brightness(0.68) contrast(0.9) sepia(0.18) saturate(0.8)" }}
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-900">
          Before
        </span>
      </div>

      {/* Handle */}
      <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-royal-600 shadow-lift">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
