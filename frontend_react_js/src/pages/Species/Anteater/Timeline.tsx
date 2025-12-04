import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoModal from './components/VideoModal';

type EventItem = {
  id: string;
  timestamp: string;
  behaviorId: string;
  duration: number;
  cameraId: string;
  locationId?: string;
  videoUrl: string;
};

const LABELS: Record<string, string> = {
  pacing: 'Pacing',
  moving: 'Moving',
  scratching: 'Scratching',
  recumbent: 'Recumbent',
  non_recumbent: 'Non-Recumbent',
};

// Construct mock events to ensure counts match the bar chart when filtering by a behavior
const buildEvents = (): EventItem[] => {
  const now = Date.now();
  const mk = (behaviorId: string, n: number): EventItem[] =>
    Array.from({ length: n }, (_, i) => ({
      id: `${behaviorId}-${i + 1}`,
      timestamp: new Date(now - (i + 1) * 30 * 60_000).toISOString(),
      behaviorId,
      duration: 8 + ((i % 6) + 1) * 6, // varied
      cameraId: i % 2 === 0 ? 'cam-1' : 'cam-2',
      locationId: i % 2 === 0 ? 'loc-a' : 'loc-b',
      videoUrl: i % 2 === 0 ? '/assets/video/sample1.mp4' : '/assets/video/sample2.mp4',
    }));
  return [
    ...mk('pacing', 12),
    ...mk('moving', 25),
    ...mk('scratching', 22),
    ...mk('recumbent', 15),
    ...mk('non_recumbent', 20),
  ];
};

const MOCK_EVENTS: EventItem[] = buildEvents();

// PUBLIC_INTERFACE
export default function AnteaterTimeline() {
  /**
   * Timeline table showing events matching filters from Dashboard.
   * Columns: Timestamp, Duration, Camera, Video thumbnail/action.
   * Hover state uses var(--card-hover), clicking opens Video Modal with metadata and controls.
   */
  const [params] = useSearchParams();
  const [open, setOpen] = useState<null | EventItem>(null);

  const behaviorFilter = params.get('behavior');
  const hourFilter = params.get('hour');
  const datePreset = params.get('datePreset');
  const dateFrom = params.get('dateFrom');
  const dateTo = params.get('dateTo');
  const cameras = (params.get('cameras') || '').split(',').filter(Boolean);
  const locations = (params.get('locations') || '').split(',').filter(Boolean);

  const filtered = useMemo(() => {
    let rows = MOCK_EVENTS.slice();
    if (behaviorFilter) rows = rows.filter((r) => r.behaviorId === behaviorFilter);
    if (hourFilter !== null) {
      const hourNum = parseInt(hourFilter!, 10);
      if (!Number.isNaN(hourNum)) {
        rows = rows.filter((r) => new Date(r.timestamp).getHours() === hourNum);
      }
    }
    if (cameras.length) rows = rows.filter((r) => cameras.includes(r.cameraId));
    if (locations.length) rows = rows.filter((r) => (r.locationId ? locations.includes(r.locationId) : false));

    const fromTs = dateFrom ? new Date(dateFrom).getTime() : null;
    const toTs = dateTo ? new Date(dateTo).getTime() : null;
    if (fromTs || toTs) {
      rows = rows.filter((r) => {
        const t = new Date(r.timestamp).getTime();
        if (fromTs && t < fromTs) return false;
        if (toTs && t > toTs) return false;
        return true;
      });
    } else if (datePreset === 'today') {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      rows = rows.filter((r) => new Date(r.timestamp) >= start);
    } else if (datePreset === 'last7') {
      const start = new Date(Date.now() - 7 * 24 * 3600_000);
      rows = rows.filter((r) => new Date(r.timestamp) >= start);
    } else if (datePreset === 'last30') {
      const start = new Date(Date.now() - 30 * 24 * 3600_000);
      rows = rows.filter((r) => new Date(r.timestamp) >= start);
    }

    return rows;
  }, [behaviorFilter, hourFilter, datePreset, dateFrom, dateTo, cameras, locations]);

  return (
    <div className="space-y-6">
      <div className="ui-card p-4">
        <div className="text-sm" style={{ color: 'var(--muted)' }}>
          Showing {filtered.length} events
          {behaviorFilter ? ` for ${LABELS[behaviorFilter] || behaviorFilter}` : ''}
          {hourFilter ? ` at ${hourFilter}:00` : ''}
          {cameras.length ? ` • Cameras: ${cameras.join(', ')}` : ''}
          {locations.length ? ` • Locations: ${locations.join(', ')}` : ''}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead style={{ background: 'var(--table-header-bg)' }}>
              <tr style={{ color: 'var(--muted)' }}>
                <th className="text-left py-2 px-2">Timestamp</th>
                <th className="text-left py-2 px-2">Duration (s)</th>
                <th className="text-left py-2 px-2">Camera</th>
                <th className="text-left py-2 px-2">Video</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-[var(--card-hover)]" style={{ borderColor: 'var(--border)' }}>
                  <td className="py-2 px-2" style={{ color: 'var(--text)' }}>
                    {new Date(r.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 px-2" style={{ color: 'var(--text)' }}>
                    {r.duration}
                  </td>
                  <td className="py-2 px-2" style={{ color: 'var(--text)' }}>
                    {r.cameraId}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      className="px-2 py-1 rounded text-white"
                      style={{ background: 'var(--primary)' }}
                      onClick={() => setOpen(r)}
                      title="Open video"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-sm" style={{ color: 'var(--muted)' }}>
                    No events match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <VideoModal
          src={open.videoUrl}
          meta={{
            id: open.id,
            behavior: LABELS[open.behaviorId] || open.behaviorId,
            timestamp: open.timestamp,
            duration: open.duration,
            cameraId: open.cameraId,
            locationId: open.locationId || 'N/A',
            start: 0,
            end: open.duration
          }}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
