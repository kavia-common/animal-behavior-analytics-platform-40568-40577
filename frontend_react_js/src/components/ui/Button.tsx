import React from "react";

type Variant = "primary" | "ghost" | "danger" | "secondary";
type Size = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

// PUBLIC_INTERFACE
export default function Button({ variant = "primary", size = "md", className = "", style, ...rest }: Props) {
  const base = "rounded-lg font-medium";
  const sizeCls = size === "sm" ? "px-2.5 py-1.5 text-xs" : size === "lg" ? "px-4 py-2.5" : "px-3 py-2 text-sm";

  let merged: React.CSSProperties = {};
  if (variant === "primary") {
    merged = { background: "var(--color-teal-primary)", color: "#fff" };
  } else if (variant === "danger") {
    merged = { background: "var(--color-red-delete)", color: "#fff" };
  } else if (variant === "secondary") {
    merged = { border: "1px solid var(--color-grey-border)", color: "var(--color-teal-dark-text)", background: "#fff" };
  } else {
    // ghost
    merged = { background: "transparent", color: "var(--color-teal-dark-text)" };
  }
  return <button className={`${base} ${sizeCls} ${className}`} style={{ ...merged, ...style }} {...rest} />;
}
