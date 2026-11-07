import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/graphics/ProjectCover";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
  onActivate: () => void;
  onDeactivate: () => void;
};

export function ProjectCard({
  project,
  index,
  onActivate,
  onDeactivate,
}: ProjectCardProps) {
  return (
    <a
      className="project-row"
      href={`/work/${project.slug}`}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      aria-label={`${project.title}: ${project.description}`}
    >
      <span className="eyebrow project-row__index">0{index}</span>
      <h3 className="project-row__name">{project.title}</h3>
      <span className="eyebrow project-row__tags">{project.tags.join(" · ")}</span>
      <span className="project-row__cover" aria-hidden="true">
        <ProjectCover project={project} />
      </span>
      <span className="eyebrow project-row__year">
        {project.year === "TBD" ? "—" : project.year}
        <ArrowUpRight aria-hidden="true" size={15} />
      </span>
    </a>
  );
}
