export type Education = {
  qualification: string;
  institution: string;
  dates: string;
  coursework: string[];
};

export type Certification = {
  number: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  url: string;
};

export type Pillar = {
  number: string;
  title: string;
  description: string;
  technologies: string[];
};

export type PortfolioProfile = {
  name: string;
  role: string;
  tagline: string;
  rotatingRoles: string[];
  availability: string;
  location: string;
  email: string;
  summary: string;
  aboutHeadline: string;
  pillars: Pillar[];
  metadataDescription: string;
  education: Education;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "source";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  projectType: "PERSONAL";
  tags: string[];
  year: string;
  role: string;
  description: string;
  overview: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  liveUrl?: string;
  sourceUrl?: string;
  clientSourceUrl?: string;
  serverSourceUrl?: string;
};

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend & Real-Time"
  | "Databases & Caching"
  | "Cloud & DevOps"
  | "Auth & Payments"
  | "Architecture Patterns"
  | "Testing & Tooling"
  | "AI Development Tools";

export type SkillGroup = {
  category: SkillCategory;
  subLabel: string;
  skills: string[];
};

export type ExperienceRole = {
  title: string;
  company: string;
  dateRange: string;
  sortStart: string;
  type: string;
  summary: string;
  tags: string[];
  concurrent?: boolean;
  clientProjects?: {
    label: string;
    title: string;
    href: string;
    description: string;
  }[];
  keyBullets: [string, string, string];
  additionalBullets: string[];
};

export type Capability = {
  number: string;
  title: string;
  technologies: string[];
};
