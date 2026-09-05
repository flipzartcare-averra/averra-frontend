/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Original dark "taxi meter" tokens — kept as-is, still used by
        // the admin panel (/admin/*), which intentionally keeps its own
        // distinct dark "cockpit" look regardless of the public site's theme.
        road: "#12141C",
        roadline: "#1D2030",
        taxi: "#F4C430",
        "taxi-dark": "#D9A916",
        meter: "#35D07F",
        paper: "#F6F3EA",
        steel: "#8B93A7",
        alert: "#E5484D",

        // New light, OTA-style palette for the public-facing site —
        // light background, blue for trust/navigation, warm orange for
        // calls to action. Deliberately not MakeMyTrip's specific brand
        // colors, just the same general genre of travel-site design.
        surface: "#FFFFFF",
        "surface-alt": "#F5F7FB",
        ink: "#1A2233",
        "ink-muted": "#66707F",
        line: "#E4E8EF",
        brand: "#0B4F9C",
        "brand-dark": "#083A75",
        accent: "#FF6A39",
        "accent-dark": "#E5541F",
        gold: "#FFB020",
        "price-green": "#149857",
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "dash-line":
          "repeating-linear-gradient(90deg, #F4C430 0px, #F4C430 24px, transparent 24px, transparent 44px)",
        "brand-banner": "linear-gradient(135deg, #0B4F9C 0%, #0E6BC7 100%)",
      },
    },
  },
  plugins: [],
};
