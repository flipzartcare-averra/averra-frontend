import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import AdminNav from "../../components/admin/AdminNav";

const EMPTY_FORM = { title: "", description: "", imageUrl: "", price: "", durationLabel: "", cities: "" };

export default function AdminPackages() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/packages`, { headers: authHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setPackages(Array.isArray(body) ? body : []);
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

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    const { title, description, imageUrl, price, durationLabel } = form;
    if (!title || !description || !imageUrl || !price || !durationLabel) {
      setFormError("Title, description, photo URL, price and duration are all required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ ...form, price: Number(price) }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not create package");
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(pkg) {
    setBusyId(pkg._id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/packages/${pkg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ active: !pkg.active }),
      });
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setPackages((prev) => prev.map((p) => (p._id === pkg._id ? updated : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function updatePrice(pkg, price) {
    setBusyId(pkg._id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/packages/${pkg._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ price }),
      });
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setPackages((prev) => prev.map((p) => (p._id === pkg._id ? updated : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function deletePackage(id) {
    if (!confirm("Delete this package permanently?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/packages/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-road pb-16">
      <Head>
        <title>Travel packages — Rastaa Cabs Admin</title>
      </Head>
      <AdminNav active="packages" />

      <div className="max-w-3xl mx-auto px-5 py-6">
        <h1 className="font-display text-paper text-xl mb-1">Tour &amp; travel packages</h1>
        <p className="font-mono text-[11px] text-steel mb-6">
          Active packages show on the public homepage with their photo. Toggle a package off instead of
          deleting it to keep it for later without showing it.
        </p>

        {error && <p className="font-mono text-xs text-alert mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="border border-roadline rounded-md p-4 mb-6 flex flex-col gap-2">
          <div className="grid sm:grid-cols-2 gap-2">
            <input
              placeholder="Title (e.g. Manali Getaway)"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel"
            />
            <input
              placeholder="Photo URL"
              value={form.imageUrl}
              onChange={(e) => setForm((s) => ({ ...s, imageUrl: e.target.value }))}
              className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
            />
          </div>
          <textarea
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            rows={2}
            className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel resize-none"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              placeholder="Duration (3 Days / 2 Nights)"
              value={form.durationLabel}
              onChange={(e) => setForm((s) => ({ ...s, durationLabel: e.target.value }))}
              className="col-span-2 border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
            />
            <input
              placeholder="Price ₹"
              type="number"
              value={form.price}
              onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
              className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
            />
          </div>
          <input
            placeholder="Cities covered (optional, e.g. Chandigarh, Manali, Shimla)"
            value={form.cities}
            onChange={(e) => setForm((s) => ({ ...s, cities: e.target.value }))}
            className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel"
          />
          {formError && <p className="font-mono text-[10px] text-alert">{formError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="self-start font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-4 py-2 rounded-sm disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add package"}
          </button>
        </form>

        {loading ? (
          <p className="font-mono text-xs text-steel">Loading…</p>
        ) : packages.length === 0 ? (
          <p className="font-mono text-xs text-steel">No packages yet — add one above.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {packages.map((p) => (
              <PackageCard
                key={p._id}
                pkg={p}
                busy={busyId === p._id}
                onToggleActive={() => toggleActive(p)}
                onUpdatePrice={(price) => updatePrice(p, price)}
                onDelete={() => deletePackage(p._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PackageCard({ pkg, busy, onToggleActive, onUpdatePrice, onDelete }) {
  const [priceInput, setPriceInput] = useState(String(pkg.price));

  useEffect(() => {
    setPriceInput(String(pkg.price));
  }, [pkg.price]);

  return (
    <div className="border border-roadline rounded-md overflow-hidden bg-roadline/30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-32 object-cover" />
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-body text-paper text-sm font-semibold">{pkg.title}</p>
          <span
            className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm border whitespace-nowrap ${
              pkg.active ? "text-meter border-meter/40" : "text-steel border-steel/40"
            }`}
          >
            {pkg.active ? "Live" : "Hidden"}
          </span>
        </div>
        <p className="font-mono text-[10px] text-steel mb-2">{pkg.durationLabel}</p>
        <p className="font-body text-xs text-steel mb-3 line-clamp-2">{pkg.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs text-paper">₹</span>
          <input
            type="number"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className="w-20 border border-roadline rounded-sm px-2 py-1 bg-road text-meter font-mono text-xs"
          />
          <button
            onClick={() => onUpdatePrice(Number(priceInput))}
            disabled={busy}
            className="font-mono text-[9px] uppercase tracking-widest bg-taxi text-road font-bold px-2 py-1 rounded-sm disabled:opacity-50"
          >
            Save
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onToggleActive}
            disabled={busy}
            className="font-mono text-[9px] uppercase tracking-widest border border-roadline text-paper px-2 py-1 rounded-sm disabled:opacity-50"
          >
            {pkg.active ? "Hide" : "Show"}
          </button>
          <button
            onClick={onDelete}
            disabled={busy}
            className="font-mono text-[9px] uppercase tracking-widest border border-alert/40 text-alert px-2 py-1 rounded-sm disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
