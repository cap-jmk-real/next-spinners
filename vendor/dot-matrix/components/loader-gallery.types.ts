import type { ReactNode } from "react";
import type { LoaderCard } from "@/components/loader-details-drawer";
import type { DotMatrixCommonProps } from "@/loaders";

export type LoaderPreviewOverrideMap = Partial<Record<string, Partial<DotMatrixCommonProps>>>;

export type HeroNavLink = {
  label: string;
  href: string;
};

export type LoaderGalleryHeroContent = {
  title: ReactNode;
  description: ReactNode;
  navLinks: readonly HeroNavLink[];
  installCommand: string;
};

export interface LoaderGalleryProps {
  items: LoaderCard[];
  heroContent?: Partial<LoaderGalleryHeroContent>;
  /** When false, hides hero/navigation/install branding (e.g. embedded gallery capture). @default true */
  showHero?: boolean;
  /**
   * When true, every grid preview animates immediately (skips viewport intersection gate).
   * Use for demos/GIF capture so rows below the fold are not frozen. @default false
   */
  animateAllGridPreviews?: boolean;
  /**
   * When true, each tile shows default + example effect variants (bloom, opacity, layout, theme)
   * in a small multi-panel layout. @default false
   */
  showAllEffectVariantsInGrid?: boolean;
  /** When set, only the first N items are rendered in the grid (order matches registry). */
  maxGridItems?: number;
  cardAnimationEnabled?: boolean;
  detailPreviewScale?: number;
  detailPreviewDotBoost?: number;
  previewPropsOverrides?: LoaderPreviewOverrideMap;
  className?: string;
}
