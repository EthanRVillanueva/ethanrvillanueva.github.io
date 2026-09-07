import { describe, it, expect } from 'vitest';
import { skillsData } from '../src/data/skills';
import fs from 'node:fs';
import path from 'node:path';

describe('Skills and Interests Sections', () => {
  it('skillsData contains languages, databases, and tools categories', () => {
    expect(skillsData.languages).toContain('Python');
    expect(skillsData.languages).toContain('Java');
    expect(skillsData.databases).toContain('PostgreSQL');
    expect(skillsData.tools).toContain('Git');
  });

  it('Skills component displays terminal prompt and echo message', () => {
    const content = fs.readFileSync(path.resolve('src/components/Skills.astro'), 'utf-8');
    expect(content).toContain('TerminalWindow');
    expect(content).toContain('cat stack.json');
    expect(content).toContain('Always learning...');
  });

  it('Interests component covers Robotics, Powerlifting, and Systems/Mechanical craft', () => {
    const content = fs.readFileSync(path.resolve('src/components/Interests.astro'), 'utf-8');
    expect(content).toContain('Robotics');
    expect(content).toContain('Powerlifting');
  });
});
