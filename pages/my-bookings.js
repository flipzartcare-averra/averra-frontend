import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_BASE } from "../lib/apiBase";

const STATUS_STYLES = {
  pending_confirmation: "text-accent border-accent/40 bg-accent/5",
  confirmed: "text-price-green border-price-green/40 bg-price-green/5",
  completed: "text-ink-muted border-line bg-surface-alt",
  cancelled: "text-alert border-alert/40 bg-alert/5",
};

export default function MyBookings() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  // Arriving from a just-completed booking on the homepage — prefill and
  // search immediately instead of making the rider retype their number.
  useEffect(() => {
    if (!router.isReady) return;
    const prefill = router.query.mobile;
    if (typeof prefill === "string" && prefill) {
      setMobileNumber(prefill);
      search(prefill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.mobile]);

  async function search(mobile) {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings?mobileNumber=${encodeURIComponent(mobile)}`);
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setBookings(body.results || []);
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? `Couldn't reach ${API_BASE} — is the backend deployed and reachable?`
          : err.message
      );
      setStatus("error");
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const mobile = mobileNumber.trim();
    if (mobile) search(mobile);
  }

  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>My bookings — Averra</title>
      </Head>

      <Header />

      <section className="max-w-2xl mx-auto px-5 pt-16 pb-24">
        <h1 className="font-display font-bold text-ink text-2xl mb-2">My bookings</h1>
        <p className="font-body text-ink-muted text-sm mb-6">
          Enter the mobile number you booked with to check your ride's status.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="+91 98765 43210"
            className="flex-1 border border-line rounded-md px-3 py-2.5 bg-surface text-ink font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-body text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
          >
            {status === "loading" ? "Searching…" : "Find"}
          </button>
        </form>

        {status === "error" && (
          <p className="font-body text-sm text-alert mb-6">{error}</p>
        )}

        {status === "success" && bookings.length === 0 && (
          <p className="font-body text-sm text-ink-muted">No bookings found for that number.</p>
        )}

        {status === "success" && bookings.length > 0 && (
          <div className="flex flex-col gap-3">
            {bookings.map((b) => (
              <div key={b._id} className="border border-line rounded-lg p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-body text-ink text-sm font-semibold">
                    {b.from} <span className="text-ink-muted">→</span> {b.to}
                  </p>
                  <span
                    className={`font-body text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border whitespace-nowrap ${
                      STATUS_STYLES[b.status] || "text-ink-muted border-line"
                    }`}
                  >
                    {b.status.replace("_", " ")}
                  </span>
                </div>
                <p className="font-mono text-xs text-ink-muted mb-1">
                  {b.date} · {b.cabTypeId} · {b.distanceKm ?? "?"} km
                </p>
                <p className="font-body text-xs text-ink-muted mb-2">Pickup: {b.pickupAddress}</p>
                {b.estimatedFare != null && (
                  <p className="font-mono text-base text-price-green font-bold">
                    ₹{Math.round(b.estimatedFare).toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
