import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { CodeFragment } from "@/components/graphics/CodeFragment";
import { ProjectCover } from "@/components/graphics/ProjectCover";
import { RED_INTENSITY } from "@/data/theme";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import styles from "./case-study.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Project not found — Ananthu Mohan" };
  }

  return {
    title: `${project.title} — Ananthu Mohan`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Ananthu Mohan`,
      description: project.description,
      type: "article",
    },
  };
}

function ProjectLinks({ project }: { project: Project }) {
  const links = project.links;

  if (links.length === 0) {
    return <span className={styles.metaValue}>Links to be added</span>;
  }

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <a
          href={link.href}
          key={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.kind === "source" ? (
            <FaGithub size={15} aria-hidden="true" />
          ) : (
            <ExternalLink size={14} aria-hidden="true" />
          )}
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((entry) => entry.slug === slug);
  if (projectIndex < 0) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className={styles.page} id="main">
      <header className={styles.header}>
        <span className="eyebrow">Project / 0{projectIndex + 1}</span>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.lede}>{project.description}</p>
      </header>

      <div className={styles.cover}>
        <ProjectCover project={project} />
        <span className={`${styles.figure} eyebrow`}>FIG. 0{projectIndex + 1}</span>
        <span className={`${styles.dimension} eyebrow`}>← 1440 →</span>
      </div>

      <section className={styles.metaGrid} aria-label="Project details">
        <div className={styles.metaItem}>
          <span className="eyebrow">Role</span>
          <span className={styles.metaValue}>{project.role}</span>
        </div>
        <div className={styles.metaItem}>
          <span className="eyebrow">Category</span>
          <span className={`${styles.category} eyebrow`}>{project.category}</span>
        </div>
        <div className={styles.metaItem}>
          <span className="eyebrow">Type</span>
          <span className={`${styles.category} eyebrow`}>{project.projectType}</span>
        </div>
        <div className={styles.metaItem}>
          <span className="eyebrow">Year</span>
          <span className={styles.metaValue}>
            {project.year === "TBD" ? "To be confirmed" : project.year}
          </span>
        </div>
        <div className={styles.metaItem}>
          <span className="eyebrow">Stack</span>
          <span className={styles.metaValue}>{project.stack.slice(0, 5).join(" · ")}</span>
        </div>
        <div className={styles.metaItem}>
          <span className="eyebrow">Links</span>
          <ProjectLinks project={project} />
        </div>
      </section>

      <section className={styles.overview} aria-labelledby="overview-title">
        <div>
          <span className="eyebrow">01 — Overview</span>
          <h2 id="overview-title">The idea, made useful.</h2>
        </div>
        <p>{project.overview}</p>
      </section>

      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.sectionHeading}>
          <span className="eyebrow">02 — Product details</span>
          <h2 id="features-title">Key features</h2>
        </div>
        <ol>
          {project.features.map((feature, index) => (
            <li key={feature}>
              <span className={`${styles.featureIndex} eyebrow`}>0{index + 1}</span>
              <p>{feature}</p>
              <span className={styles.featureBullet} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <div>
          <span className="eyebrow">03 — Implementation</span>
          <h2 id="technology-title">Technologies</h2>
          <div className={styles.tags}>
            {project.stack.length ? (
              project.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))
            ) : (
              <span>Details to be added</span>
            )}
          </div>
        </div>
        <CodeFragment
          className={styles.code}
          lines={[
            `const project = "${project.slug}";`,
            "const build = async () => {",
            "  return ship(product);",
            "};",
          ]}
        />
      </section>

      <Link
        className={styles.nextProject}
        href={`/work/${nextProject.slug}`}
        data-cursor-surface={RED_INTENSITY === "bold" ? "red" : undefined}
      >
        <ProjectCover className={styles.nextCover} project={nextProject} />
        <span className={`${styles.nextLabel} eyebrow`}>Next project</span>
        <span className={styles.nextTitle}>{nextProject.title}</span>
        <ArrowUpRight className={styles.nextArrow} size={28} aria-hidden="true" />
      </Link>
    </main>
  );
}
