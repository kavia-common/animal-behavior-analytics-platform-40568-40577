import React from 'react';
import { PawPrint, Bell, UserCircle2 } from 'lucide-react';

// PUBLIC_INTERFACE
export default function TopNav({ children }: { children?: React.ReactNode }) {
  /** Top navigation with brand, tabs and actions. */
  return (
    <div className="flex items-center justify-between h-[var(--header-height)] px-4 md:px-6">
      <div className="flex items-center gap-2">
        <PawPrint className="text-primary" aria-hidden />
        <div className="font-heading font-semibold text-primary">VizAI</div>
        <div className="text-sm text-neutral-900/60">Giant Anteater Monitoring</div>
      </div>
      <div className="flex-1 flex justify-center">{children}</div>
      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="p-2 rounded-md hover:bg-neutral-100">
          <Bell className="w-5 h-5" aria-hidden />
        </button>
        <button aria-label="Profile menu" className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100">
          <UserCircle2 className="w-6 h-6" aria-hidden />
          <span className="hidden md:block text-sm">Researcher</span>
        </button>
      </div>
    </div>
  );
}
