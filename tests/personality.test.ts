import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Personality Components', () => {
  it('XPWindow uses XP.css structure, provides interactive controls and classic menu dropdowns', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/XPWindow.astro'), 'utf-8');
    expect(content).toContain('title-bar');
    expect(content).toContain('title-bar-text');
    expect(content).toContain('title-bar-controls');
    expect(content).toContain('window-body');
    expect(content).toContain('aria-hidden="true"');
    // Ensure xp.css is imported inside the component style, NOT globally
    expect(content).toContain('xp.css');

    // Interactive window controls
    expect(content).toContain('data-btn-minimize');
    expect(content).toContain('data-btn-maximize');
    expect(content).toContain('data-btn-close');
    expect(content).toContain('aria-label="Minimize"');
    expect(content).toContain('aria-label="Maximize"');
    expect(content).toContain('aria-label="Close"');

    // Menu Bar dropdown triggers
    expect(content).toContain('data-menu-trigger="file"');
    expect(content).toContain('data-menu-trigger="edit"');
    expect(content).toContain('data-menu-trigger="format"');
    expect(content).toContain('data-menu-trigger="view"');
    expect(content).toContain('data-menu-trigger="help"');

    // Menu actions & dialogs
    expect(content).toContain('data-action="save"');
    expect(content).toContain('data-action="copy"');
    expect(content).toContain('data-about-modal');
    expect(content).toContain('data-status-bar');
    expect(content).toContain('data-restore-toast');
  });

  it('TerminalWindow has 3 interactive colored dots, reboot sequence, and JetBrains Mono monospace slot', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/TerminalWindow.astro'), 'utf-8');
    expect(content).toContain('terminal-dot');
    expect(content).toContain('var(--font-mono)');
    expect(content).toContain('aria-hidden="true"');
    expect(content).toContain('<slot />');

    // Interactive dots and handlers
    expect(content).toContain('data-dot-close');
    expect(content).toContain('data-dot-minimize');
    expect(content).toContain('data-dot-maximize');
    expect(content).toContain('data-reboot-overlay');
  });

  it('BadtzMaru is an inline SVG with canonical Sanrio features (4 spikes, rolling pupils, beak, feet)', () => {
    const content = fs.readFileSync(path.resolve('src/components/ui/BadtzMaru.astro'), 'utf-8');
    expect(content).toContain('<svg');
    expect(content).toContain('aria-hidden="true"');
    expect(content).toContain('viewBox');

    // Canonical Sanrio attributes
    expect(content).toContain('data-hair-spikes="4"');
    expect(content).toContain('data-pupil');
    expect(content).toContain('data-beak="yellow"');
    expect(content).toContain('data-tummy="white"');
    expect(content).toContain('data-foot');
  });
});

