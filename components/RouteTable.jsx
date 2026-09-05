export default function RouteTable({ routes }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full text-left border-collapse min-w-[560px]">
        <thead>
          <tr className="bg-surface-alt font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            <th className="px-4 py-3">Route</th>
            <th className="px-4 py-3">Distance</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3 text-right">Starting fare</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r, i) => (
            <tr
              key={`${r.from}-${r.to}-${i}`}
              className="border-t border-line font-body text-sm text-ink hover:bg-surface-alt/60 transition-colors"
            >
              <td className="px-4 py-3">
                {r.from} <span className="text-ink-muted">→</span> {r.to}
              </td>
              <td className="px-4 py-3 font-mono text-ink-muted">{r.km} km</td>
              <td className="px-4 py-3 font-mono text-ink-muted">{r.hours}</td>
              <td className="px-4 py-3 font-mono text-right text-price-green font-semibold tabular-nums">
                ₹{r.fare.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 text-right">
                <a
                  href="#book"
                  className="font-body text-xs font-semibold text-brand hover:underline"
                >
                  Book
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
