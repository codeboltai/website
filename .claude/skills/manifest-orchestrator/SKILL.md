### Skill Name
**Manifest-First Multi-Page Website Orchestrator**  
(Internal alias: `manifest-orchestrator-v1`)

### Description
The agent maintains an **entire multi-page website inside ONE high-density Markdown file** called the **Site Manifest**.  
The manifest contains:
- A live Global Site Index (the “map”)
- Every page’s layout, theme, sections, components, copy, and CTAs (the “rooms”)

This eliminates context loss, navbar/footer drift, and token bloat. One file = full site memory.

### When to Activate This Skill
Agent sees any of these triggers:
- “Build a website / landing page / SaaS site / portfolio…”
- “Add a new page”
- “Update pricing / hero / features…”
- “Make the site dark / mobile-first / add blog…”
- “Show me the current site structure”
- “Export this to HTML / Next.js / Webflow…”

### Core Benefits (Token & Reliability)
- ~95 % fewer tokens than maintaining separate HTML files
- Instant cross-page awareness (“You have /pricing but no link from home”)
- Deleting a page from the index auto-removes all references
- Atomic updates keep conversations short

### The Official Manifest Template (Copy-Paste Ready)

```markdown
# SITE MANIFEST: [Project Name] v1.0
Last updated: [YYYY-MM-DD]

## 🗺️ GLOBAL SITE INDEX
- / (Home)
  - /features
  - /pricing
  - /blog
- /about
- /contact
- /legal/privacy (footer-only)

---

## 🏗️ PAGE: Home (/)
[layout: landing-page | theme: dark-modern | nav: transparent | footer: minimal]

### Section 1: Hero
- Component: Split-Screen-Image-Right
- Heading: "..."
- Subheading: "..."
- CTA: [Primary: Get Started → /pricing] [Secondary: Watch 47s demo]

### Section 2: Trust Bar
- Logos: [list]

### Section 3: Features
- Component: 3-Column-Grid
- ...

---

## 🏗️ PAGE: Pricing (/pricing)
[layout: centered-grid | theme: light | nav: solid]

### Section 1: Header
- Title: "Simple, Transparent Pricing"

### Section 2: Pricing Cards
- Tier 1: Free | $0 | ...
- Tier 2: Pro | $29/mo | ...
```

### Agent Usage Protocols (Built-in Instructions)

1. **Always keep the full Manifest in memory** (or attached as the top message).
2. **Global Site Index is sacred** — never generate a link to a page that is not listed here.
3. **Atomic Updates Only**  
   Preferred user command style:  
   > “In the Site Manifest, change Home → Section 1 → Heading to ‘Build 10× faster with AI’. Keep everything else identical. Output ONLY the updated Hero section.”
4. **Full Rebuild** (when requested): “Regenerate the entire Manifest with the following changes…”
5. **Export Commands**:
   - “Export Manifest to clean HTML (all pages)”
   - “Convert to Next.js 15 app directory structure”
   - “Generate Tailwind + shadcn/ui code for /pricing only”

### Pro Atomic Update Examples (Agent can suggest these)

- “Update only the CTA button text on the Home page hero”
- “Add /blog page to index and create a basic structure for it”
- “Make every page mobile-first and update the Global Index comment”
- “Sync footer across all pages with new copyright text”

### Export / Handoff Rules
When user says “Ship it” or “Export”:
- First output the **final clean Manifest** (no extra commentary)
- Then offer:
  - Full static HTML set
  - Next.js / Astro / Webflow-ready code
  - Figma component breakdown
  - Deployment checklist (Vercel, Framer, etc.)