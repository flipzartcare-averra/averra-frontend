import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
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
  const [paymentConfig, setPaymentConfig] = useState(null); // { enabled, keyId, advancePercent } | null while loading
  const [payingId, setPayingId] = useState(null); // booking _id currently mid-payment, or null
  const [paymentErrors, setPaymentErrors] = useState({}); // { [bookingId]: message }

  // Whether to show "Pay advance" at all — hidden entirely if Razorpay
  // keys aren't set on the backend, same as the booking form.
  useEffect(() => {
    fetch(`${API_BASE}/api/payments/config`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((body) => setPaymentConfig(body))
      .catch(() => setPaymentConfig({ enabled: false }));
  }, []);

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

  async function handlePayAdvance(booking) {
    if (!window.Razorpay) {
      setPaymentErrors((prev) => ({ ...prev, [booking._id]: "Payment isn't ready yet — try again in a moment." }));
      return;
    }
    setPayingId(booking._id);
    setPaymentErrors((prev) => ({ ...prev, [booking._id]: "" }));
    try {
      const orderRes = await fetch(`${API_BASE}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking._id }),
      });
      const order = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) throw new Error(order.error || "Could not start payment");

      const checkout = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Averra",
        description: `Advance for ${booking.from} → ${booking.to}`,
        prefill: { name: booking.customerName, contact: booking.mobileNumber },
        theme: { color: "#0B4F9C" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId: booking._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verify = await verifyRes.json().catch(() => ({}));
            if (!verifyRes.ok || !verify.verified) throw new Error(verify.error || "Verification failed");
            setBookings((prev) =>
              prev.map((b) => (b._id === booking._id ? { ...b, paymentStatus: "advance_paid" } : b))
            );
          } catch (err) {
            setPaymentErrors((prev) => ({
              ...prev,
              [booking._id]: err.message || "Payment verification failed — contact support if you were charged.",
            }));
          } finally {
            setPayingId(null);
          }
        },
        modal: {
          ondismiss: () => setPayingId(null),
        },
      });
      checkout.open();
    } catch (err) {
      setPayingId(null);
      setPaymentErrors((prev) => ({ ...prev, [booking._id]: err.message || "Could not start payment" }));
    }
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
                  <p className="font-mono text-base text-price-green font-bold mb-2">
                    ₹{Math.round(b.estimatedFare).toLocaleString("en-IN")}
                  </p>
                )}

                {b.paymentStatus === "advance_paid" ? (
                  <p className="font-body text-xs text-price-green font-medium">
                    ✓ {paymentConfig?.advancePercent ?? 20}% advance paid
                    {b.advanceAmount != null && ` (₹${Math.round(b.advanceAmount).toLocaleString("en-IN")})`}
                  </p>
                ) : (
                  paymentConfig?.enabled &&
                  b.estimatedFare != null && (
                    <div className="border-t border-line pt-3 mt-1">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <p className="font-body text-xs text-ink-muted">
                          Pay {paymentConfig.advancePercent}% now (₹
                          {Math.round((b.estimatedFare * paymentConfig.advancePercent) / 100).toLocaleString(
                            "en-IN"
                          )}
                          ) to confirm faster
                        </p>
                        <button
                          onClick={() => handlePayAdvance(b)}
                          disabled={payingId === b._id}
                          className="bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-body text-xs font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                        >
                          {payingId === b._id ? "Opening payment…" : "Pay advance"}
                        </button>
                      </div>
                      {paymentErrors[b._id] && (
                        <p className="font-body text-xs text-alert mt-2">{paymentErrors[b._id]}</p>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {paymentConfig?.enabled && (
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      )}
    </div>
  );
}
