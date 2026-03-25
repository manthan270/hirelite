/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // New warm palette
                primary: "#5B4CDB",
                "primary-container": "#6E5FE8",
                "primary-dark": "#4A3BBF",
                secondary: "#1A1A1F",
                "secondary-container": "#57dffe",
                "on-secondary-container": "#003544",
                tertiary: "#684000",
                "on-surface": "#1A1A1F",
                "outline-variant": "#D1D0CC",

                // Surface hierarchy — warm
                surface: "#F7F6F3",
                "surface-container-low": "#F0EFEC",
                "surface-container-lowest": "#FFFFFF",
                "surface-container-high": "#E8E7E4",
                "surface-container-highest": "#DFDEDD",
                "surface-bright": "#FAFAF8",

                // Legacy aliases — warm
                "background-light": "#F7F6F3",
                "background-dark": "#0A0A0F",
                "surface-light": "#FFFFFF",
                "surface-dark": "#1A1A1F",
                accent: "#8B7EF8",

                // Hero dark palette — warm black
                "hero-dark": "#0A0A0F",
                "hero-mid": "#111116",
                "hero-deep": "#08080D",
            },
            fontFamily: {
                display: ["'Space Grotesk'", "sans-serif"],
                sans: ["'DM Sans'", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                md: "0.75rem",
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
                full: "9999px",
            },
            boxShadow: {
                glass: "0 8px 32px 0 rgba(20, 20, 30, 0.06)",
                soft: "0 20px 40px -15px rgba(0,0,0,0.04)",
                glow: "0 0 20px rgba(91, 76, 219, 0.35)",
                ambient: "0 8px 32px rgba(20, 20, 30, 0.05)",
                "ambient-hover": "0 12px 48px rgba(20, 20, 30, 0.07)",
                "card-lift": "0 20px 48px rgba(20, 20, 30, 0.06)",
            },
            animation: {
                blob: "blob 7s infinite",
                "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                float: "float 6s ease-in-out infinite",
                twinkle: "twinkle 4s ease-in-out infinite",
                "twinkle-slow": "twinkle 6s ease-in-out infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                twinkle: {
                    "0%, 100%": { opacity: "0.3" },
                    "50%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};
