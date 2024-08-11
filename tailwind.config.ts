import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        softGrey: `hsl(var(--softGrey))`,
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
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        'rotate-fade-in': {
          '0%': { 
            transform: 'rotate(-3deg) translateY(10px)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'rotate(0deg) translateY(0)', 
            opacity: '1' 
          },
        },
        'slide-right-fade-in': {
          '0%': { opacity: '0', transform: 'translateX(-6%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-left-fade-in': {
          '0%': { opacity: '0', transform: 'translateX(6%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(50%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        backgroundPositionSpin: "background-position-spin 3000ms infinite alternate",
        'rotate-fade-in': 'rotate-fade-in 0.8s ease-out forwards',
        'slide-right-fade-in': 'slide-right-fade-in 0.6s ease-out forwards',
        'slide-left-fade-in': 'slide-left-fade-in 0.6s ease-out forwards',
        'slide-down-fade-in': 'slide-down-fade-in 0.6s ease-out forwards',
        'slide-up-fade-in': 'slide-up-fade-in 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {
      animation: ['responsive', 'motion-safe', 'motion-reduce'],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config