export type Education = {
  qualification: string;
  institution: string;
  dates: string;
};

export type PortfolioProfile = {
  name: string;
  role: string;
  location: string;
  email: string;
  summary: string;
  education: Education;
  phone?: string;
};

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  year: string;
  role: string;
  description: string;
  overview: string;
  stack: string[];
  features: string[];
  liveUrl?: string;
  sourceUrl?: string;
  clientSourceUrl?: string;
  serverSourceUrl?: string;
};

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Cloud & DevOps"
  | "Auth & Payments"
  | "Architecture"
  | "Tools"
  | "AI Dev Tools";

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
  keyBullets: [string, string, string];
  additionalBullets: string[];
};

export type Capability = {
  number: string;
  title: string;
  technologies: string[];
};
