const BADGES = [
  {
    icon: "✓",
    title: "Free cancellation",
    body: "Cancel up to 6 hours before pickup, no questions asked.",
  },
  {
    icon: "₹",
    title: "Pay the driver",
    body: "Pay 20% now to confirm, the rest to your driver on arrival.",
  },
  {
    icon: "⛊",
    title: "No hidden fares",
    body: "Every quote includes GST, state tax and toll estimates.",
  },
];

export default function TrustBadges() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {BADGES.map((b) => (
        <div
          key={b.title}
          className="border border-line rounded-lg p-5 bg-surface"
        >
          <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center font-display font-bold text-sm mb-3">
            {b.icon}
          </div>
          <p className="font-display font-semibold text-ink text-sm mb-2">{b.title}</p>
          <p className="font-body text-ink-muted text-sm leading-relaxed">
            {b.body}
          </p>
        </div>
      ))}
    </div>
  );
}
