"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { ProjectCover } from "@/components/graphics/ProjectCover";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const active = projects.find((project) => project.slug === activeProject);

  const movePreview = (event: MouseEvent<HTMLElement>) => {
    setPointer({ x: event.clientX, y: event.clientY });
  };

  return (
    <section
      className="selected-work section-wrap"
      id="selected-work"
      aria-labelledby="selected-work-title"
    >
      <div className="selected-work__heading">
        <div>
          <SectionLabel number="01" label="Selected Projects" />
          <h2 className="selected-work__title" id="selected-work-title">
            Selected
            <br />
            projects.
          </h2>
        </div>
        <p className="selected-work__note">
          A selection of personal and client projects. 15+ projects contributed
          across work, freelance and personal.
        </p>
      </div>

      <div
        className="project-list"
        onMouseLeave={() => setActiveProject(null)}
        onMouseMove={movePreview}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index + 1}
            onActivate={() => setActiveProject(project.slug)}
            onDeactivate={() => setActiveProject(null)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && !reduceMotion && (
          <motion.div
            className="project-preview"
            initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: pointer.x + 18,
              y: pointer.y + 18,
            }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.65 }}
            aria-hidden="true"
          >
            <ProjectCover className="project-preview__image" project={active} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="selected-work__action">
        <a className="editorial-button" href="/work">
          <span>View all projects</span>
          <ArrowDownRight aria-hidden="true" size={17} />
        </a>
      </div>
    </section>
  );
}
