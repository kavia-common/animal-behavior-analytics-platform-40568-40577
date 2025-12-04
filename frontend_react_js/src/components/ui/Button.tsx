import React from "react";

type Variant = "primary" | "ghost" | "danger" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

// PUBLIC_INTERFACE
export default function Button({ variant = "primary", size = "md", className = "", style, ...rest }: Props) {
  const base = "rounded-lg font-medium";
  const sizeCls = size === "sm" ? "px-2.5 py-1.5 text-xs" : size === "lg" ? "px-4 py-2.5" : "px-3 py-2 text-sm";

  let merged: React.CSSProperties = {};
  if (variant === "primary") {
    merged = { background: "var(--primary)", color: "#fff" };
  } else if (variant === "danger") {
    merged = { background: "var(--error)", color: "#fff" };
  } else if (variant === "secondary") {
    merged = { border: "1px solid var(--border)", color: "var(--text)", background: "var(--surface)" };
  } else if (variant === "outline") {
    merged = { border: "1px solid var(--primary)", color: "var(--primary)", background: "transparent" };
  } else {
    // ghost
    merged = { background: "transparent", color: "var(--text)" };
  }
  return <button className={`${base} ${sizeCls} ${className}`} style={{ ...merged, ...style }} {...rest} />;
}
