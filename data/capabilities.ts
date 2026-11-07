import type { Capability } from "@/types";

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Full-stack web apps",
    technologies: ["Next.js", "React", "NestJS", "Node"],
  },
  {
    number: "02",
    title: "APIs and auth",
    technologies: ["REST", "JWT", "RBAC", "Clean Architecture"],
  },
  {
    number: "03",
    title: "Real-time systems",
    technologies: ["WebSocket", "Socket.IO", "WebRTC"],
  },
  {
    number: "04",
    title: "Payments and integrations",
    technologies: ["Stripe", "Razorpay", "Firebase", "EmailJS"],
  },
  {
    number: "05",
    title: "Cloud and deployment",
    technologies: ["AWS EC2/S3", "Docker", "NGINX", "PM2", "SSL"],
  },
];
