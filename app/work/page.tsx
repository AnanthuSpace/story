import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/graphics/ProjectCover";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/projects";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Personal Projects — Ananthu Mohan",
  description:
    "A few personal builds by Ananthu Mohan, alongside contributions to 15+ projects across work, freelance and personal.",
};

export default function WorkIndexPage() {
  return (
    <main className={styles.page} id="main">
      <header className={styles.header}>
        <SectionLabel number="01" label="Project index" />
        <h1 className={styles.title}>
          Personal
          <br />
          projects.
        </h1>
        <p className={styles.intro}>
          A few personal builds. 15+ projects contributed across work,
          freelance and personal.
        </p>
      </header>
      <div className={styles.list}>
        {projects.map((project, index) => (
          <Link className={styles.project} href={`/work/${project.slug}`} key={project.slug}>
            <span className={`${styles.number} eyebrow`}>0{index + 1}</span>
            <div className={styles.cover}>
              <ProjectCover project={project} />
            </div>
            <div className={styles.details}>
              <h2>{project.title}</h2>
              <p className={styles.subtitle}>{project.subtitle}</p>
              <p>{project.description}</p>
              <div className={styles.chips}>
                <span className={`${styles.chip} eyebrow`}>{project.category}</span>
                <span className={`${styles.chip} eyebrow`}>{project.projectType}</span>
              </div>
            </div>
            <span className={`${styles.year} eyebrow`}>
              {project.year === "TBD" ? "—" : project.year}
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
