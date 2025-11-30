import React from 'react';

// PUBLIC_INTERFACE
export default function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  /** Simple tooltip via title attr */
  return (
    <span title={content} className="inline-block">
      {children}
    </span>
  );
}
