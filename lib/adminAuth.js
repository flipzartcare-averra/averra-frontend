const TOKEN_KEY = "rastaa_admin_token";

// A plain localStorage token is the simplest thing that works for an
// admin panel with no SSR-protected routes. It's vulnerable to XSS
// reading it (unlike an httpOnly cookie) — acceptable for this project's
// scope, but worth upgrading to httpOnly cookies + a server session
// before this holds anything more sensitive than demo bookings.
export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders() {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
