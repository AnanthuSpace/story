import type { PortfolioProfile } from "@/types";
import { education } from "@/data/education";

export { GITHUB_URL, LINKEDIN_URL } from "@/data/links";

export const profile: PortfolioProfile = {
  name: "Ananthu Mohan",
  role: "Full Stack Developer & Technical Architect",
  tagline: "Full Stack Developer & Technical Architect",
  rotatingRoles: [
    "Full Stack Developer",
    "Chief Technology Officer (CTO)",
    "Next.js & NestJS Specialist",
    "Real-time Systems Builder",
    "Cloud & DevOps Engineer",
  ],
  availability: "Available for roles & technical consulting",
  location: "Alappuzha, Kerala",
  email: "ananthumohan368@gmail.com",
  summary:
    "Full Stack Developer with 2+ years of hands-on experience building and deploying production web applications using React.js, Next.js, Node.js, NestJS, TypeScript, MongoDB, and PostgreSQL. Experienced in developing RESTful APIs, authentication and RBAC systems, real-time applications using WebSocket and WebRTC, payment integrations, and AWS-based deployments. Strong experience with Docker, NGINX, Git, and AI-assisted software development.",
  aboutHeadline:
    "Engineering resilient, high-speed full-stack applications with modern architecture",
  pillars: [
    {
      number: "01",
      title: "Clean Architecture & Scaling",
      description:
        "Designing enterprise backends using NestJS, Node.js, Repository Pattern, MVC, and robust domain boundary separation.",
      technologies: [
        "NestJS",
        "Node.js",
        "Repository Pattern",
        "MVC",
      ],
    },
    {
      number: "02",
      title: "Real-time & Interactive UX",
      description:
        "Engineering peer-to-peer video streaming and real-time collaboration with WebRTC and Socket.IO, paired with React 19 and Framer Motion.",
      technologies: ["WebRTC", "Socket.IO", "React 19", "Framer Motion"],
    },
    {
      number: "03",
      title: "Cloud Deployment & Production Ops",
      description:
        "Deploying and managing production systems on AWS EC2 and S3, Docker containerization, NGINX reverse proxies, and PM2 process management.",
      technologies: ["AWS EC2", "AWS S3", "Docker", "NGINX", "PM2"],
    },
    {
      number: "04",
      title: "AI-Augmented Velocity",
      description:
        "Integrating AI-assisted engineering with Claude Code, OpenAI Codex, Cursor, and Antigravity to accelerate delivery without sacrificing quality.",
      technologies: [
        "Claude Code",
        "OpenAI Codex",
        "Cursor",
        "Antigravity",
      ],
    },
  ],
  metadataDescription:
    "Ananthu Mohan — Full Stack Developer & Technical Architect in Alappuzha, Kerala, with 2+ years of experience and 15+ projects contributed to. Explore Personal Projects and experience.",
  education,
};
