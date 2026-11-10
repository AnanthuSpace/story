import type { ComponentType } from "react";
import {
  Activity,
  Cloud,
  Layers,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiCursor,
  SiDocker,
  SiFramer,
  SiNginx,
  SiNodedotjs,
  SiReact,
  SiSocketdotio,
  SiWebrtc,
  SiNestjs,
} from "react-icons/si";

type TechIconComponent = IconType | ComponentType<{ size?: number }>;

export const techIcons: Record<string, TechIconComponent> = {
  "NestJS": SiNestjs,
  "Node.js": SiNodedotjs,
  "Repository Pattern": Layers,
  MVC: PanelsTopLeft,
  WebRTC: SiWebrtc,
  "Socket.IO": SiSocketdotio,
  "React 19": SiReact,
  "Framer Motion": SiFramer,
  "AWS EC2": Cloud,
  "AWS S3": Cloud,
  Docker: SiDocker,
  NGINX: SiNginx,
  PM2: Activity,
  "Claude Code": SiClaude,
  "OpenAI Codex": Sparkles,
  Cursor: SiCursor,
  Antigravity: Sparkles,
};
