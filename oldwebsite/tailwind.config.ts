import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core semantic colors from CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Semantic status colors
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "SF Mono", "Fira Code", "Consolas", "monospace"],
      },
      fontSize: {
        // Custom sizes for labels
        'micro': ['10px', { lineHeight: '1.2', letterSpacing: '0.15em' }],
        'label': ['11px', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
      letterSpacing: {
        'widest-plus': '0.15em',
        'super-wide': '0.2em',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "ping-slow": "pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "gradient-flow": "gradientFlow 3s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.5)" },
        },
        pingSlow: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary))" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px hsl(var(--primary) / 0.3)',
        'glow': '0 0 10px hsl(var(--primary) / 0.3), 0 0 20px hsl(var(--primary) / 0.1)',
        'glow-lg': '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
} satisfies Config;
