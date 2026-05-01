/**
 * Drop-in example for the Next.js App Router. Assumes you already import the
 * stylesheet once in `app/layout.tsx`:
 *
 * ```tsx
 * import "next-spinner-kit/next-spinner.css";
 * ```
 */
import { NextSpinner } from "next-spinner-kit";

export default function ExampleAppRouterPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <NextSpinner variant="ring" size="md" label="Loading metrics" />
        <span>Loading metrics…</span>
      </p>
      <section style={{ marginTop: "2rem" }}>
        <h2>All variants</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1.5rem" }}>
          <li>
            <NextSpinner variant="ring" label="Ring" />
          </li>
          <li>
            <NextSpinner variant="dots" label="Dots" />
          </li>
          <li>
            <NextSpinner variant="bars" label="Bars" />
          </li>
        </ul>
      </section>
      <p style={{ marginTop: "2rem" }}>
        <NextSpinner variant="ring" label="Saving" size="sm">
          Saving draft…
        </NextSpinner>
      </p>
    </main>
  );
}
