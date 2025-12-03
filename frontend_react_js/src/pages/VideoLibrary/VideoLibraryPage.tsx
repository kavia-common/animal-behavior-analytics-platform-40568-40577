import React from "react";
import { Card } from "@/components/ui/Card";
import { VideoLibraryTable } from "@/components/ui/Tables";

/**
 * PUBLIC_INTERFACE
 * VideoLibraryPage lists uploaded videos with progress, status, and actions.
 */
export default function VideoLibraryPage() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="font-heading font-semibold text-[var(--color-text)]">Video Library</div>
        <p className="text-sm text-[var(--color-text-muted)]">Manage uploaded videos and tracking status.</p>
      </Card>
      <VideoLibraryTable />
      <div className="text-xs text-[var(--color-text-muted)]">
        Actions: View (teal/blue), Download (green), Delete (red).
      </div>
    </div>
  );
}
