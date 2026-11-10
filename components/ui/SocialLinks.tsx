import { Mail } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import {
  EMAIL_ADDRESS,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SHOW_INSTAGRAM,
} from "@/data/links";

const links = [
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    icon: FaLinkedinIn,
    external: true,
  },
  ...(SHOW_INSTAGRAM
    ? [
        {
          label: "Instagram",
          href: INSTAGRAM_URL,
          icon: FaInstagram,
          external: true,
        },
      ]
    : []),
  {
    label: "Email",
    href: `mailto:${EMAIL_ADDRESS}`,
    icon: Mail,
    external: false,
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {links.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          <Icon className="social-link__icon" aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}
