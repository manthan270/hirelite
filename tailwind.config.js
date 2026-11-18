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
                // Professional palette: deep teal, warm ivory, charcoal, and restrained gold.
                primary: "#1F766A",
                "primary-container": "#32897A",
                "primary-dark": "#185E55",
                secondary: "#24312D",
                "secondary-container": "#D8E8E1",
                "on-secondary-container": "#203B35",
                tertiary: "#7B5B29",
                "on-surface": "#1A211D",
                "outline-variant": "#D3D6CC",

                // Surface hierarchy — warm
                surface: "#F8F6EE",
                "surface-container-low": "#F1EFE6",
                "surface-container-lowest": "#FFFFFF",
                "surface-container-high": "#E9E6DB",
                "surface-container-highest": "#DEDACD",
                "surface-bright": "#FFFEF9",

                // Legacy aliases — warm
                "background-light": "#F8F6EE",
                "background-dark": "#101310",
                "surface-light": "#FFFFFF",
                "surface-dark": "#1A211D",
                accent: "#55A697",

                // Hero dark palette — warm black
                "hero-dark": "#101310",
                "hero-mid": "#151B17",
                "hero-deep": "#0B0F0C",
            },
            fontFamily: {
                display: ["'Manrope'", "sans-serif"],
                sans: ["'Inter'", "sans-serif"],
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
                glow: "0 0 20px rgba(31, 118, 106, 0.28)",
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
