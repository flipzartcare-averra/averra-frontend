import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_BASE } from "../../lib/apiBase";
import { setAdminToken } from "../../lib/adminAuth";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Login failed");
      setAdminToken(body.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? `Couldn't reach ${API_BASE} — is the backend deployed and reachable?`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-road flex items-center justify-center px-5">
      <Head>
        <title>Admin login — Rastaa Cabs</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-paper rounded-lg p-6 shadow-2xl shadow-black/40"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-road/60 mb-1">
          Rastaa Cabs
        </p>
        <h1 className="font-display text-road text-xl mb-6">Admin login</h1>

        <label className="flex flex-col gap-1 mb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-road/60">
            Username
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className="border border-road/20 rounded-sm px-3 py-2 bg-white text-road font-medium"
          />
        </label>

        <label className="flex flex-col gap-1 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-road/60">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-road/20 rounded-sm px-3 py-2 bg-white text-road font-medium"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-taxi hover:bg-taxi-dark disabled:opacity-60 text-road font-mono text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-sm transition-colors"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {error && (
          <p className="font-mono text-xs text-alert mt-4">{error}</p>
        )}
      </form>
    </div>
  );
}
