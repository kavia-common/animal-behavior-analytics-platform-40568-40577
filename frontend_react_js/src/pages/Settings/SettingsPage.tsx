import React from 'react';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';

// PUBLIC_INTERFACE
export default function SettingsPage() {
  /** UI-only settings form; stores choices in localStorage as preferences cache */
  const [dark, setDark] = React.useState<boolean>(localStorage.getItem('pref_theme') === 'dark');
  const [tz, setTz] = React.useState<string>(localStorage.getItem('pref_tz') || 'UTC');
  const [lang, setLang] = React.useState<string>(localStorage.getItem('pref_lang') || 'en');
  const [quality, setQuality] = React.useState<string>(localStorage.getItem('pref_quality') || '720p');
  const [refresh, setRefresh] = React.useState<number>(Number(localStorage.getItem('pref_refresh') || 30));
  const [cameras, setCameras] = React.useState<string[]>(JSON.parse(localStorage.getItem('pref_cameras') || '[]'));

  const addCamera = () => {
    const id = prompt('Enter camera source label');
    if (id) setCameras(prev => [...prev, id]);
  };
  const removeCamera = (idx: number) => setCameras(prev => prev.filter((_, i) => i !== idx));

  const save = () => {
    localStorage.setItem('pref_theme', dark ? 'dark' : 'light');
    localStorage.setItem('pref_tz', tz);
    localStorage.setItem('pref_lang', lang);
    localStorage.setItem('pref_quality', quality);
    localStorage.setItem('pref_refresh', String(refresh));
    localStorage.setItem('pref_cameras', JSON.stringify(cameras));
    alert('Preferences saved (UI only).');
  };

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <div className="font-heading font-semibold mb-3">Appearance</div>
        <Toggle checked={dark} onChange={setDark} label="Dark theme" />
      </div>

      <div className="card p-4 grid md:grid-cols-3 gap-3">
        <div>
          <div className="text-xs text-neutral-600 mb-1">Timezone</div>
          <select className="border rounded px-2 py-1 text-sm w-full" value={tz} onChange={e => setTz(e.target.value)}>
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
            <option>Asia/Tokyo</option>
          </select>
        </div>
        <div>
          <div className="text-xs text-neutral-600 mb-1">Language</div>
          <select className="border rounded px-2 py-1 text-sm w-full" value={lang} onChange={e => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div>
          <div className="text-xs text-neutral-600 mb-1">Video quality</div>
          <select className="border rounded px-2 py-1 text-sm w-full" value={quality} onChange={e => setQuality(e.target.value)}>
            <option value="480p">480p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
        </div>
        <div>
          <div className="text-xs text-neutral-600 mb-1">Data refresh interval (s)</div>
          <input type="number" min={5} className="border rounded px-2 py-1 text-sm w-full" value={refresh} onChange={e => setRefresh(Number(e.target.value))} />
        </div>
      </div>

      <div className="card p-4">
        <div className="font-heading font-semibold mb-2">Camera sources</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {cameras.map((c, i) => (
            <span key={i} className="px-2 py-1 rounded bg-neutral-100 text-sm">
              {c} <button className="ml-1 text-red-600" onClick={() => removeCamera(i)}>×</button>
            </span>
          ))}
        </div>
        <Button size="sm" variant="secondary" onClick={addCamera}>Add source</Button>
      </div>

      <div>
        <Button onClick={save}>Save Preferences</Button>
      </div>
    </div>
  );
}
