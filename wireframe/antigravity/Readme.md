# Codebolt Website Wireframe

A complete wireframe for the Codebolt website with a **fresh, modern design system** that's distinctly different from the kiro wireframe pattern.

## Design System

The design features:

- **Floating navigation** with pill-shaped styling and glassmorphism
- **Dark gradient hero sections** with indigo accent gradients
- **Bento grid layouts** for flexible, visual card arrangements
- **Split sections** for content + visual pairings
- **Modern typography** (Inter font family)
- **Responsive design** with mobile-first breakpoints

### Color Palette

- **Accent**: Indigo (#6366f1)
- **Dark**: Slate (#0f172a)
- **Surface**: Light gray (#f8fafc)
- **Text**: Dark slate with muted variations

## Site Structure

```
antigravity/
├── index.html                      # Homepage
├── styles.css                      # Shared design system
├── Readme.md                       # This file
│
├── features/
│   ├── index.html                  # Features overview
│   ├── agent-management.html       # Swarms, teams, visual builder
│   ├── job-coordination.html       # Locking, bidding, dependencies
│   ├── planning.html               # Roadmap, specs, whiteboard
│   ├── review-merge.html           # Multi-reviewer deliberation
│   ├── communication.html          # Mail, deliberations, calendar
│   └── observability.html          # Debug, audit trails, replay
│
├── concepts/
│   ├── index.html                  # Concepts overview
│   ├── stigmergy.html              # Pheromone coordination
│   ├── externalized-memory.html    # 3-layer Memoria architecture
│   ├── multi-agent-modes.html      # 4 coordination approaches
│   └── human-participation.html    # Role evolution, control levels
│
├── use-cases.html                  # Task-based use cases
├── pricing.html                    # Three tiers + FAQ
├── enterprise.html                 # Scale, security, support
├── download.html                   # Platform downloads
├── docs.html                       # Documentation hub
└── about.html                      # Mission, philosophy
```

## Key Concepts Highlighted

| Concept | Description |
|---------|-------------|
| **Stigmergy** | Agents coordinate through environmental signals, not direct communication |
| **Externalized Memory** | Memory belongs to the environment—87% knowledge survival |
| **Human Participation** | Humans are swarm members with the same tools as agents |
| **Multi-Agent Modes** | Parallel, Sub-Agents, Orchestrator, and Stigmergy Swarms |
| **Full Observability** | No black boxes—complete audit trails |

## Page Count

| Category | Count |
|----------|-------|
| Root pages | 9 |
| Feature pages | 7 |
| Concept pages | 5 |
| **Total** | **21 files** (19 HTML + 1 CSS + 1 MD) |

## Usage

Open `index.html` in a browser to view the wireframe. All pages are linked and navigable.

```bash
# macOS
open index.html

# Or start a local server
python -m http.server 8000
```

## Visual Placeholders

Diagrams and images are represented as styled placeholder blocks with descriptions:

```
[Diagram Description]
Contents preview or ASCII art
```

These indicate where actual graphics would be placed in the final design.

## Notes

- This is a **wireframe** focused on content, layout, and messaging
- All pages use the shared `styles.css` design system
- Responsive design included but optimized for desktop review
- Navigation is fully functional across all pages
