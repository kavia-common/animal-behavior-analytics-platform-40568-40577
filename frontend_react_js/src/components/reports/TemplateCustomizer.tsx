import React, { useState } from 'react';
import Button from '@/components/ui/Button';

// PUBLIC_INTERFACE
export default function TemplateCustomizer() {
  /** Template customization UI placeholders */
  const [color, setColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--color-primary')?.trim() || '#2C5F9A');
  const [header, setHeader] = useState('VizAI – Behavior Report');
  const [footer, setFooter] = useState('Confidential – For research use only');

  return (
    <div className="card p-4 space-y-3">
      <div className="font-heading font-semibold">Template Customization</div>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <div className="text-xs text-neutral-600 mb-1">Logo Upload</div>
          <input type="file" className="block w-full text-sm" aria-label="Logo upload" />
        </div>
        <div>
          <div className="text-xs text-neutral-600 mb-1">Color Scheme</div>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10" />
        </div>
        <div className="md:col-span-1">
          <div className="text-xs text-neutral-600 mb-1">Header Text</div>
          <input value={header} onChange={e => setHeader(e.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
        </div>
        <div className="md:col-span-2">
          <div className="text-xs text-neutral-600 mb-1">Footer Text</div>
          <input value={footer} onChange={e => setFooter(e.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button>Save Template</Button>
        <Button variant="secondary">Reset</Button>
      </div>
    </div>
  );
}
