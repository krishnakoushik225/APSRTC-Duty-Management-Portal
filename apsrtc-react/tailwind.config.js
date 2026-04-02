module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        /** Cool mist surfaces — pairs with dark `#0f172a` rail */
        surface: {
          DEFAULT: "#eef3f9",
          elevated: "#f7f9fc",
          inset: "#dfe8f3",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08)",
        lift: "0 6px 18px rgba(15,23,42,0.10), 0 2px 6px rgba(15,23,42,0.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
