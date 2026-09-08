import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Portfolio Refinements & 20-Point Checklist', () => {
  it('has green accent tokens and dark background defined in global.css', () => {
    const css = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');
    expect(css).toContain('#15803D'); // emerald green light accent
    expect(css).toContain('#34D399'); // vibrant mint/emerald dark accent
    expect(css).toContain('#121614'); // obsidian dark background
  });

  it('Hero section includes headshot image and visible dark mode buttons', () => {
    const hero = fs.readFileSync(path.resolve('src/components/Hero.astro'), 'utf-8');
    expect(hero.includes('avatar-placeholder.svg') || hero.includes('pfp_square.jpg')).toBe(true);
    expect(hero).toContain('Get In Touch');
    expect(hero).toContain('text-(--color-text-primary)'); // ensures button text is visible in dark mode
  });

  it('XPWindow preserves authentic Luna styling and features 30px title bar with spring drag', () => {
    const xp = fs.readFileSync(path.resolve('src/components/ui/XPWindow.astro'), 'utf-8');
    expect(xp).toContain('data-draggable-window');
    expect(xp).toContain('data-drag-handle');
    expect(xp).toContain('min-height: 30px'); // authentic XP Luna proportions
    expect(xp).toContain('cubic-bezier'); // spring snap-back
    // Ensure dark mode overrides do NOT darken the classic Luna title bar or outer window frame
    expect(xp).not.toContain(':global(.dark) .xp-wrapper .title-bar');
    expect(xp).not.toContain(':global(.dark) .xp-wrapper .window');
  });

  it('TerminalWindow features spring drag interaction', () => {
    const term = fs.readFileSync(path.resolve('src/components/ui/TerminalWindow.astro'), 'utf-8');
    expect(term).toContain('data-draggable-terminal');
    expect(term).toContain('data-drag-handle');
    expect(term).toContain('cubic-bezier');
  });

  it('Skills section displays compact Ethan\'s Skills ASCII banner and updated emerald theme', () => {
    const skills = fs.readFileSync(path.resolve('src/components/Skills.astro'), 'utf-8');
    expect(skills).toContain('motd.sh');
    expect(skills).toContain('| __| |_| |_'); // "Ethan" ASCII fragment
    expect(skills).toContain('/ ___|| |__ (_) | |___'); // "Skills" ASCII fragment
    expect(skills).toContain('#34D399'); // emerald accent
  });

  it('About section includes Badtz-Maru mascot companion', () => {
    const about = fs.readFileSync(path.resolve('src/components/About.astro'), 'utf-8');
    expect(about).toContain('BadtzMaru');
  });

  it('Production pages exist: 404, Privacy Policy, and Terms & Conditions', () => {
    expect(fs.existsSync(path.resolve('src/pages/404.astro'))).toBe(true);
    expect(fs.existsSync(path.resolve('src/pages/privacy.astro'))).toBe(true);
    expect(fs.existsSync(path.resolve('src/pages/terms.astro'))).toBe(true);

    const footer = fs.readFileSync(path.resolve('src/components/Footer.astro'), 'utf-8');
    expect(footer).toContain('/privacy');
    expect(footer).toContain('/terms');
  });

  it('SEO and metadata assets exist: sitemap.xml, robots.txt, og-image.svg, and BaseLayout meta tags', () => {
    expect(fs.existsSync(path.resolve('public/robots.txt'))).toBe(true);
    expect(fs.existsSync(path.resolve('public/sitemap.xml'))).toBe(true);
    expect(fs.existsSync(path.resolve('public/og-image.svg'))).toBe(true);

    const baseLayout = fs.readFileSync(path.resolve('src/layouts/BaseLayout.astro'), 'utf-8');
    expect(baseLayout).toContain('og:image');
    expect(baseLayout).toContain('twitter:card');
    expect(baseLayout).toContain('canonical');
  });

  it('Contact form includes constraint validation attributes', () => {
    const contact = fs.readFileSync(path.resolve('src/components/Contact.astro'), 'utf-8');
    expect(contact).toContain('minlength="2"');
    expect(contact).toContain('minlength="10"');
    expect(contact).toContain('botcheck');
  });
});
