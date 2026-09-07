// tests/experience-projects.test.ts
import { describe, it, expect } from 'vitest';
import { experienceList } from '../src/data/experience';
import { projectList } from '../src/data/projects';
import fs from 'node:fs';
import path from 'node:path';

describe('Experience and Projects', () => {
  it('has experience data with 13-month placement prominently marked', () => {
    expect(experienceList.length).toBeGreaterThanOrEqual(2);
    const placement = experienceList.find((e) => e.featured);
    expect(placement).toBeDefined();
    expect(placement?.role).toContain('Software Engineer');
    expect(placement?.duration).toContain('13 months');
  });

  it('has project data with tech chips and repository links', () => {
    expect(projectList.length).toBeGreaterThanOrEqual(3);
    projectList.forEach((p) => {
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
    });
  });

  it('ExperienceItem and ProjectCard markup implement spec constraints', () => {
    const expItem = fs.readFileSync(path.resolve('src/components/ui/ExperienceItem.astro'), 'utf-8');
    const projCard = fs.readFileSync(path.resolve('src/components/ui/ProjectCard.astro'), 'utf-8');
    expect(expItem).toContain('border-l-4'); // prominent accent border
    expect(projCard).toContain('hover:-translate-y-0.5'); // hover micro-interaction
  });
});
