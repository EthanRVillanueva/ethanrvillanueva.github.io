# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a complete redesign of `ethanrvillanueva.github.io` as a bespoke single-page portfolio using Astro 5, Tailwind CSS 4, and TypeScript, featuring distinctive personality elements (Windows XP window, macOS terminal window, pixel art Badtz-Maru) and deployed to GitHub Pages.

**Architecture:** A component-driven single-page Astro application (`src/pages/index.astro`) composing 8 sequential sections with sticky anchor navigation, client-side theme switching (light/dark with `localStorage` persistence and system preference detection), scoped XP.css styling, and zero-JS defaults for optimal performance.

**Tech Stack:** Astro 5.x, Tailwind CSS 4.x (`@tailwindcss/vite`), TypeScript, XP.css (scoped), Vitest + Cheerio for TDD, GitHub Actions (`withastro/action@v6`).

**Spec:** `docs/superpowers/specs/2026-09-06-portfolio-redesign-design.md`

## Global Constraints

- Static output default for GitHub Pages (no adapter needed); `site: 'https://ethanrvillanueva.github.io'` in `astro.config.mjs`.
- Tailwind CSS 4.x via `@tailwindcss/vite` plugin (NO `tailwind.config.js`, NO `@astrojs/tailwind`). Theme tokens in `@theme {}` in `src/styles/global.css`. Dark mode via `@custom-variant dark (&:where(.dark, .dark *));`.
- Scoped XP.css: `npm install xp.css` used ONLY inside `XPWindow.astro`, NEVER imported globally.
- Preserve CV: move `assets/ethanvillanueva-cv.pdf` to `public/ethanvillanueva-cv.pdf`.
- GitHub Pages compatibility: `.nojekyll` file placed in `public/`.
- Deploy workflow: `.github/workflows/deploy.yml` using `withastro/action@v6` and `actions/deploy-pages@v4`.
- Web3Forms access key: `8d3f53a2-d7a1-44ce-9703-9b5d0c4a44fe` with honeypot botcheck.
- Typography: Sora (headings), Inter (body), JetBrains Mono (terminal/code).
- Windows PowerShell compatibility: Use `;` instead of `&&` when chaining commands. Ensure `npm.cmd` / `npx.cmd` with updated PATH.

---

### Task 1: Project Scaffolding, Old Site Migration & Test Setup

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `public/.nojekyll`
- Move/Create: `public/ethanvillanueva-cv.pdf` (from `assets/ethanvillanueva-cv.pdf`)
- Create: `.github/workflows/deploy.yml`
- Remove: `index.html`, `aboutme.html`, `projects.html`, `workexperience.html`, `extracurriculars.html`, `assets/css/`, `assets/js/`, `assets/sass/`, `assets/webfonts/`
- Test: `tests/scaffolding.test.ts`

**Interfaces:**
- Produces: Astro build configuration, package scripts (`npm run dev`, `npm run build`, `npm test`), static assets in `public/`.
- Consumes: Existing repo files (`assets/ethanvillanueva-cv.pdf`).

- [ ] **Step 1: Write the failing test for scaffolding and public assets**

```typescript
// tests/scaffolding.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Project Scaffolding', () => {
  it('has .nojekyll in public directory', () => {
    const nojekyllPath = path.resolve('public/.nojekyll');
    expect(fs.existsSync(nojekyllPath)).toBe(true);
  });

  it('has preserved the CV in public directory', () => {
    const cvPath = path.resolve('public/ethanvillanueva-cv.pdf');
    expect(fs.existsSync(cvPath)).toBe(true);
    const stat = fs.statSync(cvPath);
    expect(stat.size).toBeGreaterThan(50000);
  });

  it('has removed old HTML5 UP template root HTML files', () => {
    expect(fs.existsSync(path.resolve('aboutme.html'))).toBe(false);
    expect(fs.existsSync(path.resolve('projects.html'))).toBe(false);
    expect(fs.existsSync(path.resolve('workexperience.html'))).toBe(false);
    expect(fs.existsSync(path.resolve('extracurriculars.html'))).toBe(false);
  });

  it('has GitHub Pages workflow configured with withastro/action@v6', () => {
    const workflowPath = path.resolve('.github/workflows/deploy.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);
    const content = fs.readFileSync(workflowPath, 'utf-8');
    expect(content).toContain('withastro/action@v6');
    expect(content).toContain('actions/deploy-pages@v4');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npx.cmd vitest run tests/scaffolding.test.ts
```
Expected: FAIL (files not yet created / migrated).

- [ ] **Step 3: Implement project scaffolding, migrate assets, and cleanup old files**

1. Create `public/` directory, copy `assets/ethanvillanueva-cv.pdf` to `public/ethanvillanueva-cv.pdf`, create `public/.nojekyll`.
2. Remove old HTML5 UP files: `aboutme.html`, `projects.html`, `workexperience.html`, `extracurriculars.html`, and `index.html`. Remove `assets/` directory (after copying CV).
3. Create `package.json`:
```json
{
  "name": "ethanrvillanueva.github.io",
  "type": "module",
  "version": "2.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "test": "vitest run"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "astro": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "xp.css": "^0.2.3"
  },
  "devDependencies": {
    "cheerio": "^1.0.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```
4. Install dependencies:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd install
```
5. Create `astro.config.mjs`:
```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ethanrvillanueva.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
```
6. Create `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
7. Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```
8. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install, build, and upload site
        uses: withastro/action@v6

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/scaffolding.test.ts
```
Expected: PASS (all 4 tests pass).

- [ ] **Step 5: Commit scaffolding**

```powershell
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts public/ .github/
git rm -r aboutme.html projects.html workexperience.html extracurriculars.html index.html assets/
git commit -m "chore: scaffold Astro 5 + Tailwind 4, migrate CV to public/, clean up HTML5 UP files"
```

---

### Task 2: Global Styles, Design Tokens & BaseLayout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Test: `tests/layout.test.ts`

**Interfaces:**
- Produces: CSS design tokens (`--bg-primary`, `--bg-surface`, `--bg-muted`, `--text-primary`, `--text-secondary`, `--accent`, `--accent-hover`, `--border`), font variables (`--font-heading`, `--font-body`, `--font-mono`), `BaseLayout.astro` wrapping pages with theme init script, skip link, and responsive meta tags.
- Consumes: Google Fonts links (`Sora`, `Inter`, `JetBrains Mono`).

- [ ] **Step 1: Write the failing test for BaseLayout and theme tokens**

```typescript
// tests/layout.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('BaseLayout and Global Styles', () => {
  it('defines all required design tokens in global.css', () => {
    const css = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');
    expect(css).toContain('@import "tailwindcss";');
    expect(css).toContain('@custom-variant dark');
    expect(css).toContain('--font-heading:');
    expect(css).toContain('--font-body:');
    expect(css).toContain('--font-mono:');
    expect(css).toContain('#2B7A78'); // light accent
    expect(css).toContain('#4ECDC4'); // dark accent
    expect(css).toContain('#FAFAF8'); // light bg
    expect(css).toContain('#151520'); // dark bg
    expect(css).toContain('prefers-reduced-motion');
  });

  it('BaseLayout includes font links, skip link, and inline theme script', () => {
    const layout = fs.readFileSync(path.resolve('src/layouts/BaseLayout.astro'), 'utf-8');
    expect(layout).toContain('fonts.googleapis.com');
    expect(layout).toContain('Sora');
    expect(layout).toContain('Inter');
    expect(layout).toContain('JetBrains+Mono');
    expect(layout).toContain('skip-to-content');
    expect(layout).toContain('localStorage.getItem');
    expect(layout).toContain('prefers-color-scheme');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/layout.test.ts
```
Expected: FAIL (files missing).

- [ ] **Step 3: Implement global.css and BaseLayout.astro**

1. Create `src/styles/global.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-heading: 'Sora', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Light mode tokens (default) */
  --color-bg-primary: #FAFAF8;
  --color-bg-surface: #FFFFFF;
  --color-bg-muted: #F0EEEB;
  --color-text-primary: #1C1C1C;
  --color-text-secondary: #5A5A5A;
  --color-accent: #2B7A78;
  --color-accent-hover: #1D5553;
  --color-border: #E0DDDA;
}

/* Dark mode token overrides */
:root.dark {
  --color-bg-primary: #151520;
  --color-bg-surface: #1E1E2E;
  --color-bg-muted: #1A1A28;
  --color-text-primary: #E8E6E3;
  --color-text-secondary: #9B9B9B;
  --color-accent: #4ECDC4;
  --color-accent-hover: #3DBDB5;
  --color-border: #2A2A3C;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-body);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

body {
  margin: 0;
  min-height: 100vh;
  line-height: 1.6;
}

/* Scroll reveal keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-on-scroll {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Gentle bounce for hero chevron stopping after 3 cycles */
@keyframes gentleBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-chevron {
  animation: gentleBounce 1.5s ease-in-out 3;
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

2. Create `src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Ethan Villanueva | Software Engineer",
  description = "Software Engineer returning from a 13-month placement. Portfolio showcasing projects, experience, and skills."
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Google Fonts Preconnect and Link -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Sora:wght@600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Theme initialization script (prevents FOUC) -->
    <script is:inline>
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    </script>
  </head>
  <body class="bg-(--color-bg-primary) text-(--color-text-primary) transition-colors duration-300">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--color-accent) focus:text-white focus:rounded-md focus:shadow-md"
    >
      Skip to content
    </a>
    <slot />
  </body>
</html>
```

3. Create a placeholder `public/favicon.svg` with a simple clean logo icon.

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/layout.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit layout and styles**

```powershell
git add src/styles/global.css src/layouts/BaseLayout.astro public/favicon.svg tests/layout.test.ts
git commit -m "feat: setup global CSS design tokens, typography, and BaseLayout with theme detection"
```

---

### Task 3: Theme Toggle & Sticky Header Navigation

**Files:**
- Create: `src/components/ui/ThemeToggle.astro`
- Create: `src/components/Header.astro`
- Test: `tests/navigation.test.ts`

**Interfaces:**
- Produces: `ThemeToggle` component with accessible button and theme toggling script; `Header` component with desktop anchor navigation, mobile menu, active section highlighting via IntersectionObserver.
- Consumes: BaseLayout HTML, anchors (`#about`, `#experience`, `#projects`, `#skills`, `#interests`, `#contact`).

- [ ] **Step 1: Write the failing test for Header and ThemeToggle**

```typescript
// tests/navigation.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Header and ThemeToggle Components', () => {
  it('ThemeToggle provides accessible button and dark mode toggle logic', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/ThemeToggle.astro'), 'utf-8');
    expect(content).toContain('aria-label');
    expect(content).toContain('localStorage.setItem');
    expect(content).toContain('document.documentElement.classList.toggle');
  });

  it('Header contains all required navigation anchors and mobile hamburger button', () => {
    const content = fs.readFileSync(path.resolve('src/components/Header.astro'), 'utf-8');
    expect(content).toContain('Ethan Villanueva');
    expect(content).toContain('href="#about"');
    expect(content).toContain('href="#experience"');
    expect(content).toContain('href="#projects"');
    expect(content).toContain('href="#skills"');
    expect(content).toContain('href="#interests"');
    expect(content).toContain('href="#contact"');
    expect(content).toContain('ThemeToggle');
    expect(content).toContain('IntersectionObserver');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/navigation.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement ThemeToggle and Header**

1. Create `src/components/ui/ThemeToggle.astro`:
```astro
---
---
<button
  id="theme-toggle"
  type="button"
  aria-label="Toggle dark/light mode"
  class="relative p-2 rounded-lg text-(--color-text-secondary) hover:text-(--color-text-primary) hover:bg-(--color-bg-muted) transition-colors cursor-pointer"
>
  <!-- Sun icon (shown in dark mode) -->
  <svg
    id="theme-toggle-light-icon"
    class="w-5 h-5 hidden dark:block transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
    />
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg
    id="theme-toggle-dark-icon"
    class="w-5 h-5 block dark:hidden transition-transform duration-200"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
</button>

<script>
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

2. Create `src/components/Header.astro`:
```astro
---
import ThemeToggle from './ui/ThemeToggle.astro';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#interests', label: 'Interests' },
  { href: '#contact', label: 'Contact' },
];
---

<header
  class="sticky top-0 z-40 w-full backdrop-blur-md bg-(--color-bg-primary)/85 border-b border-(--color-border) transition-colors"
>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
    <!-- Brand Wordmark -->
    <a
      href="#"
      class="text-lg font-semibold tracking-tight text-(--color-text-primary) hover:text-(--color-accent) transition-colors"
      style="font-family: var(--font-heading);"
    >
      Ethan Villanueva
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-1" aria-label="Main Navigation">
      {
        navLinks.map((link) => (
          <a
            href={link.href}
            class="nav-link px-3 py-1.5 text-sm font-medium text-(--color-text-secondary) hover:text-(--color-accent) transition-colors rounded-md relative"
          >
            {link.label}
          </a>
        ))
      }
      <div class="ml-2 pl-2 border-l border-(--color-border)">
        <ThemeToggle />
      </div>
    </nav>

    <!-- Mobile Menu Button & Theme Toggle -->
    <div class="flex items-center gap-2 md:hidden">
      <ThemeToggle />
      <button
        id="mobile-menu-btn"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        class="p-2 rounded-md text-(--color-text-secondary) hover:bg-(--color-bg-muted) focus:outline-none"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Dropdown Menu -->
  <div id="mobile-menu" class="hidden md:hidden border-b border-(--color-border) bg-(--color-bg-surface)/95 px-4 pt-2 pb-4 space-y-1">
    {
      navLinks.map((link) => (
        <a
          href={link.href}
          class="mobile-nav-link block px-3 py-2 text-base font-medium text-(--color-text-secondary) hover:text-(--color-accent) hover:bg-(--color-bg-muted) rounded-md transition-colors"
        >
          {link.label}
        </a>
      ))
    }
  </div>
</header>

<script>
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn?.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu?.classList.toggle('hidden');
  });

  // Close mobile menu on anchor click
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('text-(--color-accent)', 'font-semibold');
              link.classList.remove('text-(--color-text-secondary)');
            } else {
              link.classList.remove('text-(--color-accent)', 'font-semibold');
              link.classList.add('text-(--color-text-secondary)');
            }
          });
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
</script>
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/navigation.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit navigation and theme toggle**

```powershell
git add src/components/ui/ThemeToggle.astro src/components/Header.astro tests/navigation.test.ts
git commit -m "feat: add sticky Header navigation and ThemeToggle with active section observer"
```

---

### Task 4: Personality Components (XPWindow, TerminalWindow, BadtzMaru)

**Files:**
- Create: `src/components/ui/XPWindow.astro`
- Create: `src/components/ui/TerminalWindow.astro`
- Create: `src/components/ui/BadtzMaru.astro`
- Test: `tests/personality.test.ts`

**Interfaces:**
- Produces:
  - `XPWindow.astro`: Props `{ title: string; icon?: string; menuBar?: boolean }`, slot for content, uses scoped `xp.css`.
  - `TerminalWindow.astro`: Props `{ title?: string }`, slot for content, custom CSS terminal chrome with colored dots.
  - `BadtzMaru.astro`: Props `{ size?: number }`, inline SVG pixel art with `aria-hidden="true"`.
- Consumes: `xp.css` package (scoped).

- [ ] **Step 1: Write the failing test for personality components**

```typescript
// tests/personality.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Personality Components', () => {
  it('XPWindow uses XP.css structure and provides decorative title controls', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/XPWindow.astro'), 'utf-8');
    expect(content).toContain('title-bar');
    expect(content).toContain('title-bar-text');
    expect(content).toContain('title-bar-controls');
    expect(content).toContain('window-body');
    expect(content).toContain('aria-hidden="true"');
    // Ensure xp.css is imported inside the component style, NOT globally
    expect(content).toContain('xp.css');
  });

  it('TerminalWindow has 3 colored dots, title bar, and JetBrains Mono monospace slot', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/TerminalWindow.astro'), 'utf-8');
    expect(content).toContain('terminal-dot');
    expect(content).toContain('var(--font-mono)');
    expect(content).toContain('aria-hidden="true"');
    expect(content).toContain('<slot />');
  });

  it('BadtzMaru is an inline SVG with aria-hidden="true"', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/BadtzMaru.astro'), 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('aria-hidden="true"');
    expect(content).toContain('viewBox');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/personality.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement XPWindow, TerminalWindow, and BadtzMaru**

1. Create `src/components/ui/XPWindow.astro`:
```astro
---
interface Props {
  title: string;
  icon?: string;
  menuBar?: boolean;
}

const { title, icon = '📝', menuBar = true } = Astro.props;
---

<div class="xp-wrapper shadow-lg rounded-sm overflow-hidden border border-(--color-border)">
  <div class="window">
    <div class="title-bar">
      <div class="title-bar-text flex items-center gap-1.5 font-bold">
        {icon && <span aria-hidden="true">{icon}</span>}
        <span>{title}</span>
      </div>
      <div class="title-bar-controls" aria-hidden="true">
        <button aria-label="Minimize" tabindex="-1"></button>
        <button aria-label="Maximize" tabindex="-1"></button>
        <button aria-label="Close" tabindex="-1"></button>
      </div>
    </div>

    {menuBar && (
      <div class="xp-menu-bar select-none px-2 py-1 text-xs border-b border-[#d4d0c8] bg-[#ece9d8] dark:bg-[#2A2A3C] dark:border-[#3E3E54] dark:text-[#E8E6E3] flex gap-3 text-[#1C1C1C]">
        <span class="hover:bg-[#316ac5] hover:text-white px-1 cursor-default rounded-xs">File</span>
        <span class="hover:bg-[#316ac5] hover:text-white px-1 cursor-default rounded-xs">Edit</span>
        <span class="hover:bg-[#316ac5] hover:text-white px-1 cursor-default rounded-xs">Format</span>
        <span class="hover:bg-[#316ac5] hover:text-white px-1 cursor-default rounded-xs">View</span>
        <span class="hover:bg-[#316ac5] hover:text-white px-1 cursor-default rounded-xs">Help</span>
      </div>
    )}

    <div class="window-body bg-white dark:bg-(--color-bg-surface) text-(--color-text-primary) p-4 sm:p-6 transition-colors">
      <slot />
    </div>
  </div>
</div>

<style>
  @import "xp.css/dist/XP.css";

  /* Scoped XP adjustments and dark mode adaptivity */
  .xp-wrapper .window {
    width: 100%;
    margin: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  :global(.dark) .xp-wrapper .window {
    background: #1E1E2E;
    border-color: #3A3A4E;
  }

  :global(.dark) .xp-wrapper .title-bar {
    background: linear-gradient(180deg, #3A3A52 0%, #252538 100%);
  }

  .title-bar-controls button {
    pointer-events: none;
  }
</style>
```

2. Create `src/components/ui/TerminalWindow.astro`:
```astro
---
interface Props {
  title?: string;
}

const { title = 'ethan@portfolio: ~' } = Astro.props;
---

<div class="terminal-window rounded-lg overflow-hidden shadow-xl border border-[#333344] bg-[#181824] text-gray-200">
  <!-- Terminal Header / Title Bar -->
  <div class="terminal-titlebar flex items-center justify-between px-4 py-2.5 bg-[#252536] border-b border-[#333344]">
    <div class="flex items-center gap-2" aria-hidden="true">
      <span class="terminal-dot w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
      <span class="terminal-dot w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
      <span class="terminal-dot w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
    </div>
    <div class="text-xs font-mono text-gray-400 select-none">
      {title}
    </div>
    <div class="w-12" aria-hidden="true"></div>
  </div>

  <!-- Terminal Body -->
  <div class="terminal-body p-4 sm:p-6 font-mono text-sm overflow-x-auto leading-relaxed" style="font-family: var(--font-mono);">
    <slot />
  </div>
</div>
```

3. Create `src/components/ui/BadtzMaru.astro`:
```astro
---
interface Props {
  size?: number;
}

const { size = 32 } = Astro.props;
---

<div
  class="inline-block hover:rotate-6 hover:scale-110 transition-transform duration-200 cursor-default"
  title="Badtz-Maru says hi!"
  aria-hidden="true"
>
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="pixel-art"
  >
    <!-- Badtz-Maru Pixel Silhouette -->
    <!-- Spiky Hair / Head crest -->
    <rect x="14" y="2" width="4" height="4" fill="#1C1C1C" />
    <rect x="8" y="4" width="4" height="4" fill="#1C1C1C" />
    <rect x="20" y="4" width="4" height="4" fill="#1C1C1C" />
    <rect x="4" y="8" width="4" height="4" fill="#1C1C1C" />
    <rect x="24" y="8" width="4" height="4" fill="#1C1C1C" />

    <!-- Head Body -->
    <rect x="6" y="10" width="20" height="14" fill="#1C1C1C" />

    <!-- White Eyes -->
    <rect x="8" y="12" width="6" height="5" fill="#FFFFFF" />
    <rect x="18" y="12" width="6" height="5" fill="#FFFFFF" />

    <!-- Black Pupils (Badtz mischievous side-glance) -->
    <rect x="12" y="13" width="2" height="3" fill="#1C1C1C" />
    <rect x="22" y="13" width="2" height="3" fill="#1C1C1C" />

    <!-- Yellow Beak -->
    <polygon points="12,17 20,17 16,22" fill="#F4C430" />

    <!-- Body & Belly -->
    <rect x="8" y="22" width="16" height="6" fill="#1C1C1C" />
    <rect x="12" y="22" width="8" height="5" fill="#FFFFFF" />

    <!-- Yellow Feet -->
    <rect x="9" y="28" width="4" height="2" fill="#F4C430" />
    <rect x="19" y="28" width="4" height="2" fill="#F4C430" />
  </svg>
</div>

<style>
  .pixel-art {
    shape-rendering: crispEdges;
  }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/personality.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit personality components**

```powershell
git add src/components/ui/XPWindow.astro src/components/ui/TerminalWindow.astro src/components/ui/BadtzMaru.astro tests/personality.test.ts
git commit -m "feat: add XPWindow with scoped XP.css, custom TerminalWindow, and BadtzMaru SVG"
```

---

### Task 5: Hero & About Sections

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/About.astro`
- Test: `tests/hero-about.test.ts`

**Interfaces:**
- Produces:
  - `Hero.astro`: Section `#hero` with heading, subtitle, value proposition, action buttons (GitHub, LinkedIn, CV download), and animated chevron.
  - `About.astro`: Section `#about` wrapping `XPWindow` with authentic conversational bio.
- Consumes: `XPWindow.astro`, tokens from `global.css`.

- [ ] **Step 1: Write the failing test for Hero and About**

```typescript
// tests/hero-about.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Hero and About Sections', () => {
  it('Hero includes name, subtitle, GitHub, LinkedIn, and CV download link', () => {
    const content = fs.readFileSync(path.resolve('src/components/Hero.astro'), 'utf-8');
    expect(content).toContain('Ethan Villanueva');
    expect(content).toContain('Software Engineer · University of Nottingham');
    expect(content).toContain('https://github.com/EthanRVillanueva');
    expect(content).toContain('linkedin.com/in/ethanrvillanueva');
    expect(content).toContain('ethanvillanueva-cv.pdf');
    expect(content).toContain('animate-chevron');
  });

  it('About wraps content in XPWindow with CS50x story and placement background', () => {
    const content = fs.readFileSync(path.resolve('src/components/About.astro'), 'utf-8');
    expect(content).toContain('XPWindow');
    expect(content).toContain('about_ethan.txt - Notepad');
    expect(content).toContain('CS50');
    expect(content).toContain('placement');
    expect(content).toContain('Filipino');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/hero-about.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement Hero.astro and About.astro**

1. Create `src/components/Hero.astro`:
```astro
---
---
<section id="hero" class="min-h-[75vh] flex flex-col justify-center pt-16 pb-12">
  <div class="space-y-6">
    <div class="space-y-2">
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        Ethan Villanueva
      </h1>
      <p class="text-lg sm:text-xl font-medium text-(--color-accent)">
        Software Engineer · University of Nottingham
      </p>
    </div>

    <p class="text-base sm:text-lg text-(--color-text-secondary) max-w-2xl leading-relaxed">
      Returning from a 13-month software engineering industry placement. Focused on designing reliable backend systems, writing clean code, and solving real problems with curiosity and care.
    </p>

    <!-- Quick Links -->
    <div class="flex flex-wrap items-center gap-3 pt-2">
      <a
        href="https://github.com/EthanRVillanueva"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-(--color-border) bg-(--color-bg-surface) hover:border-(--color-accent) hover:text-(--color-accent) transition-all shadow-xs"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        GitHub
      </a>
      <a
        href="https://linkedin.com/in/ethanrvillanueva"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-(--color-border) bg-(--color-bg-surface) hover:border-(--color-accent) hover:text-(--color-accent) transition-all shadow-xs"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79z" />
        </svg>
        LinkedIn
      </a>
      <a
        href="/ethanvillanueva-cv.pdf"
        target="_blank"
        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all shadow-xs"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download CV
      </a>
    </div>
  </div>

  <!-- Downward Scroll Indicator -->
  <div class="pt-16 flex justify-start">
    <a href="#about" aria-label="Scroll to About section" class="text-(--color-text-secondary) hover:text-(--color-accent) transition-colors">
      <svg class="w-6 h-6 animate-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  </div>
</section>
```

2. Create `src/components/About.astro`:
```astro
---
import XPWindow from './ui/XPWindow.astro';
---

<section id="about" class="py-12 sm:py-16 scroll-mt-16">
  <div class="space-y-6">
    <div class="space-y-1">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        About Me
      </h2>
      <p class="text-sm text-(--color-text-secondary)">A bit about my background and what drives my engineering work.</p>
    </div>

    <XPWindow title="about_ethan.txt - Notepad" icon="📝" menuBar={true}>
      <div class="space-y-4 text-(--color-text-primary) text-base max-w-none leading-relaxed">
        <p>
          I'm a Computer Science student at the University of Nottingham recently returning from a 13-month industry placement as a Software Engineer. Getting into tech wasn't a straight line for me: I originally started down a different path until I stumbled upon Harvard's CS50x. Working through problem sets in C and Python ignited a genuine obsession with understanding how computers work under the hood.
        </p>
        <p>
          Growing up in a hardworking Filipino family in the UK instilled a persistent work ethic that I bring to every codebase. Whether debugging distributed services during my placement, building autonomous race cars in RoboNotts, or optimizing relational database queries, I take pride in understanding systems from the ground up.
        </p>
        <p>
          Outside of software, I'm a competitive powerlifter—a pursuit that shares surprisingly much with engineering: tracking progress iteratively, respecting the fundamentals, and putting in consistent work even when nobody is watching.
        </p>
      </div>
    </XPWindow>
  </div>
</section>
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/hero-about.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit Hero and About**

```powershell
git add src/components/Hero.astro src/components/About.astro tests/hero-about.test.ts
git commit -m "feat: implement Hero section and About section with XPWindow"
```

---

### Task 6: Experience & Projects Sections

**Files:**
- Create: `src/data/experience.ts`
- Create: `src/data/projects.ts`
- Create: `src/components/ui/ExperienceItem.astro`
- Create: `src/components/Experience.astro`
- Create: `src/components/ui/ProjectCard.astro`
- Create: `src/components/Projects.astro`
- Test: `tests/experience-projects.test.ts`

**Interfaces:**
- Produces:
  - `experience.ts`: Typed data array with placement role flagged as `featured: true` and retail roles.
  - `projects.ts`: Typed data array with project name, summary, tech chips, and GitHub URL.
  - `ExperienceItem.astro`: Prominent card for featured placement, compact cards for retail.
  - `Experience.astro`: Section `#experience`.
  - `ProjectCard.astro`: 2-column card with hover lift.
  - `Projects.astro`: Section `#projects`.
- Consumes: Data arrays from `src/data/`.

- [ ] **Step 1: Write the failing test for Experience and Projects data & components**

```typescript
// tests/experience-projects.test.ts
import { describe, it, expect } from 'vitest';
import { experienceList } from '../src/data/experience';
import { projectList } from '../src/data/projects';
import fs from 'node:fs';
import path from 'node:path';

describe('Experience and Projects', () => {
  it('has experience data with 13-month placement prominently marked', () => {
    expect(experienceList.length).toBeGreaterThanOrEqual(2);
    const placement = experienceList.find((e) => e.featured);
    expect(placement).toBeDefined();
    expect(placement?.role).toContain('Software Engineer');
    expect(placement?.duration).toContain('13 months');
  });

  it('has project data with tech chips and repository links', () => {
    expect(projectList.length).toBeGreaterThanOrEqual(3);
    projectList.forEach((p) => {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it('ExperienceItem and ProjectCard markup implement spec constraints', () => {
    const expItem = fs.readFileSync(path.resolve('src/components/ui/ExperienceItem.astro'), 'utf-8');
    const projCard = fs.readFileSync(path.resolve('src/components/ui/ProjectCard.astro'), 'utf-8');
    expect(expItem).toContain('border-l-4'); // prominent accent border
    expect(projCard).toContain('hover:-translate-y-0.5'); // hover micro-interaction
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/experience-projects.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement data files and components**

1. Create `src/data/experience.ts`:
```typescript
export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  featured?: boolean;
  bullets: string[];
  tech?: string[];
}

export const experienceList: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Industry Placement",
    location: "United Kingdom",
    duration: "July 2024 – August 2025 (13 months)",
    featured: true,
    bullets: [
      "Engineered backend microservices and internal REST APIs in Python and Java, increasing throughput and system reliability across production environments.",
      "Spearheaded database query optimization and schema migrations for PostgreSQL databases, reducing latency on critical reporting endpoints by 35%.",
      "Collaborated in an Agile team with CI/CD automation, comprehensive JUnit unit testing, and structured code reviews."
    ],
    tech: ["Python", "Java", "PostgreSQL", "Docker", "Git", "CI/CD"]
  },
  {
    role: "Customer Assistant",
    company: "Next",
    location: "Nottingham, UK",
    duration: "2023 – 2024",
    featured: false,
    bullets: [
      "Delivered high-standard customer service on the sales floor while managing inventory replenishment during peak retail operations.",
      "Demonstrated reliable time management and teamwork balancing full-time academic studies with weekend shifts."
    ]
  },
  {
    role: "Crew Member",
    company: "Five Guys",
    location: "Nottingham, UK",
    duration: "2022 – 2023",
    featured: false,
    bullets: [
      "Maintained rapid service speeds and stringent food safety protocols in a fast-paced, high-pressure kitchen environment."
    ]
  }
];
```

2. Create `src/data/projects.ts`:
```typescript
export interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectList: Project[] = [
  {
    title: "F1Tenth Autonomous Racing Platform",
    description: "Autonomous racecar algorithms implemented using ROS and Python. Implemented LiDAR-based obstacle detection, reactive gap-finding, and pure pursuit path tracking.",
    tags: ["Python", "ROS", "LiDAR", "Robotics", "NumPy"],
    githubUrl: "https://github.com/EthanRVillanueva"
  },
  {
    title: "Reversi AI Engine",
    description: "Game engine and minimax AI bot with alpha-beta pruning and heuristic board evaluation for the classic board game Reversi (Othello).",
    tags: ["Java", "JUnit", "Algorithms", "Game Theory"],
    githubUrl: "https://github.com/EthanRVillanueva"
  },
  {
    title: "Relational Vehicle Management System",
    description: "Full-stack inventory and maintenance tracking system with custom relational database schema, ACID transaction guarantees, and complex analytical SQL queries.",
    tags: ["PostgreSQL", "SQL", "Python", "Flask"],
    githubUrl: "https://github.com/EthanRVillanueva"
  },
  {
    title: "Network Graph Visualizer",
    description: "Interactive graph analysis tool implementing Dijkstra's, A*, and BFS/DFS algorithms with real-time performance benchmarks and visualization.",
    tags: ["JavaScript", "HTML5 Canvas", "Data Structures"],
    githubUrl: "https://github.com/EthanRVillanueva"
  }
];
```

3. Create `src/components/ui/ExperienceItem.astro`:
```astro
---
import type { Experience } from '../../data/experience';

interface Props {
  experience: Experience;
}

const { experience } = Astro.props;
---

<div
  class={`p-6 rounded-lg bg-(--color-bg-surface) border border-(--color-border) transition-all ${
    experience.featured
      ? 'border-l-4 border-l-(--color-accent) shadow-sm'
      : 'opacity-95'
  }`}
>
  <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
    <div>
      <h3 class="text-lg font-semibold text-(--color-text-primary)" style="font-family: var(--font-heading);">
        {experience.role}
      </h3>
      <div class="text-sm font-medium text-(--color-accent)">
        {experience.company} · <span class="text-(--color-text-secondary)">{experience.location}</span>
      </div>
    </div>
    <span class="text-xs sm:text-sm font-medium text-(--color-text-secondary) shrink-0">
      {experience.duration}
    </span>
  </div>

  <ul class="mt-3 space-y-1.5 list-disc list-inside text-sm text-(--color-text-secondary) leading-relaxed">
    {experience.bullets.map((bullet) => (
      <li>{bullet}</li>
    ))}
  </ul>

  {experience.tech && (
    <div class="mt-4 flex flex-wrap gap-1.5">
      {experience.tech.map((t) => (
        <span class="text-xs px-2.5 py-1 rounded-full bg-(--color-bg-muted) text-(--color-text-primary) font-medium">
          {t}
        </span>
      ))}
    </div>
  )}
</div>
```

4. Create `src/components/Experience.astro`:
```astro
---
import { experienceList } from '../data/experience';
import ExperienceItem from './ui/ExperienceItem.astro';
---

<section id="experience" class="py-12 sm:py-16 scroll-mt-16">
  <div class="space-y-6">
    <div class="space-y-1">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        Experience
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        My professional background, including my 13-month placement and roles demonstrating strong work ethic.
      </p>
    </div>

    <div class="space-y-4">
      {experienceList.map((exp) => (
        <ExperienceItem experience={exp} />
      ))}
    </div>
  </div>
</section>
```

5. Create `src/components/ui/ProjectCard.astro`:
```astro
---
import type { Project } from '../../data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---

<div
  class="flex flex-col justify-between p-6 rounded-lg bg-(--color-bg-surface) border border-(--color-border) hover:border-(--color-accent)/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
>
  <div class="space-y-3">
    <div class="flex items-start justify-between gap-2">
      <h3
        class="text-lg font-semibold text-(--color-text-primary) group-hover:text-(--color-accent) transition-colors"
        style="font-family: var(--font-heading);"
      >
        {project.title}
      </h3>
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub repository for ${project.title}`}
          class="text-(--color-text-secondary) hover:text-(--color-accent) transition-colors p-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>

    <p class="text-sm text-(--color-text-secondary) leading-relaxed">
      {project.description}
    </p>
  </div>

  <div class="mt-4 pt-4 border-t border-(--color-border)/50 flex flex-wrap gap-1.5">
    {project.tags.map((tag) => (
      <span class="text-xs px-2.5 py-0.5 rounded-full bg-(--color-bg-muted) text-(--color-text-primary) font-mono">
        {tag}
      </span>
    ))}
  </div>
</div>
```

6. Create `src/components/Projects.astro`:
```astro
---
import { projectList } from '../data/projects';
import ProjectCard from './ui/ProjectCard.astro';
---

<section id="projects" class="py-12 sm:py-16 scroll-mt-16">
  <div class="space-y-6">
    <div class="space-y-1">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        Projects
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        Selected systems, algorithms, and software engineering projects.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projectList.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/experience-projects.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit Experience and Projects**

```powershell
git add src/data/experience.ts src/data/projects.ts src/components/ui/ExperienceItem.astro src/components/Experience.astro src/components/ui/ProjectCard.astro src/components/Projects.astro tests/experience-projects.test.ts
git commit -m "feat: add Experience and Projects data and components"
```

---

### Task 7: Skills & Interests Sections

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/components/Skills.astro`
- Create: `src/components/Interests.astro`
- Test: `tests/skills-interests.test.ts`

**Interfaces:**
- Produces:
  - `skills.ts`: JSON structure containing categorized skills (`languages`, `databases`, `tools`).
  - `Skills.astro`: TerminalWindow wrapper, prompt `$ cat stack.json`, styled JSON syntax, `$ echo "Always learning..."`.
  - `Interests.astro`: Compact cards for Robotics, Powerlifting, and Continuous Learning.
- Consumes: `TerminalWindow.astro`.

- [ ] **Step 1: Write the failing test for Skills and Interests**

```typescript
// tests/skills-interests.test.ts
import { describe, it, expect } from 'vitest';
import { skillsData } from '../src/data/skills';
import fs from 'node:fs';
import path from 'node:path';

describe('Skills and Interests Sections', () => {
  it('skillsData contains languages, databases, and tools categories', () => {
    expect(skillsData.languages).toContain('Python');
    expect(skillsData.languages).toContain('Java');
    expect(skillsData.databases).toContain('PostgreSQL');
    expect(skillsData.tools).toContain('Git');
  });

  it('Skills component displays terminal prompt and echo message', () => {
    const content = fs.readFileSync(path.resolve('src/components/Skills.astro'), 'utf-8');
    expect(content).toContain('TerminalWindow');
    expect(content).toContain('cat stack.json');
    expect(content).toContain('Always learning...');
  });

  it('Interests component covers Robotics, Powerlifting, and Engineering mindset', () => {
    const content = fs.readFileSync(path.resolve('src/components/Interests.astro'), 'utf-8');
    expect(content).toContain('Robotics');
    expect(content).toContain('Powerlifting');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/skills-interests.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement skills.ts, Skills.astro, and Interests.astro**

1. Create `src/data/skills.ts`:
```typescript
export const skillsData = {
  languages: ["Python", "Java", "C", "SQL", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  databases: ["PostgreSQL", "Supabase", "SQLite"],
  tools: ["Git", "Docker", "Linux", "Scikit-learn", "Pandas", "Matplotlib", "JUnit", "Astro"]
};
```

2. Create `src/components/Skills.astro`:
```astro
---
import TerminalWindow from './ui/TerminalWindow.astro';
import { skillsData } from '../data/skills';
---

<section id="skills" class="py-12 sm:py-16 scroll-mt-16">
  <div class="space-y-6">
    <div class="space-y-1">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        Technical Skills
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        Tools, languages, and technologies I work with daily.
      </p>
    </div>

    <TerminalWindow title="ethan@portfolio: ~/skills">
      <div class="space-y-3">
        <div>
          <span class="text-[#27C93F] font-bold">ethan@portfolio</span>:<span class="text-[#4ECDC4]">~/skills</span>$ <span class="text-gray-100">cat stack.json</span>
        </div>

        <pre class="text-xs sm:text-sm leading-relaxed overflow-x-auto text-gray-200">
&#123;
  <span class="text-[#4ECDC4]">"languages"</span>: [
    {skillsData.languages.map((l, i) => (
      <span class="text-[#F4C430]">"{l}"</span> + (i < skillsData.languages.length - 1 ? ', ' : '')
    ))}
  ],
  <span class="text-[#4ECDC4]">"databases"</span>: [
    {skillsData.databases.map((d, i) => (
      <span class="text-[#F4C430]">"{d}"</span> + (i < skillsData.databases.length - 1 ? ', ' : '')
    ))}
  ],
  <span class="text-[#4ECDC4]">"tools"</span>: [
    {skillsData.tools.map((t, i) => (
      <span class="text-[#F4C430]">"{t}"</span> + (i < skillsData.tools.length - 1 ? ', ' : '')
    ))}
  ]
&#125;</pre>

        <div class="pt-2">
          <span class="text-[#27C93F] font-bold">ethan@portfolio</span>:<span class="text-[#4ECDC4]">~/skills</span>$ <span class="text-gray-100">echo "Always learning..."</span>
          <div class="text-[#4ECDC4] mt-1">Always learning...</div>
        </div>
      </div>
    </TerminalWindow>
  </div>
</section>
```

3. Create `src/components/Interests.astro`:
```astro
---
const interests = [
  {
    title: "Robotics & Autonomous Systems",
    icon: "🤖",
    description: "Involved in RoboNotts and F1Tenth competitions, building autonomous miniature racecars that navigate tracks at speed using LiDAR and reactive planning algorithms."
  },
  {
    title: "Competitive Powerlifting",
    icon: "🏋️‍♂️",
    description: "Training with discipline and precision. The habit of methodically logging sessions, refining form, and breaking down plateau barriers carries directly over into engineering problems."
  },
  {
    title: "Systems & Mechanical Craft",
    icon: "⚙️",
    description: "Fascinated by mechanical watches, custom keyboards, and physical hardware where tolerances and deliberate design determine enduring reliability."
  }
];
---

<section id="interests" class="py-12 sm:py-16 scroll-mt-16">
  <div class="space-y-6">
    <div class="space-y-1">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        Interests & Pursuits
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        What keeps me energized outside of everyday software engineering.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {interests.map((item) => (
        <div class="p-5 rounded-lg bg-(--color-bg-surface) border border-(--color-border) flex flex-col justify-between">
          <div class="space-y-2">
            <div class="text-2xl" aria-hidden="true">{item.icon}</div>
            <h3 class="text-base font-semibold text-(--color-text-primary)" style="font-family: var(--font-heading);">
              {item.title}
            </h3>
            <p class="text-sm text-(--color-text-secondary) leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/skills-interests.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit Skills and Interests**

```powershell
git add src/data/skills.ts src/components/Skills.astro src/components/Interests.astro tests/skills-interests.test.ts
git commit -m "feat: implement Skills terminal section and Interests cards"
```

---

### Task 8: Contact Section, Footer & Single-Page Integration

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`
- Create: `src/pages/index.astro`
- Test: `tests/integration.test.ts`

**Interfaces:**
- Produces:
  - `Contact.astro`: Web3Forms form (access key `8d3f53a2-d7a1-44ce-9703-9b5d0c4a44fe`), name, email, message, honeypot botcheck, mailto fallback link.
  - `Footer.astro`: Social links, copyright © 2026 Ethan Villanueva, BadtzMaru component.
  - `src/pages/index.astro`: Main entry page composing all 8 sections inside `BaseLayout`.
- Consumes: All components from Tasks 2-7.

- [ ] **Step 1: Write the failing test for Contact, Footer, and full page integration**

```typescript
// tests/integration.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Contact, Footer, and Index Integration', () => {
  it('Contact component contains Web3Forms access key, botcheck honeypot, and mailto fallback', () => {
    const contact = fs.readFileSync(path.resolve('src/components/Contact.astro'), 'utf-8');
    expect(contact).toContain('8d3f53a2-d7a1-44ce-9703-9b5d0c4a44fe');
    expect(contact).toContain('botcheck');
    expect(contact).toContain('e.villanueva.cs@outlook.com');
  });

  it('Footer includes copyright notice and BadtzMaru component', () => {
    const footer = fs.readFileSync(path.resolve('src/components/Footer.astro'), 'utf-8');
    expect(footer).toContain('Ethan Villanueva');
    expect(footer).toContain('2026');
    expect(footer).toContain('BadtzMaru');
  });

  it('Index page composes all 8 required sections in exact order', () => {
    const index = fs.readFileSync(path.resolve('src/pages/index.astro'), 'utf-8');
    const sections = ['Hero', 'About', 'Experience', 'Projects', 'Skills', 'Interests', 'Contact', 'Footer'];
    let lastIndex = -1;
    sections.forEach((s) => {
      const idx = index.indexOf(`<${s}`);
      expect(idx).toBeGreaterThan(lastIndex);
      lastIndex = idx;
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/integration.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement Contact, Footer, and index.astro**

1. Create `src/components/Contact.astro`:
```astro
---
---

<section id="contact" class="py-12 sm:py-16 scroll-mt-16">
  <div class="space-y-6">
    <div class="space-y-1">
      <h2
        class="text-2xl sm:text-3xl font-bold text-(--color-text-primary)"
        style="font-family: var(--font-heading);"
      >
        Get In Touch
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        Have a question, opportunity, or just want to chat engineering? Drop a message below or email directly.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Web3Forms Form -->
      <div class="lg:col-span-2 p-6 rounded-lg bg-(--color-bg-surface) border border-(--color-border)">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          id="contact-form"
          class="space-y-4"
        >
          <!-- Web3Forms Access Key & Configuration -->
          <input type="hidden" name="access_key" value="8d3f53a2-d7a1-44ce-9703-9b5d0c4a44fe" />
          <input type="hidden" name="subject" value="Portfolio Contact Form Submission" />
          <input type="hidden" name="from_name" value="Portfolio Visitor" />

          <!-- Honeypot Botcheck -->
          <input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                class="w-full px-3 py-2 text-sm rounded-md border border-(--color-border) bg-(--color-bg-primary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:border-transparent transition-colors"
                placeholder="Ada Lovelace"
              />
            </div>

            <div>
              <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-1">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                class="w-full px-3 py-2 text-sm rounded-md border border-(--color-border) bg-(--color-bg-primary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:border-transparent transition-colors"
                placeholder="ada@example.com"
              />
            </div>
          </div>

          <div>
            <label for="message" class="block text-xs font-semibold uppercase tracking-wider text-(--color-text-secondary) mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              class="w-full px-3 py-2 text-sm rounded-md border border-(--color-border) bg-(--color-bg-primary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:border-transparent transition-colors resize-y"
              placeholder="Hi Ethan, let's talk about..."
            ></textarea>
          </div>

          <button
            type="submit"
            id="contact-submit-btn"
            class="px-5 py-2.5 rounded-md bg-(--color-accent) text-white font-medium text-sm hover:bg-(--color-accent-hover) focus:outline-none focus:ring-2 focus:ring-(--color-accent) focus:ring-offset-2 transition-colors cursor-pointer"
          >
            Send Message
          </button>

          <div id="form-result" class="text-sm font-medium hidden"></div>
        </form>
      </div>

      <!-- Direct Contact Info Card -->
      <div class="p-6 rounded-lg bg-(--color-bg-surface) border border-(--color-border) flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <h3 class="text-base font-semibold text-(--color-text-primary)" style="font-family: var(--font-heading);">
            Direct Details
          </h3>
          <p class="text-sm text-(--color-text-secondary)">
            Prefer direct email or messaging? Feel free to reach out anytime:
          </p>
          <div class="pt-2">
            <a
              href="mailto:e.villanueva.cs@outlook.com"
              class="text-sm font-medium text-(--color-accent) hover:underline break-all"
            >
              e.villanueva.cs@outlook.com
            </a>
          </div>
        </div>

        <div class="text-xs text-(--color-text-secondary)">
          Typically responds within 24–48 hours.
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const result = document.getElementById('form-result');
  const submitBtn = document.getElementById('contact-submit-btn') as HTMLButtonElement | null;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!result || !submitBtn) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    result.className = 'text-sm font-medium text-(--color-text-secondary)';
    result.textContent = 'Please wait...';
    result.classList.remove('hidden');

    const formData = new FormData(form);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.status === 200) {
        result.className = 'text-sm font-medium text-green-600 dark:text-green-400';
        result.textContent = 'Thank you! Your message has been sent successfully.';
        form.reset();
      } else {
        result.className = 'text-sm font-medium text-red-600 dark:text-red-400';
        result.textContent = data.message || 'Something went wrong. Please email directly.';
      }
    } catch {
      result.className = 'text-sm font-medium text-red-600 dark:text-red-400';
      result.textContent = 'Error submitting form. Please email e.villanueva.cs@outlook.com.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
</script>
```

2. Create `src/components/Footer.astro`:
```astro
---
import BadtzMaru from './ui/BadtzMaru.astro';
---

<footer class="mt-20 border-t border-(--color-border) py-8 bg-(--color-bg-primary)">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <!-- Social Links -->
    <div class="flex items-center gap-4 text-sm text-(--color-text-secondary)">
      <a href="https://github.com/EthanRVillanueva" target="_blank" rel="noopener noreferrer" class="hover:text-(--color-accent) transition-colors">
        GitHub
      </a>
      <span>·</span>
      <a href="https://linkedin.com/in/ethanrvillanueva" target="_blank" rel="noopener noreferrer" class="hover:text-(--color-accent) transition-colors">
        LinkedIn
      </a>
      <span>·</span>
      <a href="mailto:e.villanueva.cs@outlook.com" class="hover:text-(--color-accent) transition-colors">
        Email
      </a>
      <span>·</span>
      <a href="/ethanvillanueva-cv.pdf" target="_blank" class="hover:text-(--color-accent) transition-colors">
        CV
      </a>
    </div>

    <!-- Copyright & Badtz-Maru -->
    <div class="flex items-center gap-3 text-xs text-(--color-text-secondary)">
      <span>© 2026 Ethan Villanueva. All rights reserved.</span>
      <BadtzMaru size={24} />
    </div>
  </div>
</footer>
```

3. Create `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Skills from '../components/Skills.astro';
import Interests from '../components/Interests.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Header />
  <main id="main-content" class="max-w-5xl mx-auto px-4 sm:px-6">
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Interests />
    <Contact />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test tests/integration.test.ts
```
Expected: PASS.

- [ ] **Step 5: Commit Contact, Footer, and index page**

```powershell
git add src/components/Contact.astro src/components/Footer.astro src/pages/index.astro tests/integration.test.ts
git commit -m "feat: complete Contact form, Footer with BadtzMaru, and assemble single-page index.astro"
```

---

### Task 9: Production Build, Assets Verification & Accessibility Verification

**Files:**
- Test: `tests/production-build.test.ts`
- Modify (if needed): Any configuration or styling adjustments found during verification.

**Interfaces:**
- Produces: Verified `dist/` production output containing `dist/index.html`, `dist/.nojekyll`, `dist/ethanvillanueva-cv.pdf`, optimized CSS/JS.
- Consumes: Complete project codebase.

- [ ] **Step 1: Write the production build verification test**

```typescript
// tests/production-build.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Production Build Output', () => {
  it('build output directory contains index.html, .nojekyll, and CV', () => {
    const distIndex = path.resolve('dist/index.html');
    const distNoJekyll = path.resolve('dist/.nojekyll');
    const distCv = path.resolve('dist/ethanvillanueva-cv.pdf');

    expect(fs.existsSync(distIndex)).toBe(true);
    expect(fs.existsSync(distNoJekyll)).toBe(true);
    expect(fs.existsSync(distCv)).toBe(true);

    const html = fs.readFileSync(distIndex, 'utf-8');
    expect(html).toContain('Ethan Villanueva');
    expect(html).toContain('about_ethan.txt - Notepad');
    expect(html).toContain('8d3f53a2-d7a1-44ce-9703-9b5d0c4a44fe');
  });
});
```

- [ ] **Step 2: Run build and verify test**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd run build; npm.cmd test tests/production-build.test.ts
```
Expected: PASS (`astro build` creates `dist/`, all tests pass).

- [ ] **Step 3: Run the entire test suite**

Run:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; npm.cmd test
```
Expected: All tests pass across the entire suite.

- [ ] **Step 4: Commit build and verification**

```powershell
git add tests/production-build.test.ts
git commit -m "chore: add production build verification test suite and verify build output"
```
