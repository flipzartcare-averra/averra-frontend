import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminRoutes() {
  const router = useRouter();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [newRoute, setNewRoute] = useState({ from: "", to: "", km: "", hours: "", fare: "" });
  const [addError, setAddError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/routes`, { headers: authHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setRoutes(Array.isArray(body) ? body : []);
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

  async function patchRoute(id, body) {
    setBusyId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/routes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setRoutes((prev) => prev.map((r) => (r._id === id ? updated : r)));
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteRoute(id) {
    if (!confirm("Delete this route? It will disappear from the public site.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/routes/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Delete failed");
      setRoutes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function handleAddRoute(e) {
    e.preventDefault();
    setAddError("");
    const { from, to, km, hours, fare } = newRoute;
    if (!from || !to || !km || !hours || !fare) {
      setAddError("All fields are required.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ from, to, km: Number(km), hours, fare: Number(fare) }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not add route");
      setNewRoute({ from: "", to: "", km: "", hours: "", fare: "" });
      load();
    } catch (err) {
      setAddError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-road pb-16">
      <Head>
        <title>Route pricing — Rastaa Cabs Admin</title>
      </Head>
      <AdminNav active="routes" />

      <div className="max-w-3xl mx-auto px-5 py-6">
        <h1 className="font-display text-paper text-xl mb-1">Route pricing</h1>
        <p className="font-mono text-[11px] text-steel mb-6">
          Prices here are what the public homepage's "Popular routes" table shows — edits go live immediately.
        </p>

        {error && <p className="font-mono text-xs text-alert mb-4">{error}</p>}

        <form
          onSubmit={handleAddRoute}
          className="border border-roadline rounded-md p-4 mb-6 grid grid-cols-2 sm:grid-cols-5 gap-2"
        >
          <input
            placeholder="From"
            value={newRoute.from}
            onChange={(e) => setNewRoute((s) => ({ ...s, from: e.target.value }))}
            className="col-span-1 border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel"
          />
          <input
            placeholder="To"
            value={newRoute.to}
            onChange={(e) => setNewRoute((s) => ({ ...s, to: e.target.value }))}
            className="col-span-1 border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel"
          />
          <input
            placeholder="Km"
            type="number"
            value={newRoute.km}
            onChange={(e) => setNewRoute((s) => ({ ...s, km: e.target.value }))}
            className="col-span-1 border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
          />
          <input
            placeholder="Duration (4h 20m)"
            value={newRoute.hours}
            onChange={(e) => setNewRoute((s) => ({ ...s, hours: e.target.value }))}
            className="col-span-1 border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
          />
          <div className="col-span-1 flex gap-2">
            <input
              placeholder="Fare ₹"
              type="number"
              value={newRoute.fare}
              onChange={(e) => setNewRoute((s) => ({ ...s, fare: e.target.value }))}
              className="w-full border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
            />
            <button
              type="submit"
              className="font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-3 rounded-sm whitespace-nowrap"
            >
              Add
            </button>
          </div>
          {addError && (
            <p className="col-span-2 sm:col-span-5 font-mono text-[10px] text-alert">{addError}</p>
          )}
        </form>

        {loading ? (
          <p className="font-mono text-xs text-steel">Loading…</p>
        ) : routes.length === 0 ? (
          <p className="font-mono text-xs text-steel">No routes yet — add one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {routes.map((r) => (
              <RouteRow
                key={r._id}
                route={r}
                busy={busyId === r._id}
                onNudge={(delta) => patchRoute(r._id, { fareDelta: delta })}
                onSetFare={(fare) => patchRoute(r._id, { fare })}
                onDelete={() => deleteRoute(r._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RouteRow({ route, busy, onNudge, onSetFare, onDelete }) {
  const [fareInput, setFareInput] = useState(String(route.fare));

  useEffect(() => {
    setFareInput(String(route.fare));
  }, [route.fare]);

  return (
    <div className="border border-roadline rounded-md p-4 bg-roadline/30 flex flex-wrap items-center gap-3 justify-between">
      <div>
        <p className="font-body text-paper text-sm">
          {route.from} <span className="text-steel">→</span> {route.to}
        </p>
        <p className="font-mono text-[11px] text-steel">{route.km} km · {route.hours}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onNudge(-50)}
          disabled={busy}
          className="font-mono text-xs border border-roadline rounded-sm w-7 h-7 text-paper disabled:opacity-50"
        >
          −
        </button>
        <input
          type="number"
          value={fareInput}
          onChange={(e) => setFareInput(e.target.value)}
          className="w-24 border border-roadline rounded-sm px-2 py-1 bg-road text-meter font-mono text-sm text-center"
        />
        <button
          onClick={() => onNudge(50)}
          disabled={busy}
          className="font-mono text-xs border border-roadline rounded-sm w-7 h-7 text-paper disabled:opacity-50"
        >
          +
        </button>
        <button
          onClick={() => onSetFare(Number(fareInput))}
          disabled={busy}
          className="font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-3 py-1.5 rounded-sm disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={onDelete}
          disabled={busy}
          className="font-mono text-[10px] uppercase tracking-widest border border-alert/40 text-alert px-3 py-1.5 rounded-sm disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
