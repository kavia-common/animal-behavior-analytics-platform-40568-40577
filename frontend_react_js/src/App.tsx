import * as React from 'react';

/**
 * PUBLIC_INTERFACE
 * Root App component. Currently unused because routing and providers are set up in main.tsx.
 * Kept for compatibility; renders a fallback message if used directly.
 */
export default function App() {
  /** Simple fallback content in case this component is mounted directly. */
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">VizAI – Giant Anteater Behavior Monitoring</h1>
      <p className="text-sm text-neutral-600">App initialized. Use configured routes from main.tsx.</p>
    </div>
  );
}
