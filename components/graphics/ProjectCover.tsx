import type { ReactNode, SVGProps } from "react";
import type { Project } from "@/types";

type ProjectCoverProps = SVGProps<SVGSVGElement> & {
  project: Pick<Project, "slug" | "title">;
};

function ParadoxComposition() {
  return (
    <>
      <rect width="720" height="580" fill="var(--burgundy)" />
      <g fill="var(--cream)" fillOpacity="0.9">
        {Array.from({ length: 49 }, (_, index) => {
          const x = 68 + (index % 7) * 34;
          const y = 68 + Math.floor(index / 7) * 34;
          return <circle key={index} cx={x} cy={y} r="2" />;
        })}
      </g>
      <circle cx="430" cy="285" r="188" fill="var(--cream)" />
      <circle
        cx="430"
        cy="285"
        r="140"
        fill="none"
        stroke="var(--burgundy)"
        strokeWidth="2"
      />
      <circle
        cx="430"
        cy="285"
        r="82"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="18"
      />
      <path d="M327 379 430 153l103 226" fill="none" stroke="var(--burgundy)" strokeWidth="8" />
    </>
  );
}

function FitFusionComposition() {
  return (
    <>
      <rect width="720" height="580" fill="var(--sage)" />
      <path d="M0 414h120v-52h96v-52h96v-52h96v-52h96v-52h96v-52h120v478H0Z" fill="var(--burgundy)" />
      <path
        d="M90 364c38-132 88-198 150-198s112 66 150 198 88 198 150 198"
        fill="none"
        stroke="var(--cream)"
        strokeWidth="4"
      />
      <circle cx="240" cy="166" r="14" fill="var(--cream)" />
      <circle cx="540" cy="562" r="14" fill="var(--cream)" />
      <path d="M360 58v464M82 290h556" stroke="var(--cream)" strokeOpacity="0.4" />
    </>
  );
}

function VuePixComposition() {
  const heights = [96, 142, 116, 218, 172, 282, 230, 354, 302, 196, 252, 128];

  return (
    <>
      <rect width="720" height="580" fill="var(--cream)" />
      <path d="M0 90h720M0 290h720M0 490h720" stroke="var(--sage)" strokeWidth="1" />
      <path d="M70 0v580M360 0v580M650 0v580" stroke="var(--sage)" strokeWidth="1" />
      <g fill="var(--burgundy)">
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
        stroke="var(--burgundy)"
        strokeWidth="4"
      />
      <circle cx="544" cy="132" r="9" fill="var(--sage)" />
    </>
  );
}

function TalkToProComposition() {
  return (
    <>
      <rect width="720" height="580" fill="var(--burgundy)" />
      <path
        d="M0 486c110-98 220-98 330 0s220 98 390 0"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="2"
      />
      <path
        d="M0 520c110-98 220-98 330 0s220 98 390 0"
        fill="none"
        stroke="var(--sage)"
        strokeOpacity="0.55"
      />
      <circle cx="360" cy="250" r="172" fill="var(--cream)" />
      <circle
        cx="360"
        cy="250"
        r="130"
        fill="none"
        stroke="var(--burgundy)"
        strokeWidth="2"
      />
      <circle
        cx="360"
        cy="250"
        r="88"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="18"
      />
      <path d="M188 250h344M360 78v344" stroke="var(--burgundy)" strokeOpacity="0.55" />
      <circle cx="360" cy="250" r="7" fill="var(--burgundy)" />
    </>
  );
}

const compositions: Record<Project["slug"], () => ReactNode> = {
  "paradox-esports": ParadoxComposition,
  fitfusion: FitFusionComposition,
  vuepix: VuePixComposition,
  talktopro: TalkToProComposition,
};

export function ProjectCover({ project, ...props }: ProjectCoverProps) {
  const Composition = compositions[project.slug] ?? TalkToProComposition;

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
