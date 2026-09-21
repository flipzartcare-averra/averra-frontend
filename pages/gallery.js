import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_BASE } from "../lib/apiBase";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [activeCategory, setActiveCategory] = useState("");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/gallery`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((body) => {
        if (!cancelled) {
          setPhotos(Array.isArray(body) ? body : []);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [...new Set(photos.map((p) => p.category).filter(Boolean))];
  const visible = activeCategory ? photos.filter((p) => p.category === activeCategory) : photos;

  // Close the lightbox on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setLightboxPhoto(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      <Head>
        <title>Photo Gallery | Averra</title>
        <meta name="description" content="A look at Averra's fleet, destinations, and the roads we cover." />
      </Head>

      <Header />

      <section className="max-w-6xl mx-auto px-5 pt-16 pb-24">
        <h1 className="font-display font-bold text-ink text-3xl mb-2">Photo gallery</h1>
        <p className="font-body text-ink-muted text-sm mb-8">
          A look at our fleet, the destinations we drive to, and the roads in between.
        </p>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("")}
              className={`font-body text-xs font-semibold px-3 py-2 rounded-full border transition-colors ${
                activeCategory === ""
                  ? "bg-brand text-white border-brand"
                  : "text-ink-muted border-line hover:border-brand/50"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`font-body text-xs font-semibold px-3 py-2 rounded-full border transition-colors ${
                  activeCategory === c
                    ? "bg-brand text-white border-brand"
                    : "text-ink-muted border-line hover:border-brand/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {status === "loading" && <p className="font-body text-ink-muted text-sm">Loading…</p>}
        {status === "error" && (
          <p className="font-body text-alert text-sm">Couldn't load the gallery right now.</p>
        )}
        {status === "success" && visible.length === 0 && (
          <p className="font-body text-ink-muted text-sm">No photos here yet — check back soon.</p>
        )}

        {status === "success" && visible.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {visible.map((photo) => (
              <button
                key={photo._id}
                onClick={() => setLightboxPhoto(photo)}
                className="group relative rounded-lg overflow-hidden border border-line aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.caption || ""}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                {photo.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-body px-2 py-2 text-left">
                    {photo.caption}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-5"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white font-display text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxPhoto.imageUrl}
            alt={lightboxPhoto.caption || ""}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxPhoto.caption && (
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/90 font-body text-sm px-5">
              {lightboxPhoto.caption}
            </p>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
