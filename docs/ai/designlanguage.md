# CodeboltAI Website Design Language

## 1. Overall Aesthetic

The website's design is a blend of **clean futurism** and **cyberpunk** aesthetics. It aims for a high-tech, sophisticated feel rather than a grungy, dystopian look. The core principle is to present advanced, AI-driven technology in a sharp, modern, and engaging way.

- **Core Theme:** Techno-futuristic, Cyberpunk, "Gamer" inspired.
- **Mood:** Professional, cutting-edge, dynamic, and clean.
- **Key Characteristics:**
  - Asymmetrical and angular shapes, especially in interactive elements.
  - Use of clean, light backgrounds to make accent colors and complex elements stand out.
  - Dynamic animations and background textures that create a sense of a living, breathing interface.
  - A clear typographic hierarchy that mixes futuristic display fonts with clean sans-serif fonts for readability.

---

## 2. Color Palette

The palette is predominantly light, using a monochrome base with a vibrant red as the primary accent color for actions and highlights.

- **Primary Action Colors:**
  - **Red:** `~#dc2626` / `text-red-600`. Used for primary CTAs, highlights, links, and important UI states.
  - **Black:** `~#000000`. Used for secondary buttons and dark UI elements.

- **Neutral Palette:**
  - **Background:** White (`#ffffff`).
  - **Text:** Dark Grey (`#1a1a1a`) for primary text, with lighter greys (`#6b7280`) for subtitles and descriptions.
  - **Borders & Dividers:** Light Grey (`#e5e7eb`, `#f3f4f6`).

- **Gradients:**
  - **Footer/Hero CTA:** A bold red-to-red gradient (`#ef4444` to `#dc2626`) is used for high-impact sections.
  - **Decorative:** A purple-to-blue gradient (`#6366f1` to `#8b5cf6`) is used occasionally for visual flair.

---

## 3. Typography

The typography is a cornerstone of the design language, using a set of specific futuristic fonts for branding and clean fonts for readability.

- **Font Classes:**
  - `.font-cyber-heavy`: **Audiowide / Orbitron**. Used for main page titles (`<h1>`). It's bold, uppercase, and has wide letter spacing for maximum impact.
  - `.font-cyber`: **Orbitron / Audiowide**. Used for component titles, subheadings, and navigation links.
  - `.font-cyber-alt`: **Rajdhani**. A clean, readable sans-serif with a technical feel. Used for body copy, descriptions, and paragraphs.
  - `.font-mono-cyber`: **Space Mono / Michroma**. Used for any text that needs to feel like a code snippet or technical data.

- **Hierarchy Example:**
  - **Page Title (`h1`):** `.text-hero` / `.font-cyber-heavy`
  - **Section Header (`h2`):** `.font-cyber-heavy`
  - **Card/Item Title (`h3`):** `.font-cyber`
  - **Body Text (`p`):** `.text-large` / `.font-cyber-alt`

---

## 4. Layout & Spacing

The layout is built on a standard responsive grid system but uses spacing and alignment to create a modern feel.

- **Grid:** A standard Tailwind CSS grid (`grid`, `md:grid-cols-2`, etc.) is used for content structure.
- **Spacing:** Generous whitespace is employed to prevent visual clutter and give focus to key elements.
- **Alignment:** Sections often use centered text for headings and CTAs to create a focal point.

---

## 5. Component Styles

- **Buttons:**
  - **Shape:** This is a defining feature. Buttons use `clip-path` to create angular, "cyber" and "gaming" shapes. They are not simple rectangles.
  - **Variants:** `primary` (red), `secondary` (black), and `outline` (transparent with border).
  - **Animation:** Buttons feature multiple hover effects: a subtle scale-up, a background shine/glare, and an animated border that draws itself around the button.

- **Cards:**
  - Simple and clean with subtle grey borders.
  - They rely on hover effects (`shadow-lg`, `border-red-300`) to add dynamism. The futuristic feel comes from the typography and icons within the card, not the card shape itself.

- **Header:**
  - Features a "glassmorphism" effect (`glass-subtle`), making it float above the content with a blurred, semi-transparent background.

- **Footer:**
  - Often uses a bold red gradient (`gradient-footer`) and decorative `diagonal-lines` or vertical separator lines to maintain the high-tech aesthetic.

---

## 6. Visual Effects & Backgrounds

- **Background Patterns:**
  - **`AnimatedGrid`:** A dynamic grid of flashing cells used on the hero section to create an interactive, futuristic feel.
  - **`thread-bg` / `grid-bg`:** Subtle, static grid and line patterns used on section backgrounds to add texture without being distracting.
  - **`diagonal-lines`:** Repeating diagonal lines, often used on colored backgrounds like the footer CTA.

- **Animations:**
  - **`framer-motion`** is used for all major animations.
  - **Page Load:** Elements fade in and slide up smoothly.
  - **Special Effects:** `cyber-glow` for glowing text and `tech-scan` for animated lines.

- **Glassmorphism:**
  - The `.glass-subtle` class is used to create blurred, transparent surfaces, most notably on the main navigation header.

---

## 7. Iconography

- **Library:** `lucide-react` is the exclusive icon library.
- **Style:** The icons are clean, modern, and line-based. Their simplicity provides a good contrast to the stylized typography and shapes, ensuring clarity and a professional look.
