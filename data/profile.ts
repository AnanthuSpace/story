import type { PortfolioProfile } from "@/types";

export const LINKEDIN_URL = "https://www.linkedin.com/in/your-linkedin";
export const GITHUB_URL = "https://github.com/your-account";

export const profile: PortfolioProfile = {
  name: "Ananthu Mohan",
  role: "Full Stack Developer",
  location: "Alappuzha, Kerala, India",
  email: "ananthumohan368@gmail.com",
  summary:
    "Full Stack Developer with 2+ years of experience building and deploying production web applications with React.js, Next.js, Node.js, NestJS, TypeScript, MongoDB and PostgreSQL, and contributions to 15+ projects. Experienced in REST APIs, JWT/RBAC auth, real-time apps (WebSocket, WebRTC), payment integrations, and AWS deployments with Docker, NGINX and PM2. Works fluently with AI-assisted development tools.",
  education: {
    qualification: "Diploma, Computer Engineering",
    institution: "Government Polytechnic College, Cherthala",
    dates: "2020-2023",
  },
  // phone: "", // Uncomment and add a phone number if you want to display it.
};
