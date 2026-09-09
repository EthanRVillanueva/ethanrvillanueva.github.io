import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Anti-Vibecoded & Design Standards Verification', () => {
  it('does NOT contain generic colored left-border card tropes across projects or interests', () => {
    const files = [
      'src/components/ui/ProjectCard.astro',
      'src/components/Interests.astro',
    ];
    for (const f of files) {
      const src = fs.readFileSync(path.resolve(f), 'utf-8');
      expect(src).not.toMatch(/border-l-4\s+border-l-/);
    }
  });

  it('does NOT contain generic 3-icon-box grid in Interests', () => {
    const interests = fs.readFileSync(path.resolve('src/components/Interests.astro'), 'utf-8');
    expect(interests).not.toContain('grid-cols-3');
    // Ensure headings do NOT contain emojis
    expect(interests).not.toMatch(/<h[1-3][^>]*>[^<]*[\u{1F300}-\u{1F9FF}]/u);
  });

  it('does NOT have purple-to-blue gradients', () => {
    const css = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');
    const hero = fs.readFileSync(path.resolve('src/components/Hero.astro'), 'utf-8');
    expect(css).not.toContain('from-purple');
    expect(hero).not.toContain('from-purple');
  });

  it('does NOT use scroll fade-in animations on sections', () => {
    const css = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');
    expect(css).not.toContain('.reveal-on-scroll');
  });

  it('does NOT contain em-dashes excessively across copy', () => {
    const components = fs.readdirSync(path.resolve('src/components'))
      .filter(f => f.endsWith('.astro'))
      .map(f => fs.readFileSync(path.resolve('src/components', f), 'utf-8'))
      .join('\n');
    const emDashCount = (components.match(/—/g) || []).length;
    expect(emDashCount).toBeLessThanOrEqual(2);
  });

  it('provides high contrast dark mode tokens in global.css', () => {
    const css = fs.readFileSync(path.resolve('src/styles/global.css'), 'utf-8');
    expect(css).toContain('--color-bg-primary: #121614');
    expect(css).toContain('--color-text-primary: #E8EBE9');
    expect(css).toContain('--color-accent: #34D399');
  });
});
