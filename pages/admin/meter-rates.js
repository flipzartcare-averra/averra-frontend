import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminMeterRates() {
  const router = useRouter();
  const [cabTypes, setCabTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/cabtypes`, { headers: authHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setCabTypes(Array.isArray(body) ? body : []);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? `Couldn't reach ${API_BASE} — is the backend deployed and reachable?`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getAdminToken()) {
      router.push("/admin/login");
      return;
    }
    load();
  }, [load, router]);

  async function saveRates(id, updates) {
    setBusyId(id);
    setSavedId(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/cabtypes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(updates),
      });
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setCabTypes((prev) => prev.map((c) => (c._id === id ? updated : c)));
      setSavedId(id);
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-road pb-16">
      <Head>
        <title>Meter rates — Averra Admin</title>
      </Head>
      <AdminNav active="meter-rates" />

      <div className="max-w-3xl mx-auto px-5 py-6">
        <h1 className="font-display text-paper text-xl mb-1">Meter rates</h1>
        <p className="font-mono text-[11px] text-steel mb-6">
          These three numbers per cab type — base fare, included km, and per-km rate — feed directly
          into the fare engine on every quote and booking. An edit here changes the actual charged
          fare immediately, not just what's shown on the fleet cards.
        </p>

        {error && <p className="font-mono text-xs text-alert mb-4">{error}</p>}

        {loading ? (
          <p className="font-mono text-xs text-steel">Loading…</p>
        ) : (
          <div className="flex flex-col gap-3">
            {cabTypes.map((cab) => (
              <MeterRateRow
                key={cab._id}
                cab={cab}
                busy={busyId === cab._id}
                saved={savedId === cab._id}
                onSave={(updates) => saveRates(cab._id, updates)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MeterRateRow({ cab, busy, saved, onSave }) {
  const [baseFare, setBaseFare] = useState(String(cab.baseFare));
  const [baseKm, setBaseKm] = useState(String(cab.baseKm));
  const [perKm, setPerKm] = useState(String(cab.perKm));

  useEffect(() => {
    setBaseFare(String(cab.baseFare));
    setBaseKm(String(cab.baseKm));
    setPerKm(String(cab.perKm));
  }, [cab.baseFare, cab.baseKm, cab.perKm]);

  return (
    <div className="border border-roadline rounded-md p-4 bg-roadline/30">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-body text-paper text-sm font-semibold">{cab.label}</p>
          <p className="font-mono text-[11px] text-steel">{cab.example}</p>
        </div>
        {saved && <span className="font-mono text-[10px] text-meter">Saved</span>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Base fare ₹</span>
          <input
            type="number"
            value={baseFare}
            onChange={(e) => setBaseFare(e.target.value)}
            className="border border-roadline rounded-sm px-2 py-1.5 bg-road text-meter font-mono text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Included km</span>
          <input
            type="number"
            value={baseKm}
            onChange={(e) => setBaseKm(e.target.value)}
            className="border border-roadline rounded-sm px-2 py-1.5 bg-road text-paper font-mono text-sm"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-steel">Per-km rate ₹</span>
          <input
            type="number"
            step="0.5"
            value={perKm}
            onChange={(e) => setPerKm(e.target.value)}
            className="border border-roadline rounded-sm px-2 py-1.5 bg-road text-paper font-mono text-sm"
          />
        </label>
      </div>

      <button
        onClick={() =>
          onSave({ baseFare: Number(baseFare), baseKm: Number(baseKm), perKm: Number(perKm) })
        }
        disabled={busy}
        className="mt-3 font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-4 py-2 rounded-sm disabled:opacity-50"
      >
        {busy ? "Saving…" : "Save rates"}
      </button>
    </div>
  );
}
