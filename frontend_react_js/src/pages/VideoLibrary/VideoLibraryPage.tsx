import React from "react";
import { Card } from "@/components/ui/Card";
import { VideoLibraryTable } from "@/components/ui/Tables";

/**
 * PUBLIC_INTERFACE
 * VideoLibraryPage lists uploaded videos with progress, status, and actions.
 */
export default function VideoLibraryPage() {
  return (
    <div className="stack-lg">
      <div className="page-header">
        <div>
          <div className="font-heading font-semibold text-[var(--color-text)]">Video Library</div>
          <p className="text-sm text-[var(--color-text-muted)]">Manage uploaded videos and tracking status.</p>
        </div>
      </div>
      <div className="media-frame">
        <VideoLibraryTable />
      </div>
      <div className="text-xs text-[var(--color-text-muted)]">
        Actions: View (teal/blue), Download (green), Delete (red).
      </div>
    </div>
  );
}
