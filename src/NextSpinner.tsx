import type { HTMLAttributes, ReactNode } from "react";

export type NextSpinnerVariant = "ring" | "dots" | "bars";

export type NextSpinnerSize = "sm" | "md" | "lg";

export interface NextSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style. */
  variant?: NextSpinnerVariant;
  /** Overall scale. */
  size?: NextSpinnerSize;
  /**
   * Accessible name. Rendered as `aria-label` on the status region.
   * @defaultValue "Loading"
   */
  label?: string;
  /** Optional caption shown next to the spinner (not hidden). */
  children?: ReactNode;
}

const sizeClass: Record<NextSpinnerSize, string> = {
  sm: "nsk--sm",
  md: "nsk--md",
  lg: "nsk--lg",
};

/**
 * Loading indicator for Next.js / React. Works in Server Components (no `"use client"`).
 * Import styles once: `import "next-spinners/next-spinner.css"`.
 */
export function NextSpinner({
  variant = "ring",
  size = "md",
  label = "Loading",
  className = "",
  children,
  role = "status",
  ...rest
}: NextSpinnerProps) {
  const rootClass = ["nsk", `nsk--${variant}`, sizeClass[size], className]
    .filter(Boolean)
    .join(" ");

  let indicator: ReactNode;
  if (variant === "ring") {
    indicator = <span className="nsk__ring" aria-hidden />;
  } else if (variant === "dots") {
    indicator = (
      <>
        <span className="nsk__dot" aria-hidden />
        <span className="nsk__dot" aria-hidden />
        <span className="nsk__dot" aria-hidden />
      </>
    );
  } else {
    indicator = (
      <>
        <span className="nsk__bar" aria-hidden />
        <span className="nsk__bar" aria-hidden />
        <span className="nsk__bar" aria-hidden />
      </>
    );
  }

  return (
    <div
      className={rootClass}
      role={role}
      aria-live="polite"
      aria-label={label}
      {...rest}
    >
      {indicator}
      {children ? <span className="nsk__label">{children}</span> : null}
    </div>
  );
}
