import { LoaderGallery } from "@/components/loader-gallery";
import { loaderRegistry } from "@/lib/registry-config";
import { getLoaderSource } from "@/lib/source";

interface HomePageProps {
  searchParams?: Promise<{
    embed?: string;
    rows?: string;
    /** Columns at the capture breakpoint (default 5 = `xl:grid-cols-5` at 1400px). */
    gridCols?: string;
    cols?: string;
  }>;
}

function parsePositiveInt(value: string | undefined): number | undefined {
  if (value == null || value === "") return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const embed = params?.embed === "1";
  const rows = parsePositiveInt(params?.rows);
  const gridCols =
    parsePositiveInt(params?.gridCols) ?? parsePositiveInt(params?.cols) ?? 5;

  const items = await Promise.all(
    loaderRegistry.map(async (loader) => ({
      slug: loader.slug,
      title: loader.title,
      description: loader.description,
      componentName: loader.componentName,
      motionOptional: loader.motionOptional,
      sourceCode: await getLoaderSource(loader.fileName)
    }))
  );

  const maxGridItems =
    rows != null ? Math.min(items.length, rows * gridCols) : undefined;

  return (
    <LoaderGallery
      items={items}
      maxGridItems={maxGridItems}
      showHero={!embed}
      animateAllGridPreviews={embed}
      showAllEffectVariantsInGrid={embed}
    />
  );
}
