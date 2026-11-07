import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  return (
    <button className={cn("editorial-button", className)} {...props}>
      <span>{children}</span>
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps) {
  return (
    <a className={cn("editorial-button", className)} {...props}>
      <span>{children}</span>
    </a>
  );
}
