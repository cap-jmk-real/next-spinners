/**
 * Example App Router page using client-only frame spinners.
 * Either keep this file under a route that is a Client Component, or split
 * spinners into a `"use client"` child and import that from a Server page.
 */
"use client";

import { DotsSpinner, PulseSpinner, WaveSpinner } from "next-spinners";

export default function ExampleAppRouterPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <DotsSpinner size={24} color="#2563eb" label="Loading metrics" />
        <span>Loading metrics…</span>
      </p>
      <section style={{ marginTop: "2rem" }}>
        <h2>More indicators</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <li>
            <WaveSpinner size={22} color="#0d9488" label="Wave" />
          </li>
          <li>
            <PulseSpinner size={22} color="#c026d3" label="Pulse" />
          </li>
        </ul>
      </section>
    </main>
  );
}
