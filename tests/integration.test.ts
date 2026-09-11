// tests/integration.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Contact, Footer, and Index Integration', () => {
  it('Contact component contains Web3Forms access key, botcheck honeypot, and mailto fallback', () => {
    const contact = fs.readFileSync(path.resolve('src/components/Contact.astro'), 'utf-8');
    expect(contact).toContain('c4d5b33c-f364-49e4-8f3f-391c22180388');
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
