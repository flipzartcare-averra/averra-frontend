export default function CabTypeCard({ cab }) {
  return (
    <div className="bg-surface border border-line rounded-lg p-5 flex flex-col gap-4 hover:border-brand/50 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display font-semibold text-ink text-base tracking-tight">
            {cab.label}
          </p>
          <p className="font-body text-ink-muted text-xs mt-1">{cab.example}</p>
        </div>
        <span className="font-body text-[10px] font-semibold uppercase tracking-wide text-brand bg-brand/10 rounded-full px-2.5 py-1">
          {cab.seats} seats
        </span>
      </div>

      <div className="font-mono text-xs text-ink-muted flex flex-col gap-1">
        <div className="flex justify-between">
          <span>Base fare</span>
          <span className="text-ink tabular-nums">
            ₹{cab.baseFare.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Included</span>
          <span className="text-ink tabular-nums">{cab.baseKm} km</span>
        </div>
        <div className="flex justify-between">
          <span>Extra fare</span>
          <span className="text-ink tabular-nums">₹{cab.perKm}/km</span>
        </div>
      </div>

      <a
        href="#book"
        className="mt-auto text-center font-body text-sm font-semibold bg-accent text-white rounded-md py-2.5 hover:bg-accent-dark transition-colors"
      >
        Select
      </a>
    </div>
  );
}
