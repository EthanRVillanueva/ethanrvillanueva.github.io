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
    role: "Software Engineer Intern",
    company: "Industry Placement",
    location: "United Kingdom",
    duration: "July 2024 – August 2025 (13 months)",
    featured: true,
    bullets: [
      "Engineered backend microservices and internal REST APIs in Python and Java, increasing throughput and system reliability across production environments.",
      "Spearheaded database query optimization and schema migrations for PostgreSQL databases, reducing latency on critical reporting endpoints by 35%.",
      "Collaborated in an Agile team with CI/CD automation, comprehensive JUnit unit testing, and structured code reviews."
    ],
    tech: ["Python", "Java", "PostgreSQL", "Docker", "Git", "CI/CD"]
  },
  {
    role: "Customer Assistant",
    company: "Next",
    location: "Nottingham, UK",
    duration: "2023 – 2024",
    featured: false,
    bullets: [
      "Delivered high-standard customer service on the sales floor while managing inventory replenishment during peak retail operations.",
      "Demonstrated reliable time management and teamwork balancing full-time academic studies with weekend shifts."
    ]
  },
  {
    role: "Crew Member",
    company: "Five Guys",
    location: "Nottingham, UK",
    duration: "2022 – 2023",
    featured: false,
    bullets: [
      "Maintained rapid service speeds and stringent food safety protocols in a fast-paced, high-pressure kitchen environment."
    ]
  }
];
