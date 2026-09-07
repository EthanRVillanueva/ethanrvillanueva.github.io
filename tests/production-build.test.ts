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
