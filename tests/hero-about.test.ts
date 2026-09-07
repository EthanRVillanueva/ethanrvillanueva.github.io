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
