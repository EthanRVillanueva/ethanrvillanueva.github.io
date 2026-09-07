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
