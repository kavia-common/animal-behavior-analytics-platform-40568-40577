import React from "react";

type VizAITone = "completed" | "processing" | "pending";
type LegacyTone = "default" | "success" | "warning" | "error";
type Props = { tone?: VizAITone | LegacyTone; children: React.ReactNode };

/** Badge using exact VizAI palette; supports legacy tones for backwards compatibility. */
// PUBLIC_INTERFACE
export default function Badge({ tone = "pending", children }: Props) {
  const normalize = (t: VizAITone | LegacyTone): VizAITone => {
    if (t === "success") return "completed";
    if (t === "warning") return "pending";
    if (t === "error") return "pending";
    if (t === "default") return "pending";
    return t as VizAITone;
  };
  const t = normalize(tone);
  const classMap: Record<VizAITone, string> = {
    completed: "badge badge--completed",
    processing: "badge badge--processing",
    pending: "badge badge--pending",
  };
  return <span className={classMap[t]}>{children}</span>;
}
