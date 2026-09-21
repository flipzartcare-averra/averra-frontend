import { useEffect, useRef, useState } from "react";

// Animates from the previous value up to `target`, like a taxi meter ticking.
export default function FareMeter({ target, subLabel, loading }) {
  const [displayed, setDisplayed] = useState(target);
  const frame = useRef(null);
  const from = useRef(target);

  useEffect(() => {
    const start = from.current;
    const end = target;
    const duration = 650;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out so the last few rupees "settle" like a real meter
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (end - start) * eased);
      setDisplayed(value);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        from.current = end;
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className="bg-road rounded-md border border-roadline px-5 py-4 flex items-end justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-steel mb-1">
          Estimated fare
        </p>
        <p className="font-mono text-4xl text-meter meter-glow tabular-nums">
          ₹{displayed.toLocaleString("en-IN")}
        </p>
      </div>
      {subLabel && (
        <p className="font-mono text-[10px] text-steel text-right leading-relaxed flex items-center gap-1.5 justify-end">
          {loading && (
            <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-steel/40 border-t-steel animate-spin" />
          )}
          {subLabel}
        </p>
      )}
    </div>
  );
}
