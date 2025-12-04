import React from "react";

type Tone = "default" | "secondary";
type Props = { tone?: Tone; children: React.ReactNode };

/** Badge using global theme tokens via utility classes. */
// PUBLIC_INTERFACE
export default function Badge({ tone = "default", children }: Props) {
  const cls = tone === "secondary" ? "ui-badge ui-badge-secondary" : "ui-badge";
  return <span className={cls}>{children}</span>;
}
