import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./mdx-components.tsx",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "400px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",
        "whiskr-mint": "hsl(var(--whiskr-mint))",
        "whiskr-green": "hsl(var(--whiskr-green))",
        "whiskr-dark": "hsl(var(--whiskr-dark))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        auth: {
          bg: "hsl(var(--auth-bg))",
          "card-bg": "hsl(var(--auth-card-bg))",
          "card-border": "hsl(var(--auth-card-border))",
          text: "hsl(var(--auth-text))",
          "text-muted": "hsl(var(--auth-text-muted))",
          placeholder: "hsl(var(--auth-placeholder))",
          "input-border": "hsl(var(--auth-input-border))",
          link: "hsl(var(--auth-link))",
          "link-hover": "hsl(var(--auth-link-hover))",
          "hover-bg": "hsl(var(--auth-hover-bg))",
          divider: "hsl(var(--auth-divider))",
          "google-btn": "hsl(var(--auth-google-btn))",
          "google-btn-hover": "hsl(var(--auth-google-btn-hover))",
        },
        legal: {
          heading: "hsl(var(--legal-heading))",
          text: "hsl(var(--legal-text))",
          link: "hsl(var(--legal-link))",
          "link-hover": "hsl(var(--legal-link-hover))",
          "card-bg": "hsl(var(--legal-card-bg))",
          "card-border": "hsl(var(--legal-card-border))",
          "alert-bg": "hsl(var(--legal-alert-bg))",
          "alert-border": "hsl(var(--legal-alert-border))",
        },
        footer: {
          bg: "hsl(var(--footer-bg))",
          text: "hsl(var(--footer-text))",
          "text-muted": "hsl(var(--footer-text-muted))",
          "text-dim": "hsl(var(--footer-text-dim))",
          link: "hsl(var(--footer-link))",
          "link-hover": "hsl(var(--footer-link-hover))",
        },
        landing: {
          bg: "hsl(var(--landing-bg))",
          text: "hsl(var(--landing-text))",
          "text-secondary": "hsl(var(--landing-text-secondary))",
          "text-body": "hsl(var(--landing-text-body))",
          elevated: "hsl(var(--landing-elevated))",
          border: "hsl(var(--landing-border))",
          "border-dark": "hsl(var(--landing-border-dark))",
          "text-light": "hsl(var(--landing-text-light))",
          "dark-card": "hsl(var(--landing-dark-card))",
        },
        atlas: {
          pupil: "hsl(var(--atlas-pupil))",
          glow: "hsl(var(--atlas-glow))",
          "glow-mint": "hsl(var(--atlas-glow-mint))",
        },
      },
      backgroundImage: {
        "gradient-whiskr": "var(--gradient-whiskr)",
        "gradient-hero": "var(--gradient-hero)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
        marquee: "marquee var(--duration) linear infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
