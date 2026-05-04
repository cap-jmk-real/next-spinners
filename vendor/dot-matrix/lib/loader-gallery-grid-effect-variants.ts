import type { ExamplePreviewId } from "@/components/loader-details-drawer";
import type { LoaderPreviewOverrideMap } from "@/components/loader-gallery.types";
import {
  LOADER_GALLERY_EXAMPLE_SNIPPET_PROPS,
  LOADER_GALLERY_EX_OPACITY_FOR_TRIANGLE
} from "@/components/loader-gallery-example-props";
import { LOADER_GALLERY_PREVIEW_PROPS } from "@/lib/loader-gallery-preview-props";
import type { DotMatrixCommonProps } from "@/loaders";

export type GridEffectVariant = {
  key: string;
  label: string;
  props: DotMatrixCommonProps;
};

const EFFECT_LABELS: Record<ExamplePreviewId, string> = {
  "ex-bloom": "Bloom",
  "ex-opacity": "Opacity",
  "ex-layout": "Layout",
  "ex-look": "Theme"
};

const ALL_EXAMPLE_IDS: ExamplePreviewId[] = ["ex-bloom", "ex-opacity", "ex-layout", "ex-look"];

/** Smaller than single-tile preview so several variants fit in one card. */
const MINI_SCALE = 0.42;

function resolveBase(slug: string, overrides?: LoaderPreviewOverrideMap): DotMatrixCommonProps {
  const base =
    LOADER_GALLERY_PREVIEW_PROPS[slug] ?? LOADER_GALLERY_PREVIEW_PROPS["dotm-square-1"];
  const override = overrides?.[slug];
  return override ? { ...base, ...override } : base;
}

function applyMiniGeometry(baseSize: number, baseDot: number, merged: DotMatrixCommonProps): void {
  merged.size = Math.max(12, Math.round(baseSize * MINI_SCALE));
  merged.dotSize = Math.max(2, Math.round(baseDot * MINI_SCALE));
  if (merged.boxSize != null && Number.isFinite(merged.boxSize)) {
    merged.boxSize = Math.max(28, Math.round(merged.boxSize * MINI_SCALE));
  }
  if (merged.minSize != null && Number.isFinite(merged.minSize)) {
    merged.minSize = Math.max(24, Math.round(merged.minSize * MINI_SCALE));
  }
}

/**
 * Default gallery preview + each drawer “Example usage” variant (bloom, opacity, layout, theme),
 * scaled to fit many previews in one grid tile. Matches merge rules in `LoaderGallery` detail preview.
 */
export function buildGridEffectVariants(
  slug: string,
  overrides?: LoaderPreviewOverrideMap
): GridEffectVariant[] {
  const base = resolveBase(slug, overrides);
  const isSquareMatrix = slug.startsWith("dotm-square-");
  const isTriangleMatrix = slug.startsWith("dotm-triangle-");
  const baseSize = base.size ?? 36;
  const baseDot = base.dotSize ?? 5;

  const out: GridEffectVariant[] = [];

  const defaultProps: DotMatrixCommonProps = { ...base };
  applyMiniGeometry(baseSize, baseDot, defaultProps);
  defaultProps.animated = base.animated ?? true;
  out.push({ key: "default", label: "Default", props: defaultProps });

  for (const id of ALL_EXAMPLE_IDS) {
    if (id === "ex-layout" && isTriangleMatrix) {
      continue;
    }

    const snippet: Partial<DotMatrixCommonProps> =
      isTriangleMatrix && id === "ex-opacity"
        ? LOADER_GALLERY_EX_OPACITY_FOR_TRIANGLE
        : LOADER_GALLERY_EXAMPLE_SNIPPET_PROPS[id];

    const merged: DotMatrixCommonProps = { ...base, ...snippet };
    applyMiniGeometry(baseSize, baseDot, merged);
    if (id !== "ex-layout") {
      delete merged.boxSize;
      delete merged.minSize;
    }
    merged.speed = base.speed;
    merged.animated = base.animated ?? true;

    if (id === "ex-look" && isSquareMatrix) {
      merged.pattern = "cross";
    } else {
      merged.pattern = base.pattern;
    }

    out.push({
      key: id,
      label: EFFECT_LABELS[id],
      props: merged
    });
  }

  return out;
}
