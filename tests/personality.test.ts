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
