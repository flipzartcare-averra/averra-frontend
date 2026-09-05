import { useEffect, useMemo, useState } from "react";
import { CAB_TYPES, CITIES, TRIP_TYPES, estimateFare } from "../lib/data";
import { API_BASE } from "../lib/apiBase";
import FareMeter from "./FareMeter";

export default function SearchWidget() {
  const [tripType, setTripType] = useState(TRIP_TYPES[0].id);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[2]);
  const [date, setDate] = useState("");
  const [cabTypeId, setCabTypeId] = useState(CAB_TYPES[1].id);
  const [distanceKm, setDistanceKm] = useState(247);
  const [status, setStatus] = useState(null);
  const [errorDetail, setErrorDetail] = useState("");
  const [backendUp, setBackendUp] = useState(null); // null = checking, true/false after

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

  const fare = useMemo(
    () => estimateFare(cabTypeId, Number(distanceKm) || 0),
    [cabTypeId, distanceKm]
  );

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
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Backend returned ${res.status}`);
      }
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
            list="rastaa-cities"
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
            list="rastaa-cities"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            placeholder="Type or pick a city"
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </label>

        {/* Shared suggestion list for both city fields — lets you type a
            city not in the list too, unlike a plain <select>. */}
        <datalist id="rastaa-cities">
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
          <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
            Approx. distance (km)
          </span>
          <input
            type="number"
            min="1"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
            className="border border-line rounded-md px-3 py-2 bg-surface text-ink font-medium font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
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
            {CAB_TYPES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} — {c.example}
              </option>
            ))}
          </select>
        </label>

        <div className="md:col-span-5">
          <FareMeter
            target={fare}
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
              Request received — a dispatcher will confirm your cab shortly.
            </span>
          )}
          {status === "error" && (
            <span className="font-body text-sm text-alert max-w-md">
              {errorDetail || "Booking failed."}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
