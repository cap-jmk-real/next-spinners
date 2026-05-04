"use client";

import { memo, useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import type { LoaderCard } from "@/components/loader-details-drawer";
import type { GridEffectVariant } from "@/lib/loader-gallery-grid-effect-variants";
import type { DotMatrixCommonProps } from "@/loaders";

interface LoaderGalleryGridCardProps {
  item: LoaderCard;
  onSelect: (slug: string) => void;
  isAnimationEnabled: boolean;
  /** When true, do not wait for IntersectionObserver — preview animates on first paint. */
  animateInViewAlways?: boolean;
  /** When set, one tile shows several effect variants (default + examples). */
  effectVariants?: ReadonlyArray<GridEffectVariant>;
  PreviewComponent: ComponentType<DotMatrixCommonProps>;
  previewProps: DotMatrixCommonProps;
}

export const LoaderGalleryGridCard = memo(function LoaderGalleryGridCard({
  item,
  onSelect,
  isAnimationEnabled,
  animateInViewAlways = false,
  effectVariants,
  PreviewComponent,
  previewProps
}: LoaderGalleryGridCardProps) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(() => animateInViewAlways);

  const handleSelect = useCallback(() => {
    onSelect(item.slug);
  }, [onSelect, item.slug]);

  const shouldAnimate = Boolean(
    isAnimationEnabled &&
      (animateInViewAlways || isNearViewport) &&
      (previewProps.animated ?? true)
  );

  useEffect(() => {
    if (animateInViewAlways) {
      setIsNearViewport(true);
      return;
    }
    const node = cardRef.current;
    if (!node) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsNearViewport(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        rootMargin: "150px 0px",
        threshold: 0
      }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [animateInViewAlways]);

  const hasVariantGrid = Boolean(effectVariants && effectVariants.length > 0);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={handleSelect}
      className={
        hasVariantGrid
          ? "min-h-[15.5rem] w-full cursor-pointer bg-surface/80 rounded-3xl relative group py-1.5"
          : "aspect-square cursor-pointer bg-surface/80 rounded-3xl relative group"
      }
    >
      <div className="theme-text-strong pointer-events-none absolute inset-x-2 bottom-1.5 z-20 rounded-md px-1.5 py-0.5 text-center text-[10px] font-medium leading-tight tracking-wide line-clamp-2">
        {item.title}
      </div>

      <div className="relative flex h-full min-h-0 flex-col pb-7">
        {hasVariantGrid && effectVariants ? (
          <div className="grid w-full min-h-0 flex-1 grid-cols-2 gap-x-0.5 gap-y-0.5 px-1 pt-1">
            {effectVariants.map((v, i) => (
              <div
                key={v.key}
                className={
                  effectVariants.length === 5 && i === 4
                    ? "col-span-2 flex min-h-0 flex-col items-center justify-start gap-px pb-0.5"
                    : "flex min-h-0 flex-col items-center justify-start gap-px pb-0.5"
                }
              >
                <div
                  className={
                    effectVariants.length === 5 && i === 4
                      ? "flex min-h-[52px] w-[46%] max-w-[140px] flex-1 items-center justify-center [&_*]:max-h-full"
                      : "flex min-h-[52px] w-full flex-1 items-center justify-center [&_*]:max-h-full"
                  }
                >
                  <PreviewComponent {...v.props} animated={shouldAnimate} />
                </div>
                <span className="text-[6px] font-medium leading-none text-fg-dim/90">{v.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-1 pt-2">
            <PreviewComponent {...previewProps} animated={shouldAnimate} />
          </div>
        )}
      </div>
    </button>
  );
});
