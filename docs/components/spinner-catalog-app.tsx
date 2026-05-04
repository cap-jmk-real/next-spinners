import type { ComponentType, CSSProperties } from "react";
import type { AgentFrameSpinnerProps } from "next-spinners";
import {
  ArcSpinner,
  ArrowSpinner,
  AuroraSpinner,
  BalloonSpinner,
  BloomSpinner,
  BounceSpinner,
  BreatheSpinner,
  CascadeSpinner,
  CheckerboardSpinner,
  CircleHalvesSpinner,
  CircleQuartersSpinner,
  ClockSpinner,
  ColumnsSpinner,
  DiagSwipeSpinner,
  DotsCircleSpinner,
  DotsSpinner,
  Dots10Spinner,
  Dots11Spinner,
  Dots12Spinner,
  Dots13Spinner,
  Dots14Spinner,
  Dots2Spinner,
  Dots3Spinner,
  Dots4Spinner,
  Dots5Spinner,
  Dots6Spinner,
  Dots7Spinner,
  Dots8Spinner,
  Dots9Spinner,
  DoubleArrowSpinner,
  DqpbSpinner,
  EarthSpinner,
  EchoSpinner,
  FillSweepSpinner,
  FlowSpinner,
  GleamSpinner,
  GrowHorizontalSpinner,
  GrowVerticalSpinner,
  HaloSpinner,
  HeartsSpinner,
  HelixSpinner,
  MoonSpinner,
  NoiseSpinner,
  NovaSpinner,
  OrbitSpinner,
  PointSpinner,
  PrismSpinner,
  PulseSpinner,
  RainSpinner,
  RandomSpinner,
  RippleSpinner,
  RollingLineSpinner,
  SandSpinner,
  ScanSpinner,
  SimpleDotsScrollingSpinner,
  SimpleDotsSpinner,
  SnakeSpinner,
  SparkleSpinner,
  SpeakerSpinner,
  SquareCornersSpinner,
  ToggleSpinner,
  TriangleSpinner,
  WaveSpinner,
  WaveRowsSpinner,
  WeatherSpinner,
  ZenSpinner,
  XPostAsciiBrailleCarouselSpinner,
  XPostDotsScanRoundRobinSpinner,
  XPostQuadrantBrailleOrSpinner,
  XPostTrioBrailleOrSpinner,
} from "next-spinners";

type SpinnerComp = ComponentType<AgentFrameSpinnerProps>;

/** Same order as [Expo demo name → named export](/reference/expo-mapping#upstream-keys-55). */
const EXPO_LINEAGE: { name: string; Comp: SpinnerComp }[] = [
  { name: "DotsSpinner", Comp: DotsSpinner },
  { name: "Dots2Spinner", Comp: Dots2Spinner },
  { name: "Dots3Spinner", Comp: Dots3Spinner },
  { name: "Dots4Spinner", Comp: Dots4Spinner },
  { name: "Dots5Spinner", Comp: Dots5Spinner },
  { name: "Dots6Spinner", Comp: Dots6Spinner },
  { name: "Dots7Spinner", Comp: Dots7Spinner },
  { name: "Dots8Spinner", Comp: Dots8Spinner },
  { name: "Dots9Spinner", Comp: Dots9Spinner },
  { name: "Dots10Spinner", Comp: Dots10Spinner },
  { name: "Dots11Spinner", Comp: Dots11Spinner },
  { name: "Dots12Spinner", Comp: Dots12Spinner },
  { name: "Dots13Spinner", Comp: Dots13Spinner },
  { name: "Dots14Spinner", Comp: Dots14Spinner },
  { name: "SandSpinner", Comp: SandSpinner },
  { name: "BounceSpinner", Comp: BounceSpinner },
  { name: "DotsCircleSpinner", Comp: DotsCircleSpinner },
  { name: "WaveSpinner", Comp: WaveSpinner },
  { name: "ScanSpinner", Comp: ScanSpinner },
  { name: "RainSpinner", Comp: RainSpinner },
  { name: "PulseSpinner", Comp: PulseSpinner },
  { name: "SnakeSpinner", Comp: SnakeSpinner },
  { name: "SparkleSpinner", Comp: SparkleSpinner },
  { name: "CascadeSpinner", Comp: CascadeSpinner },
  { name: "ColumnsSpinner", Comp: ColumnsSpinner },
  { name: "OrbitSpinner", Comp: OrbitSpinner },
  { name: "BreatheSpinner", Comp: BreatheSpinner },
  { name: "WaveRowsSpinner", Comp: WaveRowsSpinner },
  { name: "CheckerboardSpinner", Comp: CheckerboardSpinner },
  { name: "HelixSpinner", Comp: HelixSpinner },
  { name: "FillSweepSpinner", Comp: FillSweepSpinner },
  { name: "DiagSwipeSpinner", Comp: DiagSwipeSpinner },
  { name: "DqpbSpinner", Comp: DqpbSpinner },
  { name: "RollingLineSpinner", Comp: RollingLineSpinner },
  { name: "SimpleDotsSpinner", Comp: SimpleDotsSpinner },
  { name: "SimpleDotsScrollingSpinner", Comp: SimpleDotsScrollingSpinner },
  { name: "ArcSpinner", Comp: ArcSpinner },
  { name: "BalloonSpinner", Comp: BalloonSpinner },
  { name: "CircleHalvesSpinner", Comp: CircleHalvesSpinner },
  { name: "CircleQuartersSpinner", Comp: CircleQuartersSpinner },
  { name: "PointSpinner", Comp: PointSpinner },
  { name: "SquareCornersSpinner", Comp: SquareCornersSpinner },
  { name: "ToggleSpinner", Comp: ToggleSpinner },
  { name: "TriangleSpinner", Comp: TriangleSpinner },
  { name: "GrowHorizontalSpinner", Comp: GrowHorizontalSpinner },
  { name: "GrowVerticalSpinner", Comp: GrowVerticalSpinner },
  { name: "NoiseSpinner", Comp: NoiseSpinner },
  { name: "ArrowSpinner", Comp: ArrowSpinner },
  { name: "DoubleArrowSpinner", Comp: DoubleArrowSpinner },
  { name: "HeartsSpinner", Comp: HeartsSpinner },
  { name: "ClockSpinner", Comp: ClockSpinner },
  { name: "EarthSpinner", Comp: EarthSpinner },
  { name: "MoonSpinner", Comp: MoonSpinner },
  { name: "SpeakerSpinner", Comp: SpeakerSpinner },
  { name: "WeatherSpinner", Comp: WeatherSpinner },
];

const PACKAGE_ONLY: { name: string; Comp: SpinnerComp }[] = [
  { name: "AuroraSpinner", Comp: AuroraSpinner },
  { name: "BloomSpinner", Comp: BloomSpinner },
  { name: "EchoSpinner", Comp: EchoSpinner },
  { name: "FlowSpinner", Comp: FlowSpinner },
  { name: "GleamSpinner", Comp: GleamSpinner },
  { name: "HaloSpinner", Comp: HaloSpinner },
  { name: "NovaSpinner", Comp: NovaSpinner },
  { name: "PrismSpinner", Comp: PrismSpinner },
  { name: "RandomSpinner", Comp: RandomSpinner },
  { name: "RippleSpinner", Comp: RippleSpinner },
  { name: "ZenSpinner", Comp: ZenSpinner },
];

const MIXED_X_POST: { name: string; Comp: SpinnerComp }[] = [
  { name: "XPostAsciiBrailleCarouselSpinner", Comp: XPostAsciiBrailleCarouselSpinner },
  { name: "XPostDotsScanRoundRobinSpinner", Comp: XPostDotsScanRoundRobinSpinner },
  { name: "XPostQuadrantBrailleOrSpinner", Comp: XPostQuadrantBrailleOrSpinner },
  { name: "XPostTrioBrailleOrSpinner", Comp: XPostTrioBrailleOrSpinner },
];

const GALLERY_ACCENT = "#7dd3fc";
const PANEL_BG = "rgba(15, 23, 42, 0.72)";
const PANEL_BORDER = "rgba(148, 163, 184, 0.2)";
const MUTED = "#94a3b8";

const shell: CSSProperties = {
  borderRadius: 12,
  padding: "1.25rem 1.35rem",
  marginBottom: "1.75rem",
  background: "linear-gradient(165deg, #0f172a 0%, #020617 55%, #0f172a 100%)",
  border: `1px solid ${PANEL_BORDER}`,
  boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))",
  gap: 10,
};

function PreviewCell({
  name,
  Comp,
  color = GALLERY_ACCENT,
}: {
  name: string;
  Comp: SpinnerComp;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 8px",
        borderRadius: 8,
        background: PANEL_BG,
        border: `1px solid ${PANEL_BORDER}`,
        minHeight: 88,
      }}
    >
      <Comp size={22} color={color} label={name} />
      <span
        style={{
          fontSize: 11,
          lineHeight: 1.25,
          color: MUTED,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {name}
      </span>
    </div>
  );
}

function Section({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { name: string; Comp: SpinnerComp }[];
}) {
  return (
    <section style={shell}>
      <h2 style={{ margin: "0 0 0.35rem", fontSize: "1.15rem", color: "#e2e8f0" }}>
        {title}
      </h2>
      <p style={{ margin: "0 0 1rem", fontSize: 13, lineHeight: 1.55, color: MUTED }}>
        {description}
      </p>
      <div style={grid}>
        {items.map(({ name, Comp }) => (
          <PreviewCell key={name} name={name} Comp={Comp} />
        ))}
      </div>
    </section>
  );
}

export function SpinnerCatalogApp() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Section
        title="Expo lineage (55)"
        description="Ports of the upstream Expo demo keys — same frames and default timing as expo-agent-spinners unless noted in the mapping page."
        items={EXPO_LINEAGE}
      />
      <Section
        title="Package-only (11)"
        description="Named spinners that do not have an Expo demo key; they ship only in next-spinners."
        items={PACKAGE_ONLY}
      />
      <Section
        title="Mixed frame pack (4)"
        description="Built with createMixedFrameSpinner — layered sequences from multiple frame sources (see mixed-x-post-pack in the repo)."
        items={MIXED_X_POST}
      />

      <section style={shell}>
        <h2 style={{ margin: "0 0 0.35rem", fontSize: "1.15rem", color: "#e2e8f0" }}>
          Custom colors
        </h2>
        <p style={{ margin: "0 0 1rem", fontSize: 13, lineHeight: 1.55, color: MUTED }}>
          Every spinner accepts a <code style={{ color: "#cbd5e1" }}>color</code> prop
          (CSS <code style={{ color: "#cbd5e1" }}>color</code>) and merges{" "}
          <code style={{ color: "#cbd5e1" }}>style</code> after that, so tokens and
          overrides behave predictably.
        </p>
        <div
          style={{
            ...grid,
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          }}
        >
          <PreviewCell name="DotsSpinner" Comp={DotsSpinner} color="#f472b6" />
          <PreviewCell name="HelixSpinner" Comp={HelixSpinner} color="#a78bfa" />
          <PreviewCell name="ArcSpinner" Comp={ArcSpinner} color="#34d399" />
          <PreviewCell name="ZenSpinner" Comp={ZenSpinner} color="#fbbf24" />
        </div>
      </section>
    </div>
  );
}
