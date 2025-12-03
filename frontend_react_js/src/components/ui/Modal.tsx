import React, { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  wide?: boolean;
};

// PUBLIC_INTERFACE
export default function Modal({ open, onClose, title, children, wide }: Props) {
  /** Accessible modal with backdrop, escape close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title || 'Modal'}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={`bg-[var(--color-surface)] rounded-lg shadow-soft border w-full ${wide ? 'max-w-6xl' : 'max-w-3xl'}`} style={{ borderColor: "var(--color-border)" }}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="font-heading font-semibold">{title}</h3>
            <button aria-label="Close" onClick={onClose} className="px-2 py-1 rounded hover:bg-neutral-100">✕</button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
