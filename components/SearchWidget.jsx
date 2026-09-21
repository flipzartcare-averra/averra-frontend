import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { CAB_TYPES, CITIES, TRIP_TYPES } from "../lib/data";
import { API_BASE } from "../lib/apiBase";
import FareMeter from "./FareMeter";

export default function SearchWidget({ cabTypes = CAB_TYPES }) {
  const router = useRouter();
  const [tripType, setTripType] = useState(TRIP_TYPES[0].id);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[2]);
  const [date, setDate] = useState("");
  const [cabTypeId, setCabTypeId] = useState(CAB_TYPES[1].id);
  const [distanceKm, setDistanceKm] = useState(247);
  const [distanceSource, setDistanceSource] = useState("manual"); // "manual" | "google-maps" | "loading"
  const [status, setStatus] = useState(null);
  const [errorDetail, setErrorDetail] = useState("");
  const [backendUp, setBackendUp] = useState(null); // null = checking, true/false after
  const [bookingId, setBookingId] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState(null); // { enabled, keyId, advancePercent } | null while loading
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | loading | paid | error
  const [paymentError, setPaymentError] = useState("");

  // Whether to show a "pay advance" option at all — hidden entirely if
  // RAZORPAY_KEY_ID/SECRET aren't set on the backend, same as every other
  // optional integration in this project.
  useEffect(() => {
    fetch(`${API_BASE}/api/payments/config`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((body) => setPaymentConfig(body))
      .catch(() => setPaymentConfig({ enabled: false }));
  }, []);

  // Route landing pages (pages/taxi/[slug].js) link here with ?from=&to=
  // so "Book this route" actually pre-fills the form instead of dropping
  // the rider on a blank one.
  useEffect(() => {
    if (!router.isReady) return;
    const { from: qFrom, to: qTo } = router.query;
    if (typeof qFrom === "string" && qFrom) setFrom(qFrom);
    if (typeof qTo === "string" && qTo) setTo(qTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.from, router.query.to]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/health`)
      .then((res) => {
        if (!cancelled) setBackendUp(res.ok);
      })
      .catch(() => {
        if (!cancelled) setBackendUp(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-calculate distance from pickup/drop via Google Maps, debounced so
  // it doesn't fire on every keystroke. If GOOGLE_MAPS_API_KEY isn't set
  // on the backend, this fails silently (503) and the field just stays
  // manually editable, same as before this feature existed.
  useEffect(() => {
    if (!from.trim() || !to.trim() || from.trim() === to.trim()) return;

    let cancelled = false;
    setDistanceSource("loading");
    const timer = setTimeout(() => {
      fetch(`${API_BASE}/api/distance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin: from, destination: to }),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("unavailable"))))
        .then((body) => {
          if (cancelled) return;
          setDistanceKm(body.distanceKm);
          setDistanceSource("google-maps");
        })
        .catch(() => {
          if (!cancelled) setDistanceSource("manual");
        });
    }, 700);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [from, to]);

  // Instant, zero-latency preview computed from whatever cab-type data is
  // on hand right now (live from the backend once it's loaded, the bundled
  // defaults before that) — this can still be a moment stale right after
  // an admin edits meter rates, so it's only ever shown before the real
  // quote below arrives, never sent with the booking itself.
  const localEstimate = useMemo(() => {
    const cab = cabTypes.find((c) => c.id === cabTypeId) || cabTypes[0];
    const distance = Number(distanceKm) || 0;
    const extraKm = Math.max(0, distance - cab.baseKm);
    return Math.round(cab.baseFare + extraKm * cab.perKm);
  }, [cabTypes, cabTypeId, distanceKm]);

  const [fare, setFare] = useState(localEstimate);
  const [fareLoading, setFareLoading] = useState(false);

  useEffect(() => {
    setFare(localEstimate);

    let cancelled = false;
    setFareLoading(true);
    fetch(`${API_BASE}/api/fare/estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cabTypeId, distanceKm: Number(distanceKm) || 0, tripType }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((body) => {
        if (!cancelled && typeof body.total === "number") setFare(body.total);
      })
      .catch(() => {
        // Backend unreachable — the local estimate stays on screen, which
        // is the same "keep the offline preview" fallback used elsewhere.
      })
      .finally(() => {
        if (!cancelled) setFareLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cabTypeId, distanceKm, tripType, localEstimate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripType,
          customerName,
          mobileNumber,
          pickupAddress,
          from,
          to,
          date,
          cabTypeId,
          distanceKm: Number(distanceKm) || 0,
          estimatedFare: fare,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || `Backend returned ${res.status}`);
      }
      setBookingId(body._id);
      setStatus("success");
    } catch (err) {
      // A TypeError here almost always means the request never reached the
      // server at all — wrong API_BASE, backend not deployed, or CORS
      // blocked it. Anything else is a real error response from the backend.
      setErrorDetail(
        err instanceof TypeError
          ? `Couldn't reach ${API_BASE} — check NEXT_PUBLIC_API_URL, that the backend is deployed, and CORS (ALLOWED_ORIGIN) on the backend.`
          : err.message
      );
      setStatus("error");
    }
  }

  async function handlePayAdvance() {
    if (!window.Razorpay) {
      setPaymentError("Payment isn't ready yet — try again in a moment.");
      return;
    }
    setPaymentStatus("loading");
    setPaymentError("");
    try {
      const orderRes = await fetch(`${API_BASE}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const order = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) throw new Error(order.error || "Could not start payment");

      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Averra",
        description: `Advance for ${from} → ${to}`,
        prefill: { name: customerName, contact: mobileNumber },
        theme: { color: "#0B4F9C" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verify = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok || !verify.verified) throw new Error(verify.error || "Verification failed");
            setPaymentStatus("paid");
          } catch (err) {
            setPaymentStatus("error");
            setPaymentError(err.message || "Payment verification failed — contact support if you were charged.");
          }
        },
        modal: {
          ondismiss: () => setPaymentStatus("idle"),
        },
      });
      checkout.open();
    } catch (err) {
      setPaymentStatus("error");
      setPaymentError(err.message || "Could not start payment");
    }
  }

  return (
    <div
      id="book"
      className="bg-surface rounded-xl shadow-xl shadow-ink/10 border border-line p-5 md:p-6 -mt-20 relative z-10 max-w-4xl mx-auto"
    >
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {TRIP_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTripType(t.id)}
            className={`font-body text-xs font-semibold px-3 py-2 rounded-md border transition-colors ${
              tripType === t.id
                ? "bg-brand text-white border-brand"
                : "bg-transparent text-ink-muted border-line hover:border-brand/50 hover:text-brand"
            }`}
          >
            {t.label}
          </button>
        ))}
        {backendUp === false && (
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-alert border border-alert/40 rounded-sm px-2 py-1">
            Backend unreachable at {API_BASE}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-12 gap-4">
        <label className="md:col-span-4 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Full name
          </span>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Your name"
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="md:col-span-4 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Mobile number
          </span>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            pattern="[+]?[0-9\s-]{7,15}"
            title="A valid phone number, e.g. +91 98765 43210"
            placeholder="+91 98765 43210"
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="md:col-span-4 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Pickup address
          </span>
          <input
            type="text"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            required
            placeholder="House no., street, landmark"
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="md:col-span-3 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Pickup city
          </span>
          <input
            type="text"
            list="averra-cities"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            placeholder="Type or pick a city"
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="md:col-span-3 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Drop city
          </span>
          <input
            type="text"
            list="averra-cities"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            placeholder="Type or pick a city"
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        {/* Shared suggestion list for both city fields — lets you type a
            city not in the list too, unlike a plain <select>. */}
        <datalist id="averra-cities">
          {CITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <label className="md:col-span-3 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Pickup date
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        <label className="md:col-span-3 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted flex items-center gap-1.5">
            Approx. distance (km)
            {distanceSource === "loading" && (
              <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-brand/40 border-t-brand animate-spin" />
            )}
          </span>
          <input
            type="number"
            min="1"
            value={distanceKm}
            onChange={(e) => {
              setDistanceKm(e.target.value);
              setDistanceSource("manual");
            }}
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
          {distanceSource === "google-maps" && (
            <span className="font-body text-[10px] text-price-green">via Google Maps</span>
          )}
        </label>

        <label className="md:col-span-7 flex flex-col gap-1">
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Cab type
          </span>
          <select
            value={cabTypeId}
            onChange={(e) => setCabTypeId(e.target.value)}
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          >
            {cabTypes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} — {c.example}
              </option>
            ))}
          </select>
        </label>

        <div className="md:col-span-5">
          <FareMeter
            target={fare}
            loading={fareLoading}
            subLabel={`${distanceKm || 0} km · incl. taxes on booking`}
          />
        </div>

        <div className="md:col-span-12 flex items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-accent hover:bg-accent-dark disabled:opacity-60 text-white font-body text-sm font-semibold px-6 py-3 rounded-md transition-colors shadow-sm shadow-accent/30"
          >
            {status === "loading" ? "Booking…" : "Search cabs"}
          </button>
          {status === "success" && (
            <span className="font-body text-sm text-price-green font-medium">
              Request received — a dispatcher will confirm your cab shortly.{" "}
              <a
                href={`/my-bookings?mobile=${encodeURIComponent(mobileNumber)}`}
                className="text-brand underline hover:text-brand-dark"
              >
                Check status
              </a>
            </span>
          )}
          {status === "error" && (
            <span className="font-body text-sm text-alert max-w-md">
              {errorDetail || "Booking failed."}
            </span>
          )}
        </div>

        {status === "success" && paymentConfig?.enabled && bookingId && paymentStatus !== "paid" && (
          <div className="md:col-span-12 border-t border-line pt-4 mt-1 flex items-center gap-4 flex-wrap">
            <div>
              <p className="font-body text-sm text-ink font-medium">
                Pay {paymentConfig.advancePercent}% now to confirm faster
              </p>
              <p className="font-body text-xs text-ink-muted">
                ₹{Math.round((fare * paymentConfig.advancePercent) / 100).toLocaleString("en-IN")} now,
                the rest to your driver on arrival.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePayAdvance}
              disabled={paymentStatus === "loading"}
              className="bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-body text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              {paymentStatus === "loading" ? "Opening payment…" : "Pay advance"}
            </button>
            {paymentError && (
              <span className="font-body text-sm text-alert w-full">{paymentError}</span>
            )}
          </div>
        )}

        {status === "success" && paymentStatus === "paid" && (
          <div className="md:col-span-12 border-t border-line pt-4 mt-1">
            <p className="font-body text-sm text-price-green font-medium">
              Advance paid — your booking is confirmed faster than usual. See you soon!
            </p>
          </div>
        )}
      </form>

      {paymentConfig?.enabled && (
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      )}
    </div>
  );
}
