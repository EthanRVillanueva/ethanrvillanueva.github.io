# Portfolio Redesign — Design Specification

**Author:** Ethan Villanueva
**Date:** 2026-09-06
**Status:** Approved

---

## 1. Overview

A complete rebuild of ethanrvillanueva.github.io — a personal portfolio for a software engineer returning from a 13-month industry placement. The site replaces an HTML5 UP "Forty" template with a bespoke single-page design built in Astro, deployed to GitHub Pages.

### Goals

- Present Ethan as a capable junior/mid-level engineer with real industry experience
- Feel warm, approachable, and genuine — not a template
- Include deliberate personality touches (XP window, terminal frame, Badtz-Maru pixel art) without letting them dominate
- Ship fast, load fast, maintain easily

### Audience

- Recruiters and hiring managers scanning portfolios (primary)
- Peers and fellow engineers (secondary)
- University faculty (tertiary)

---

## 2. Tech Stack

### Core

| Technology | Role | Rationale |
|---|---|---|
| **Astro (latest stable, 5.x+)** | Static site framework | Component-based, zero JS by default, perfect GitHub Pages deployment. Use Content Layer API for any data-driven content. |
| **Tailwind CSS 4.x** | Styling | Utility-first, CSS-first configuration (no `tailwind.config.js`). Uses `@theme` directive and `@tailwindcss/vite` plugin. |
| **TypeScript** | Scripting (minimal) | Type safety for the few interactive islands |

### Infrastructure

| Technology | Role |
|---|---|
| **GitHub Pages** | Hosting (same as current) |
| **GitHub Actions** | Build & deploy pipeline (`astro build` → deploy) |

### What we're NOT using

- No React/Vue/Svelte — Astro components are sufficient, keeps bundle at zero JS for most of the page
- No jQuery — modern CSS and vanilla JS handle everything
- No CSS framework beyond Tailwind — no Bootstrap, no Bulma
- No particle.js, three.js, or heavy animation libraries
- No CMS — content lives in Astro components/markdown, edited directly

### External Services

- **Web3Forms** — contact form backend (carried over from current site, free tier, no server needed). Access key: `8d3f53a2-d7a1-44ce-9703-9b5d0c4a44fe`. Includes honeypot botcheck.
- **Google Fonts** — typography (two families, loaded with `font-display: swap`)

### Migration Notes

- The old HTML5 UP "Forty" template files (`index.html`, `aboutme.html`, `projects.html`, `workexperience.html`, `extracurriculars.html`, `assets/`) will be replaced entirely
- The existing `images/` directory contains tech stack SVGs and photos — carry over any that are still needed, discard the rest
- The existing CV PDF (`assets/ethanvillanueva-cv.pdf`) should be preserved and moved to Astro's `public/` directory
- Git history preserves the old site if ever needed

---

## 3. Page Architecture

### Single-page with anchor navigation

One `index.astro` page containing all sections. A sticky header nav highlights the active section as the user scrolls (via Intersection Observer). This keeps the site scannable — a recruiter can scroll through everything in under a minute.

### Component structure

```
src/
├── layouts/
│   └── BaseLayout.astro          # HTML shell, meta, fonts, global styles
├── components/
│   ├── Header.astro              # Sticky nav + dark mode toggle
│   ├── Hero.astro                # Name, tagline, quick links
│   ├── About.astro               # Bio inside XP window treatment
│   ├── Experience.astro          # Work experience timeline
│   ├── Projects.astro            # Project card grid
│   ├── Skills.astro              # Tech stack in terminal frame
│   ├── Interests.astro           # Interests section
│   ├── Contact.astro             # Contact form + social links
│   ├── Footer.astro              # Copyright, Badtz-Maru pixel art
│   ├── ui/
│   │   ├── XPWindow.astro        # Reusable XP window chrome component
│   │   ├── TerminalWindow.astro  # Reusable terminal window chrome component
│   │   ├── ProjectCard.astro     # Individual project card
│   │   ├── ExperienceItem.astro  # Individual experience entry
│   │   ├── ThemeToggle.astro     # Dark/light mode toggle island
│   │   └── BadtzMaru.astro       # Pixel art SVG component
│   └── icons/                    # Tech stack SVGs, social icons
├── pages/
│   └── index.astro               # Single page, composes all sections
├── styles/
│   └── global.css                # Tailwind directives, custom properties, XP/terminal styles
└── assets/
    └── fonts/                    # Self-hosted font files (if not using Google Fonts CDN)
```

### Navigation

```
[ Ethan Villanueva ]          [ About ] [ Experience ] [ Projects ] [ Skills ] [ Interests ] [ Contact ] [ ☀/🌙 ]
```

- Left: Name as wordmark (scrolls to top on click)
- Right: Section anchors + theme toggle
- Mobile: Hamburger → slide-down menu (CSS-only where possible, tiny JS island if needed)
- Active section highlighted via Intersection Observer

---

## 4. Visual Design

### Color Palette

**Light mode:**

| Token | Hex | Role |
|---|---|---|
| `--bg-primary` | `#FAFAF8` | Page background — warm off-white, not sterile |
| `--bg-surface` | `#FFFFFF` | Cards, elevated surfaces |
| `--bg-muted` | `#F0EEEB` | Subtle section alternation |
| `--text-primary` | `#1C1C1C` | Headings, body text |
| `--text-secondary` | `#5A5A5A` | Supporting text, captions |
| `--accent` | `#2B7A78` | Links, highlights, interactive elements — muted teal |
| `--accent-hover` | `#1D5553` | Hover/active state for accent |
| `--border` | `#E0DDDA` | Subtle dividers |

**Dark mode:**

| Token | Hex | Role |
|---|---|---|
| `--bg-primary` | `#151520` | Page background — deep indigo-black |
| `--bg-surface` | `#1E1E2E` | Cards, elevated surfaces |
| `--bg-muted` | `#1A1A28` | Subtle section alternation |
| `--text-primary` | `#E8E6E3` | Headings, body text |
| `--text-secondary` | `#9B9B9B` | Supporting text |
| `--accent` | `#4ECDC4` | Brighter teal for dark backgrounds |
| `--accent-hover` | `#3DBDB5` | Hover/active state |
| `--border` | `#2A2A3C` | Subtle dividers |

These are deliberately NOT the common AI-generated palettes (warm cream + terracotta, or black + acid green). The teal accent is professional without being corporate, and distinct from the typical portfolio palette.

### Typography

| Role | Family | Weight | Size (desktop) | Notes |
|---|---|---|---|---|
| Headings | **Sora** | 600 (SemiBold) | 2rem–3rem | Geometric sans with rounded terminals — friendly but modern, NOT the standard Inter/Poppins/Montserrat |
| Body | **Inter** | 400 (Regular) | 1rem (16px) | Highly legible, well-kerned, designed for screens |
| Terminal/code | **JetBrains Mono** | 400 | 0.875rem (14px) | For terminal window and inline code |

- Line height: 1.6 for body, 1.2 for headings
- Max line length: 72ch for body text (comfortable reading width)
- All text left-aligned (no centered body text — centered paragraphs are hard to read)
- Headings: sentence case, no ALL CAPS labels

### Layout

- Max content width: `64rem` (1024px), centered with generous side padding
- Section vertical spacing: `6rem` desktop, `4rem` mobile
- Card grid: CSS Grid, 2 columns desktop, 1 column mobile
- Responsive breakpoints: Tailwind defaults (`sm: 640px`, `md: 768px`, `lg: 1024px`)

### Dark Mode Implementation

- Strategy: `class` on `<html>` element (Tailwind's `dark:` variant)
- **Tailwind 4 setup**: In CSS, use `@custom-variant dark (&:where(.dark, .dark *));` to enable class-based dark mode (Tailwind 4 uses `prefers-color-scheme` by default — this overrides it)
- Default: respect `prefers-color-scheme` system preference on first visit
- Toggle: small sun/moon icon button in the header, persisted to `localStorage`
- Transition: `transition-colors duration-300` on body for smooth theme switch
- **Tailwind 4 global CSS entry point**: Use `@import "tailwindcss";` (replaces the old `@tailwind base/components/utilities` directives)
- **Astro integration**: Use `@tailwindcss/vite` plugin in `astro.config.mjs` `vite.plugins` array (NOT `@astrojs/tailwind`, which is deprecated for Tailwind v4)

```css
/* src/styles/global.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-heading: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --color-accent: #2B7A78;
  --color-accent-hover: #1D5553;
  /* ... all design tokens go here ... */
}
```

---

## 5. Section Details

### 5.1 Hero

**Purpose:** Immediate identification — who is this person, and how do I reach them?

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Ethan Villanueva                                           │
│                                                             │
│  Software Engineer · University of Nottingham               │
│                                                             │
│  [Brief one-liner about what drives you — 1 sentence max]   │
│                                                             │
│  [ GitHub ]  [ LinkedIn ]  [ CV ↓ ]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Clean typography, no visual gimmicks
- Name is large but not screaming — `3rem` Sora SemiBold
- One-liner in `--text-secondary`, understated
- Quick links as small, clearly styled text links or minimal icon+text buttons
- No hero image, no background pattern — the whitespace IS the design
- Subtle downward scroll indicator (a small animated chevron) — the one allowed entrance animation

### 5.2 About (XP Window Treatment)

**Purpose:** Show personality, tell the story, make Ethan memorable.

The entire about section content is wrapped inside a component that visually resembles a Windows XP "Notepad" window:

```
┌──────────────────────────────────────────────────────┐
│ 📝 about_ethan.txt - Notepad            [_][□][✕]  │
├──────────────────────────────────────────────────────┤
│ File  Edit  Format  View  Help                       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Bio content here — the CS50x pivot story,          │
│   Filipino background, what drives you,              │
│   returning from 13-month placement]                 │
│                                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**XP Window visual spec:**

- Title bar: Classic XP Luna blue gradient (`#0058E6` → `#3A8DF1`) in light mode; adapted to a muted blue-grey in dark mode
- Window buttons: Red close, yellow/grey minimize, green/blue maximize — decorative only, not interactive
- Menu bar: `File  Edit  Format  View  Help` — static, non-functional, just for authenticity
- Content area: White/off-white background (or dark surface in dark mode), standard body text inside
- Border: 2px solid border with subtle XP-style outset shadow
- Corner radius: `3px` (XP windows had very slight rounding)
- Max width: matches content width (`64rem`), responsive scaling
- NOT draggable, NOT resizable — it's a styled content container, not a functioning window

**Content inside:**

- 2-3 short paragraphs max
- The CS50x origin story (genuinely interesting — keep it)
- Brief mention of Filipino heritage
- What you care about building / what excites you
- No skills list here (that's in the Skills section)
- Written in first person, conversational tone

### 5.3 Experience

**Purpose:** Showcase the 13-month placement prominently; show work ethic through other roles.

Layout: **Stacked cards**, most recent first. Each card contains:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Role Title                                             │
│  Company Name · Location · Date Range                   │
│                                                         │
│  2-3 bullet points of key responsibilities/outcomes     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- The placement role gets visual prominence: slightly larger card, or a subtle accent border-left
- Retail roles (Next, Five Guys, Sainsbury's) are included but more compact — they show work ethic without cluttering
- No timeline line connecting cards (overdone in portfolios)
- Cards sit on `--bg-surface` with subtle border, `border-radius: 0.5rem`

### 5.4 Projects (Card Grid)

**Purpose:** Show technical ability through concrete work.

Layout: **2-column CSS Grid** (desktop), 1 column (mobile).

Each project card:

```
┌───────────────────────────┐
│                           │
│  Project Name             │
│                           │
│  1-2 sentence summary     │
│                           │
│  [ Python ] [ Pandas ]    │  ← small tech chips
│                           │
│  [ GitHub ↗ ]             │  ← link if public
│                           │
└───────────────────────────┘
```

- Cards on `--bg-surface`, subtle border, `border-radius: 0.5rem`
- Hover: card lifts slightly (`translateY(-2px)`) with shadow deepening — one allowed micro-interaction
- Tech chips: small rounded pills with tech names, no logos (cleaner at small size)
- No numbered markers (projects aren't a sequence)
- Expandable detail: clicking a card could expand inline to show fuller description, or we keep all details visible. Decide during implementation based on content length.

### 5.5 Skills (Terminal Window Treatment)

**Purpose:** List technical skills authentically, in a container that fits the backend-engineer identity.

```
┌──────────────────────────────────────────────────────┐
│  ●  ●  ●   ethan@portfolio: ~/skills                │
├──────────────────────────────────────────────────────┤
│                                                      │
│  $ cat stack.json                                    │
│  {                                                   │
│    "languages": ["Python", "Java", "C", "SQL",       │
│                  "JavaScript", "HTML", "CSS"],        │
│    "databases": ["PostgreSQL", "Supabase", "SQLite"], │
│    "tools": ["Git", "Scikit-learn", "Pandas",        │
│              "Matplotlib", "JUnit"]                  │
│  }                                                   │
│                                                      │
│  $ echo "Always learning..."                         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Terminal window visual spec:**

- Title bar: Dark grey (`#2D2D2D`), three coloured dots (red/yellow/green) on the left, path text on the right
- Adapts to dark mode: slightly lighter surface so it's still distinguishable
- Content area: Near-black (`#1E1E1E`) or matching dark surface
- Text: JetBrains Mono, green or light grey for prompt, white for output
- JSON syntax highlighted with subtle colours (strings in accent teal, keys in light grey)
- Static content — no typing animation, no blinking cursor
- Max width matches content area, centered
- Responsive: smaller font on mobile, horizontal scroll if needed (monospace doesn't wrap well)

**Content approach:**

- Present skills as a JSON object — natural for an engineer, easy to scan
- Group by category: languages, databases, tools/frameworks
- Possibly add soft skills as a separate `$ cat soft-skills.txt` block, or omit and let the rest of the site demonstrate them
- Add any skills gained during placement once content is finalised
- The trailing `echo` line is a small personality touch — can be adjusted

### 5.6 Interests

**Purpose:** Show Ethan as a complete person, not just a CV.

Layout: Simple grid or flex layout, 2-3 items.

Each interest as a compact card with:
- A short heading (e.g., "Robotics", "Powerlifting")
- 2-3 sentences about it
- Optional: a relevant stat or detail (e.g., lifting numbers)

Content areas (to be finalised with actual copy):
- **Robotics** — RoboNotts, F1Tenth experience (can frame as past experience that shaped you, not as a current activity)
- **Powerlifting** — the discipline/mindset angle, personal records
- **Other interests** — whatever else Ethan wants to share

This section stays light and scannable. No need for the full detail that was on the old extracurriculars page.

### 5.7 Contact

**Purpose:** Make it easy to get in touch.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Get in touch                                               │
│                                                             │
│  [Name          ]  [Email         ]                         │
│  [Message                                                ]  │
│  [ Send message ]                                           │
│                                                             │
│  or reach me at e.villanueva.cs@outlook.com                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Web3Forms integration (carried over from current site)
- Simple 3-field form: name, email, message
- Success/error states handled inline
- Fallback: mailto link displayed alongside the form
- Honeypot spam protection (already set up with Web3Forms)

### 5.8 Footer

**Purpose:** Close the page cleanly, house the Badtz-Maru easter egg.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [ GitHub ]  [ LinkedIn ]  [ Email ]                        │
│                                                             │
│  © 2026 Ethan Villanueva           🐧 ← pixel Badtz-Maru   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Social links repeated (easy access from bottom of page)
- Small pixel art Badtz-Maru (roughly 24×24px or 32×32px) sitting next to or near the copyright
- Built as inline SVG or CSS pixel art — no image file dependency
- Subtle: someone who scrolls to the bottom notices it and smiles
- Optional: a tiny tooltip on hover ("badtz says hi" or similar)

---

## 6. Personality Elements — Detailed Spec

### 6.1 XP Window Component (`XPWindow.astro`)

A reusable component that wraps any content in a Windows XP window chrome.

**Props:**
- `title: string` — window title text (e.g., "about_ethan.txt - Notepad")
- `icon?: string` — optional icon before title (e.g., "📝")
- `menuBar?: boolean` — whether to show the File/Edit/Format/View/Help bar (default: true)

**Implementation notes:**
- Pure CSS — no JavaScript needed
- Title bar gradient via `linear-gradient`
- Window buttons are decorative `<span>` elements with background colours
- Responds to dark mode: title bar gradient shifts to muted blue-grey, content area uses dark surface
- Border and shadow adapt per theme
- Content is a `<slot>` — any Astro content can be placed inside

### 6.2 Terminal Window Component (`TerminalWindow.astro`)

A reusable component that wraps content in a macOS-style terminal chrome.

**Props:**
- `title?: string` — title bar text (default: "ethan@portfolio: ~")

**Implementation notes:**
- Pure CSS, no JavaScript
- Three coloured dots as CSS pseudo-elements or inline spans
- Content area uses JetBrains Mono
- Syntax colouring via CSS classes on `<span>` elements (not a full syntax highlighter library)
- Dark in both themes (terminals are always dark), but surface colour adjusts slightly for dark mode contrast

### 6.3 Badtz-Maru Pixel Art (`BadtzMaru.astro`)

A small inline SVG or CSS grid pixel art of Badtz-Maru.

**Implementation notes:**
- Roughly 24×24px or 32×32px rendered size
- Simple, recognisable silhouette — doesn't need to be detailed
- Inline SVG preferred (single component, no external file, scales cleanly)
- Colour: black body, yellow beak, white eyes (the essential Badtz features)
- Optional subtle hover effect: a small bounce or tilt (`transform: rotate(5deg)`)
- Accessible: `aria-hidden="true"` since it's decorative

---

## 7. Interaction & Animation

### Philosophy

One orchestrated moment of personality (the XP and terminal windows being visually distinctive containers), with everything else quiet and disciplined. No scattered effects.

### Allowed animations

| Element | Animation | Trigger | Implementation |
|---|---|---|---|
| Scroll reveal | Sections fade in with subtle `translateY(12px)` → `translateY(0)` | Scrolling into view | CSS `@keyframes` + Intersection Observer, `threshold: 0.1` |
| Project cards | Lift `translateY(-2px)` + shadow deepens | Hover | CSS `transition: transform 0.2s, box-shadow 0.2s` |
| Theme toggle | Icon rotates smoothly between sun/moon | Click | CSS transition on the icon |
| Hero chevron | Gentle bounce suggesting "scroll down" | Page load, continuous | CSS `@keyframes` with `animation-iteration-count: 3` then stops |
| Badtz-Maru | Tiny bounce or tilt | Hover | CSS `transition: transform 0.2s` |
| Nav links | Underline slides in from left | Hover | CSS `::after` pseudo-element width transition |

### Disallowed

- No typing/typewriter animations
- No parallax scrolling
- No particle effects
- No page load spinners/preloaders
- No staggered cascade entrance animations on card grids
- No continuous looping animations (except the hero chevron, which stops after 3 cycles)

### Reduced motion

All animations wrapped in `@media (prefers-reduced-motion: no-preference)`. Users with `prefers-reduced-motion: reduce` see fully static content with instant state changes.

---

## 8. Accessibility

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- All sections have proper heading hierarchy (`h1` → `h2` → `h3`)
- Colour contrast: minimum WCAG AA (4.5:1 for body text, 3:1 for large text) in both themes
- Keyboard navigation: visible focus indicators on all interactive elements (links, buttons, form fields)
- Form labels: every input has an associated `<label>`
- Skip-to-content link: hidden visually, visible on focus
- Decorative elements (XP buttons, terminal dots, Badtz-Maru): `aria-hidden="true"`
- Images: proper `alt` text (or empty `alt=""` if decorative)

---

## 9. Performance

- **Zero JavaScript by default** — Astro ships no JS unless an island opts in
- **JS islands** — only ThemeToggle (tiny, `client:load`) and scroll observer (could be CSS-only with `animation-timeline: view()` if browser support is sufficient, otherwise tiny vanilla JS)
- **Font loading** — `font-display: swap`, preconnect to Google Fonts
- **Images** — Astro's built-in `<Image>` component from `astro:assets` for optimised formats (WebP/AVIF) and responsive sizes. Import as `import { Image } from 'astro:assets';`
- **CSS** — Tailwind purges unused styles at build time
- **Target** — Lighthouse score 95+ across all categories

---

## 10. Deployment

- **Build:** `astro build` outputs to `dist/`
- **No adapter needed** — Astro's default `output: 'static'` mode is correct for GitHub Pages
- **Configuration in `astro.config.mjs`:**
  - Set `site: 'https://ethanrvillanueva.github.io'`
  - No `base` needed since this is a root user site (not a project repo subpath)
- **Deploy:** GitHub Actions workflow triggers on push to `main` using **`withastro/action`**:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install, build, and upload site
        uses: withastro/action@v6
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- **Important:** Place an empty `.nojekyll` file in `public/` to ensure GitHub Pages serves `_astro/` directories correctly
- **Domain:** `ethanrvillanueva.github.io` (existing)
- **Branch strategy:** `main` is the source, GitHub Pages serves from the Actions output

---

## 11. Content Notes (for later)

Content will be filled in during implementation. These are notes on tone and approach:

- **Voice:** First person, conversational, confident but not boastful. "I built X" not "X was built by me."
- **Length:** Short paragraphs. Recruiters scan, they don't read essays. Each section should be digestible in 10-15 seconds.
- **Bio:** Lead with the CS50x story — it's genuinely interesting and shows initiative. Mention the placement. Keep Filipino heritage mention natural, not performative.
- **Project descriptions:** What it does, what you learned, what tech you used. 2-3 sentences max per project on the card; detail available if expanded.
- **No buzzwords:** Don't say "passionate" or "driven" — show it through what you've done.
- **Placement:** Update skills list with whatever you learned during the 13-month placement.

---

## 12. Out of Scope

- Blog / writing section (can be added later as a separate Astro page)
- CMS integration
- Analytics
- Custom domain
- Multi-language support
- Project detail subpages (consider for future iteration)

---

## 13. Summary of Key Design Decisions

| Decision | Choice | Why |
|---|---|---|
| Framework | Astro (latest stable) | Zero JS default, components, easy GitHub Pages deploy |
| Styling | Tailwind CSS 4.x (CSS-first config) | Fast, native dark mode, tree-shakes unused styles |
| Page structure | Single-page | Recruiter can scan everything quickly |
| Hero | Clean typography, no gimmicks | The design is the statement |
| About | Inside XP window | Personality touch, contained, memorable |
| Skills | Inside terminal window | Authentic for a backend engineer |
| Footer | Pixel Badtz-Maru | Subtle, personal, charming |
| Animation | Minimal, purposeful | Scroll reveals + card hover only |
| Dark mode | Toggle + system preference | User choice, persisted |
| Font pair | Sora + Inter | Friendly + legible, not the default Poppins/Montserrat |
