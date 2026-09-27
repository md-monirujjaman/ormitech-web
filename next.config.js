/** @type {import('next').NextConfig} */

// Kept in sync with appLinks.app in src/data/site.js. next.config.js cannot import from src, so the
// default is repeated here rather than shared.
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://app.ormitechit.com").replace(/\/+$/, "");

const nextConfig = {
  images: {
    remotePatterns: []
  },
  // Accounts live in the client app. This site used to carry its own login, signup and forgot-password
  // pages; those are gone, and the paths stay only as redirects so old links and bookmarks still work.
  // Next.js forwards the query string, so /signup?plan=growth keeps its plan.
  async redirects() {
    return [
      { source: "/login", destination: `${appUrl}/login`, permanent: true },
      { source: "/signup", destination: `${appUrl}/register`, permanent: true },
      { source: "/register", destination: `${appUrl}/register`, permanent: true },
      { source: "/forgot-password", destination: `${appUrl}/forgot-password`, permanent: true }
    ];
  }
};

module.exports = nextConfig;
