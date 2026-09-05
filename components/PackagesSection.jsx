import { useEffect, useState } from "react";
import { API_BASE } from "../lib/apiBase";

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/packages`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((body) => {
        if (!cancelled && Array.isArray(body)) setPackages(body);
      })
      .catch(() => {
        // No packages yet, or backend unreachable — the section just
        // doesn't render rather than showing an error on the homepage.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (packages.length === 0) return null;

  return (
    <section id="packages" className="max-w-6xl mx-auto px-5 pt-20 pb-6">
      <h2 className="font-display font-bold text-ink text-2xl mb-6">Tour &amp; travel packages</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border border-line rounded-lg overflow-hidden bg-surface hover:shadow-md hover:border-brand/40 transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-44 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-display font-semibold text-ink text-base">{pkg.title}</p>
              </div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-wide text-brand mb-2">
                {pkg.durationLabel}
              </p>
              <p className="font-body text-ink-muted text-xs mb-3 line-clamp-3">{pkg.description}</p>
              {pkg.cities && (
                <p className="font-mono text-[10px] text-ink-muted mb-3">{pkg.cities}</p>
              )}
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg text-price-green font-bold">
                  ₹{Number(pkg.price).toLocaleString("en-IN")}
                </p>
                <a
                  href="#book"
                  className="font-body text-xs font-semibold bg-accent text-white px-3 py-2 rounded-md hover:bg-accent-dark transition-colors"
                >
                  Enquire
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
