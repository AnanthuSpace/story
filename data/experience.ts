import type { ExperienceRole } from "@/types";

export const experience: ExperienceRole[] = [
  {
    title: "Full Stack Developer",
    company: "Wisdom Tooth Technologies",
    dateRange: "Oct 2025 - Jun 2026",
    sortStart: "2025-10",
    type: "Full-time",
    summary:
      "Engineered production SaaS and product web applications across frontend, backend and cloud deployment.",
    tags: [
      "React.js",
      "Next.js",
      "NestJS",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Socket.IO",
      "AWS",
      "Docker",
    ],
    concurrent: true,
    keyBullets: [
      "Built production SaaS and product web apps across frontend and backend with React, Next.js, TypeScript, Node.js and NestJS.",
      "Designed scalable NestJS REST services using Clean Architecture.",
      "Implemented JWT authentication and RBAC for multi-role SaaS apps.",
    ],
    additionalBullets: [
      "Built reusable, responsive, SEO-friendly Next.js modules with optimised rendering strategies.",
      "Designed and optimised MongoDB and PostgreSQL schemas and queries.",
      "Built real-time features with WebSocket and Socket.IO.",
      "Added validation, error handling, API integrations and reusable service-layer components.",
      "Deployed with Docker, EC2, S3, NGINX and PM2, including SSL setup.",
      "Owned features end to end using Git and GitHub.",
    ],
  },
  {
    title: "CTO & Partner",
    company: "Veevity Technologies LLP",
    dateRange: "Sep 2025 - Present",
    sortStart: "2026-09",
    type: "Leadership",
    summary:
      "Directing technical architecture, product engineering, and scalable full-stack delivery for web applications and client solutions.",
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
    ],
    keyBullets: [
      "Lead technical planning and architecture for web apps and business software.",
      "Build full-stack apps with Next.js, React, Node.js, NestJS and TypeScript.",
      "Implement REST APIs, authentication, authorization and RBAC.",
    ],
    additionalBullets: [
      "Structure backend services with maintainable patterns on PostgreSQL and MongoDB.",
      "Manage deployment and infrastructure on AWS, Docker, NGINX and PM2.",
    ],
  },
  {
    title: "SDE-1 (MERN)",
    company: "Applore Technologies",
    dateRange: "Jan 2025 - Feb 2025",
    sortStart: "2025-01",
    type: "Full-time",
    summary:
      "Built core backend workflows, APIs and CMS integrations for the JK Tyres e-commerce platform.",
    tags: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "React.js",
      "Next.js",
      "Strapi",
      "REST APIs",
    ],
    keyBullets: [
      "Built backend features for the JK Tyres e-commerce platform using Node, Express, MongoDB and REST.",
      "Implemented endpoints, business logic, validation and integrations.",
      "Integrated React and Next.js frontends with backend APIs.",
    ],
    additionalBullets: [
      "Customised Strapi CMS content models and APIs.",
      "Optimised MongoDB queries and resolved production bugs.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Freelance / Startup Consulting",
    dateRange: "Jan 2024 - Sep 2025",
    sortStart: "2024-01",
    type: "Freelance",
    summary:
      "Delivered end-to-end full-stack web platforms for startups and clients, including TalkToPro.",
    tags: [
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "AWS",
      "NGINX",
    ],
    concurrent: true,
    clientProjects: [
      {
        label: "Client work",
        title: "TalkToPro, Live Mentorship & 1-on-1 Consultations",
        href: "https://www.talktopro.in",
        description:
          "Mentor registration, authentication, onboarding workflows, profile management, administrative features, image cropping and cloud upload pipeline, deployed on AWS with NGINX and PM2.",
      },
    ],
    keyBullets: [
      "Built scalable full-stack apps for startups and clients with React, Next.js, Node, Express, TypeScript and MongoDB.",
      "Key developer on talktopro.in, delivering mentor registration, auth, onboarding, profile management and admin features.",
      "Worked directly with clients from requirements through deployment.",
    ],
    additionalBullets: [
      "Built secure image and file uploads with processing, cropping and cloud storage.",
      "Managed AWS, NGINX, PM2 and Docker deployments.",
    ],
  },
];
