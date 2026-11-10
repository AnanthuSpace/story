import type { SVGProps } from "react";

type ArcCompositionProps = SVGProps<SVGSVGElement> & {
  count?: number;
};

export function ArcComposition({ count = 7, ...props }: ArcCompositionProps) {
  const arcs = Array.from({ length: count }, (_, index) => {
    const radius = 72 + index * 36;
    return (
      <circle
        key={index}
        cx="360"
        cy="290"
        r={radius}
        fill="none"
        stroke="var(--ink-60)"
        strokeWidth="1"
      />
    );
  });

  return (
    <svg
      viewBox="0 0 720 580"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {arcs}
      <path
        d="M360 0v580M0 290h720"
        stroke="var(--ink-10)"
        strokeWidth="1"
      />
      <circle cx="360" cy="290" r="4" fill="var(--accent)" />
    </svg>
  );
}
