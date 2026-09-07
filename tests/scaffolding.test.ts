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
