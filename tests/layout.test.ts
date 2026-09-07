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
    expect(css).toContain('#15803D'); // light accent
    expect(css).toContain('#34D399'); // dark accent
    expect(css).toContain('#FAFAF8'); // light bg
    expect(css).toContain('#121614'); // dark bg
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
