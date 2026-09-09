export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  featured?: boolean;
  bullets: string[];
  tech?: string[];
}

export const experienceList: Experience[] = [
  {
    role: 'Software Engineer Intern',
    company: 'Siemens Digital Industries Software',
    location: 'Milton Keynes, UK',
    duration: 'Jul 2025 – Aug 2026 · 13 months',
    featured: true,
    bullets: [
      'Shipped product features across the full Simcenter FLOMASTER stack: WPF/MVVM UI, C# simulation logic, SQL Server stored procedures, and NuGet packages across seven repositories.',
      'Automated SDK documentation delivery end-to-end: designed Azure DevOps YAML pipelines and PowerShell scripts to migrate legacy CHM help files to browser-based HTML, integrated into continuous-build and installer pipelines.',
      'Traced a critical UI-test VM regression to a SQL Server 2025 incompatibility and restored expected test performance by reconfiguring the affected VM with SQL Server 2022.',
      'Maintained and expanded automated test coverage across unit, integration, regression, and UI test suites, writing tests as part of every feature or fix.',
      'Mentored incoming interns on C#, MVVM, and NuGet; conducted pull request reviews and wrote handover documentation.',
    ],
    tech: [
      'C#',
      '.NET',
      'WPF/MVVM',
      'SQL Server',
      'Azure DevOps',
      'PowerShell',
      'Git',
    ],
  },
  {
    role: 'Back-end Developer',
    company: 'Capital One (University Project)',
    location: 'Remote',
    duration: 'Oct 2024 – May 2025 · 8 months',
    featured: true,
    bullets: [
      'Designed AWS DynamoDB schemas and mock REST APIs to simulate banking transaction and account notification services for a Capital One-sponsored Customer Communication Channel.',
      'Applied GDPR data privacy controls to the system architecture, documenting decisions as formal acceptance criteria.',
      'Collaborated with Capital One engineers across agile sprints, defining user stories, acceptance criteria, and API contracts.',
    ],
    tech: ['Python', 'AWS DynamoDB', 'REST APIs', 'Agile'],
  },
  {
    role: 'Team Member',
    company: 'Next',
    location: 'Brierley Hill, UK',
    duration: 'Jul 2023 – Sep 2023 · 3 months',
    featured: false,
    bullets: [
      "Worked across the Men's and Home departments, managing stock and inventory using ZEBRA devices during peak retail periods.",
    ],
  },
];
