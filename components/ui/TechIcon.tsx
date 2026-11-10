import { Code2 } from "lucide-react";
import { techIcons } from "@/data/techIcons";

export function TechIcon({
  name,
  size = 18,
}: {
  name: string;
  size?: number;
}) {
  const Icon = techIcons[name] ?? Code2;

  return <Icon size={size} aria-hidden="true" />;
}
