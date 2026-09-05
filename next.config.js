/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No API rewrite here on purpose: the frontend calls the Node backend
  // directly using NEXT_PUBLIC_API_URL (see lib/apiBase.js). A rewrite
  // that proxies to an external URL adds an extra server-side hop that,
  // on serverless hosts, can fail silently in ways that are hard to
  // debug from the browser. A direct client-side fetch fails loudly
  // instead (CORS error, timeout, 404) with a message you can act on.
};

module.exports = nextConfig;
