import type { SVGProps } from "react";

export function Crosshair(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 2v20M2 12h20"
        stroke="var(--burgundy)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="var(--burgundy)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
