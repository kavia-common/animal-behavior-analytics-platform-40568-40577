import React from 'react';
import { PlaceholderImage } from '@/components/ui/Placeholders';

// PUBLIC_INTERFACE
export default function ProfilePage() {
  /** Simple profile page with placeholder avatar */
  return (
    <div className="card p-4 flex gap-4 items-center">
      <PlaceholderImage label="Avatar" className="w-20 h-20 rounded-full" />
      <div>
        <div className="font-heading font-semibold">Researcher</div>
        <div className="text-sm text-neutral-600">researcher@zoo.org</div>
        <div className="text-xs text-neutral-600 mt-1">Role: Analyst</div>
      </div>
    </div>
  );
}
