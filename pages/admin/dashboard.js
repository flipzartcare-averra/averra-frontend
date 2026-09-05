import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import AdminNav from "../../components/admin/AdminNav";

const STATUS_TABS = [
  { id: "", label: "All" },
  { id: "pending_confirmation", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS = {
  pending_confirmation: "text-taxi border-taxi/40",
  confirmed: "text-meter border-meter/40",
  completed: "text-steel border-steel/40",
  cancelled: "text-alert border-alert/40",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (query) params.set("q", query);

    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings?${params}`, {
        headers: authHeaders(),
      });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setBookings(body.results || []);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? `Couldn't reach ${API_BASE} — is the backend deployed and reachable?`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, [status, query, router]);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push("/admin/login");
      return;
    }
    load();
  }, [load, router]);

  async function updateStatus(id, newStatus) {
    setActionId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Update failed");
      // Re-fetch rather than patch the local array in place: a booking
      // that just moved to "completed" needs to disappear from the
      // Confirmed tab (and a "cancelled" one from All), which only a
      // fresh query against the current filter gets right.
      await load();
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="min-h-screen bg-road pb-16">
      <Head>
        <title>Admin dashboard — Rastaa Cabs</title>
      </Head>

      <AdminNav active="bookings" />

      <div className="max-w-3xl mx-auto px-5 py-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search name, phone, city…"
          className="w-full border border-roadline rounded-sm px-3 py-2 bg-roadline/40 text-paper font-body text-sm mb-4 placeholder:text-steel"
        />

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {STATUS_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setStatus(t.id)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded-sm border transition-colors ${
                status === t.id
                  ? "bg-taxi text-road border-taxi"
                  : "text-steel border-roadline hover:border-taxi/50"
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            onClick={load}
            disabled={loading}
            title="Refresh"
            className="ml-auto font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded-sm border border-roadline text-steel hover:border-taxi/50 hover:text-taxi transition-colors disabled:opacity-50"
          >
            {loading ? "Refreshing…" : "⟳ Refresh"}
          </button>
        </div>

        {status === "" && (
          <p className="font-mono text-[10px] text-steel mb-4">
            Cancelled bookings are hidden here — see the Cancelled tab.
          </p>
        )}

        {error && (
          <p className="font-mono text-xs text-alert mb-4">{error}</p>
        )}

        {loading ? (
          <p className="font-mono text-xs text-steel">Loading…</p>
        ) : bookings.length === 0 ? (
          <p className="font-mono text-xs text-steel">No bookings match this filter.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="border border-roadline rounded-md p-4 bg-roadline/30"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-body text-paper text-sm font-semibold">{b.customerName}</p>
                    <p className="font-mono text-xs text-steel">{b.mobileNumber}</p>
                  </div>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-widest border rounded-sm px-2 py-1 whitespace-nowrap ${
                      STATUS_COLORS[b.status] || "text-steel border-steel/40"
                    }`}
                  >
                    {b.status.replace("_", " ")}
                  </span>
                </div>

                <p className="font-body text-paper text-sm mb-1">
                  {b.from} <span className="text-steel">→</span> {b.to}
                </p>
                <p className="font-mono text-xs text-steel mb-1">
                  {b.date} · {b.cabTypeId} · {b.distanceKm ?? "?"} km
                </p>
                <p className="font-body text-xs text-steel mb-3">Pickup: {b.pickupAddress}</p>

                {b.estimatedFare != null && (
                  <p className="font-mono text-sm text-meter font-bold mb-3">
                    ₹{Math.round(b.estimatedFare).toLocaleString("en-IN")}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {b.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(b._id, "confirmed")}
                      disabled={actionId === b._id}
                      className="font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-3 py-1.5 rounded-sm disabled:opacity-50"
                    >
                      Confirm
                    </button>
                  )}
                  {b.status !== "completed" && b.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(b._id, "completed")}
                      disabled={actionId === b._id}
                      className="font-mono text-[10px] uppercase tracking-widest border border-steel/40 text-steel px-3 py-1.5 rounded-sm disabled:opacity-50"
                    >
                      Mark completed
                    </button>
                  )}
                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(b._id, "cancelled")}
                      disabled={actionId === b._id}
                      className="font-mono text-[10px] uppercase tracking-widest border border-alert/40 text-alert px-3 py-1.5 rounded-sm disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
