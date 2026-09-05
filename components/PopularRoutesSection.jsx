import { useEffect, useState } from "react";
import { API_BASE } from "../lib/apiBase";
import { POPULAR_ROUTES } from "../lib/data";
import RouteTable from "./RouteTable";

// Prices here come from the database (admin-editable under /admin/routes),
// not the hardcoded list — that list is only a fallback for when the
// backend can't be reached, so the homepage still shows something.
export default function PopularRoutesSection() {
  const [routes, setRoutes] = useState(POPULAR_ROUTES);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/routes/search?limit=20`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((body) => {
        if (cancelled) return;
        if (Array.isArray(body.results) && body.results.length > 0) {
          setRoutes(body.results);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Keep the static fallback — no need to surface this as an error,
        // the homepage still works, just with slightly stale prices.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="routes" className="max-w-6xl mx-auto px-5 pt-20 pb-6">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display font-bold text-ink text-2xl">Popular routes</h2>
        {!isLive && (
          <p className="font-body text-[10px] font-medium uppercase tracking-wide text-ink-muted">
            Showing default prices
          </p>
        )}
      </div>
      <RouteTable routes={routes} />
    </section>
  );
}
