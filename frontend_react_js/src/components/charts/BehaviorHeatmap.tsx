import React from 'react';

type Props = {
  onCellClick?: (behavior: string, hourIso: string) => void;
}

/**
 * Simple 24-hour heatmap grid (0-5 intensity) for behaviors.
 * PUBLIC_INTERFACE
 */
export default function BehaviorHeatmap({ onCellClick }: Props) {
  const hours = Array.from({ length: 24 }).map((_, i) => i);
  const behaviors = ['Pacing', 'Moving', 'Scratching', 'Recumbent', 'Non-Recumbent'] as const;

  // Sample intensities 0–5
  const intensities: Record<string, number[]> = {
    'Pacing':        [1,1,0,0,0,0,1,2,3,4,5,4,3,3,2,2,1,1,1,2,3,2,1,1],
    'Moving':        [0,0,0,1,1,2,3,4,4,3,2,2,2,3,4,3,2,2,1,1,0,0,0,0],
    'Scratching':    [0,0,0,0,0,1,1,2,2,2,1,1,1,1,2,2,1,1,1,0,0,0,0,0],
    'Recumbent':     [3,4,5,5,5,4,3,2,1,1,1,2,3,3,3,4,5,5,5,4,4,3,3,3],
    'Non-Recumbent': [1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,1,1,1,1,1],
  };

  const colorFor = (v: number) => {
    const alpha = v / 5;
    return `rgba(30, 168, 91, ${alpha})`; // based on --primary
  };

  const hourIso = (h: number) => `2025-01-01T${String(h).padStart(2,'0')}:00:00Z`;

  return (
    <div className="w-full">
      <div className="overflow-auto">
        <table className="w-full text-xs table">
          <thead>
            <tr>
              <th className="text-left p-2">Behavior</th>
              {hours.map(h => <th key={h} className="p-2 text-center">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {behaviors.map(b => (
              <tr key={b} className="bg-surface">
                <td className="p-2 text-body">{b}</td>
                {hours.map(h => {
                  const v = intensities[b][h];
                  return (
                    <td
                      key={`${b}-${h}`}
                      className="p-0 cursor-pointer"
                      title={`${b} @ ${h}:00 — intensity ${v}`}
                      onClick={() => onCellClick?.(b, hourIso(h))}
                    >
                      <div style={{ background: colorFor(v), height: 18 }} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
