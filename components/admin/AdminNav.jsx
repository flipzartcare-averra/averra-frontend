import { useRouter } from "next/router";
import { API_BASE } from "../../lib/apiBase";
import { authHeaders, clearAdminToken } from "../../lib/adminAuth";

const TABS = [
  { id: "bookings", label: "Bookings", href: "/admin/dashboard" },
  { id: "routes", label: "Route pricing", href: "/admin/routes" },
  { id: "packages", label: "Packages", href: "/admin/packages" },
  { id: "app-version", label: "App version", href: "/admin/app-version" },
];

export default function AdminNav({ active }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, { method: "POST", headers: authHeaders() });
    } catch (_) {
      // Clear locally regardless — a failed logout request shouldn't trap the admin in a stuck session.
    }
    clearAdminToken();
    router.push("/admin/login");
  }

  return (
    <header className="border-b border-roadline px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-steel">Rastaa Cabs</p>
          <p className="font-display text-paper text-sm">Admin</p>
        </div>
        <nav className="flex gap-1">
          {TABS.map((t) => (
            <a
              key={t.id}
              href={t.href}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded-sm transition-colors ${
                active === t.id
                  ? "bg-taxi text-road font-bold"
                  : "text-steel hover:text-taxi border border-transparent"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="font-mono text-[11px] uppercase tracking-widest text-alert border border-alert/40 rounded-sm px-3 py-2 hover:bg-alert/10 transition-colors"
      >
        Log out
      </button>
    </header>
  );
}
