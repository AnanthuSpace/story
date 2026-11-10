import type { ReactNode, SVGProps } from "react";
import type { Project } from "@/types";

type ProjectCoverProps = SVGProps<SVGSVGElement> & {
  project: Pick<Project, "slug" | "title">;
};

function ParadoxComposition() {
  return (
    <>
      <rect width="720" height="580" fill="var(--ink)" />
      <g fill="var(--paper)" fillOpacity="0.6">
        {Array.from({ length: 49 }, (_, index) => {
          const x = 68 + (index % 7) * 34;
          const y = 68 + Math.floor(index / 7) * 34;
          return <circle key={index} cx={x} cy={y} r="2" />;
        })}
      </g>
      <circle cx="430" cy="285" r="188" fill="var(--paper)" />
      <circle
        cx="430"
        cy="285"
        r="140"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <circle
        cx="430"
        cy="285"
        r="82"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="18"
      />
      <path d="M327 379 430 153l103 226" fill="none" stroke="var(--ink)" strokeWidth="8" />
    </>
  );
}

function FitFusionComposition() {
  return (
    <>
      <rect width="720" height="580" fill="var(--ice-dark)" />
      <path d="M0 414h120v-52h96v-52h96v-52h96v-52h96v-52h96v-52h120v478H0Z" fill="var(--ink)" />
      <path
        d="M90 364c38-132 88-198 150-198s112 66 150 198 88 198 150 198"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="4"
      />
      <circle cx="240" cy="166" r="14" fill="var(--accent)" />
      <circle cx="540" cy="562" r="14" fill="var(--paper)" />
      <path d="M360 58v464M82 290h556" stroke="var(--paper-60)" />
    </>
  );
}

function VuePixComposition() {
  const heights = [96, 142, 116, 218, 172, 282, 230, 354, 302, 196, 252, 128];

  return (
    <>
      <rect width="720" height="580" fill="var(--paper)" />
      <path d="M0 90h720M0 290h720M0 490h720" stroke="var(--ice-dark)" strokeWidth="1" />
      <path d="M70 0v580M360 0v580M650 0v580" stroke="var(--ice-dark)" strokeWidth="1" />
      <g fill="var(--ink)">
        {heights.map((height, index) => (
          <rect
            key={index}
            x={80 + index * 47}
            y={500 - height}
            width="25"
            height={height}
          />
        ))}
      </g>
      <path
        d="M78 400 167 330l89 52 100-166 94 48 94-132"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
      />
      <circle cx="544" cy="132" r="9" fill="var(--ice-dark)" />
    </>
  );
}

const compositions: Partial<Record<Project["slug"], () => ReactNode>> = {
  "paradox-esports": ParadoxComposition,
  fitfusion: FitFusionComposition,
  vuepix: VuePixComposition,
};

export function ProjectCover({ project, ...props }: ProjectCoverProps) {
  const Composition = compositions[project.slug] ?? ParadoxComposition;

  return (
    <svg
      viewBox="0 0 720 580"
      role="img"
      aria-label={`${project.title} generative graphic`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Composition />
    </svg>
  );
}
