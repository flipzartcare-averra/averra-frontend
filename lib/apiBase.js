// Talk to the Node backend directly rather than through Next.js's
// rewrite-proxy (next.config.js). On serverless hosts (Netlify, Vercel)
// that proxy is an extra server-side hop that can fail in ways that are
// hard to see from the browser — a direct client-side fetch to the real
// backend URL fails loudly and visibly (CORS error, 404, timeout) instead
// of silently 500ing inside a function you can't easily inspect.
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://averra-278e.onrender.com"
).replace(/\/$/, ""); // strip a trailing slash if someone pastes one into the env var
