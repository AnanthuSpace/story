import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    subLabel: "Core languages",
    skills: ["JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Frontend",
    subLabel: "Web interfaces",
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "Redux Toolkit",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    category: "Backend & Real-Time",
    subLabel: "Services & real-time",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
      "WebSocket",
      "Socket.IO",
      "WebRTC",
    ],
  },
  {
    category: "Databases & Caching",
    subLabel: "Data stores",
    skills: ["MongoDB", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    subLabel: "Infrastructure",
    skills: ["AWS EC2", "AWS S3", "Docker", "NGINX", "PM2"],
  },
  {
    category: "Auth & Payments",
    subLabel: "Identity & transactions",
    skills: ["JWT", "RBAC", "Razorpay", "Stripe", "Firebase"],
  },
  {
    category: "Architecture Patterns",
    subLabel: "Application patterns",
    skills: ["Clean Architecture", "Repository Pattern", "MVC"],
  },
  {
    category: "Testing & Tooling",
    subLabel: "Product & development",
    skills: ["Postman", "Git", "GitHub", "VS Code", "Figma", "Sequelize"],
  },
  {
    category: "AI Development Tools",
    subLabel: "AI-assisted development",
    skills: [
      "Claude Code",
      "OpenAI Codex",
      "Cursor",
      "GitHub Copilot",
      "ChatGPT",
      "Antigravity",
    ],
  },
];
