import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken, getAdminToken } from "../../lib/adminAuth";
import AdminNav from "../../components/admin/AdminNav";

const EMPTY_FORM = { imageUrl: "", caption: "", category: "" };

export default function AdminGallery() {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);
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
      const res = await fetch(`${API_BASE}/api/admin/gallery`, { headers: authHeaders() });
      if (res.status === 401) {
        clearAdminToken();
        router.push("/admin/login");
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Backend returned ${res.status}`);
      setPhotos(Array.isArray(body) ? body : []);
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
    if (!form.imageUrl.trim()) {
      setFormError("Photo URL is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Could not add photo");
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(photo) {
    setBusyId(photo._id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/${photo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ active: !photo.active }),
      });
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setPhotos((prev) => prev.map((p) => (p._id === photo._id ? updated : p)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function deletePhoto(id) {
    if (!confirm("Delete this photo permanently?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Delete failed");
      setPhotos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-road pb-16">
      <Head>
        <title>Photo gallery — Averra Admin</title>
      </Head>
      <AdminNav active="gallery" />

      <div className="max-w-3xl mx-auto px-5 py-6">
        <h1 className="font-display text-paper text-xl mb-1">Photo gallery</h1>
        <p className="font-mono text-[11px] text-steel mb-6">
          Photos are added by URL, not file upload — paste a link to an already-hosted image.
          Active photos show on the public <a href="/gallery" className="text-taxi underline">/gallery</a> page;
          toggle Hide instead of deleting to keep a photo without showing it.
        </p>

        {error && <p className="font-mono text-xs text-alert mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="border border-roadline rounded-md p-4 mb-6 flex flex-col gap-2">
          <input
            placeholder="Photo URL"
            value={form.imageUrl}
            onChange={(e) => setForm((s) => ({ ...s, imageUrl: e.target.value }))}
            className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-mono text-xs placeholder:text-steel"
          />
          <div className="grid sm:grid-cols-2 gap-2">
            <input
              placeholder="Caption (optional)"
              value={form.caption}
              onChange={(e) => setForm((s) => ({ ...s, caption: e.target.value }))}
              className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel"
            />
            <input
              placeholder="Category (optional, e.g. Fleet, Destinations)"
              value={form.category}
              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
              className="border border-roadline rounded-sm px-2 py-2 bg-roadline/30 text-paper font-body text-xs placeholder:text-steel"
            />
          </div>
          {formError && <p className="font-mono text-[10px] text-alert">{formError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="self-start font-mono text-[10px] uppercase tracking-widest bg-taxi text-road font-bold px-4 py-2 rounded-sm disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add photo"}
          </button>
        </form>

        {loading ? (
          <p className="font-mono text-xs text-steel">Loading…</p>
        ) : photos.length === 0 ? (
          <p className="font-mono text-xs text-steel">No photos yet — add one above.</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo._id} className="border border-roadline rounded-md overflow-hidden bg-roadline/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.imageUrl} alt={photo.caption || ""} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-body text-paper text-xs">{photo.caption || "—"}</p>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm border whitespace-nowrap ${
                        photo.active ? "text-meter border-meter/40" : "text-steel border-steel/40"
                      }`}
                    >
                      {photo.active ? "Live" : "Hidden"}
                    </span>
                  </div>
                  {photo.category && (
                    <p className="font-mono text-[9px] text-steel mb-2">{photo.category}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(photo)}
                      disabled={busyId === photo._id}
                      className="font-mono text-[9px] uppercase tracking-widest border border-roadline text-paper px-2 py-1 rounded-sm disabled:opacity-50"
                    >
                      {photo.active ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => deletePhoto(photo._id)}
                      disabled={busyId === photo._id}
                      className="font-mono text-[9px] uppercase tracking-widest border border-alert/40 text-alert px-2 py-1 rounded-sm disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
