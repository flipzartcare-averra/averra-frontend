import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import AdminNav from "../../components/admin/AdminNav";

const FIELDS = [
  { key: "latestVersion", label: "Latest version", placeholder: "1.1.0" },
  { key: "minSupportedVersion", label: "Minimum supported version", placeholder: "1.0.0" },
  { key: "androidStoreUrl", label: "Play Store URL", placeholder: "https://play.google.com/store/apps/details?id=..." },
  { key: "iosStoreUrl", label: "App Store URL", placeholder: "https://apps.apple.com/app/..." },
];

export default function AdminAppVersion() {
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/app-config`, { headers: authHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setForm(body);
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

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/app-config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Save failed");
      setForm(body);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-road pb-16">
      <Head>
        <title>App version — Rastaa Cabs Admin</title>
      </Head>
      <AdminNav active="app-version" />

      <div className="max-w-xl mx-auto px-5 py-6">
        <h1 className="font-display text-paper text-xl mb-1">App version &amp; update prompts</h1>
        <p className="font-mono text-[11px] text-steel mb-6">
          The Flutter app checks this on every launch. Riders below "Minimum supported version" see a
          prompt they can't dismiss; below "Latest version" but above minimum, they see a dismissible
          "update available" prompt.
        </p>

        {error && <p className="font-mono text-xs text-alert mb-4">{error}</p>}

        {loading || !form ? (
          <p className="font-mono text-xs text-steel">Loading…</p>
        ) : (
          <form onSubmit={handleSave} className="border border-roadline rounded-md p-4 flex flex-col gap-3">
            {FIELDS.map((f) => (
              <label key={f.key} className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                  {f.label}
                </span>
                <input
                  value={form[f.key] || ""}
                  placeholder={f.placeholder}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  className="border border-roadline rounded-sm px-3 py-2 bg-roadline/30 text-paper font-mono text-xs"
                />
              </label>
            ))}
            <label className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                Update message shown to riders
              </span>
              <textarea
                value={form.updateMessage || ""}
                onChange={(e) => setForm((s) => ({ ...s, updateMessage: e.target.value }))}
                rows={3}
                className="border border-roadline rounded-sm px-3 py-2 bg-roadline/30 text-paper font-body text-xs resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="self-start font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-4 py-2 rounded-sm disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {saved && (
              <p className="font-mono text-[10px] text-meter">Saved — takes effect on the app's next launch.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
