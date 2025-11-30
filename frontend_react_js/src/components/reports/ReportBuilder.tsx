import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import DateRangePicker from '@/components/ui/DateRangePicker';

const schema = z.object({
  type: z.string(),
  start: z.string(),
  end: z.string()
});

type Form = z.infer<typeof schema>;

// PUBLIC_INTERFACE
export default function ReportBuilder({ onPreview }: { onPreview: (form: Form) => void }) {
  /** Report builder form */
  const { register, setValue, handleSubmit, watch } = useForm<Form>({
    defaultValues: { type: 'summary', start: new Date().toISOString().slice(0, 10), end: new Date().toISOString().slice(0, 10) }
  });
  const type = watch('type');
  const start = watch('start');
  const end = watch('end');

  return (
    <form
      className="card p-4 space-y-3"
      onSubmit={handleSubmit(data => {
        onPreview(data);
        alert('Report preview generated (mock).');
      })}
    >
      <div className="font-heading font-semibold">Report Builder</div>
      <div className="grid md:grid-cols-3 gap-3 items-center">
        <div className="space-y-1">
          <div className="text-xs text-neutral-600">Type</div>
          <Dropdown
            options={[
              { value: 'summary', label: 'Behavior Summary' },
              { value: 'detailed', label: 'Detailed Timeline' },
              { value: 'comparative', label: 'Comparative Analysis' }
            ]}
            value={type}
            onChange={v => setValue('type', v)}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <div className="text-xs text-neutral-600">Date Range</div>
          <DateRangePicker
            value={{ start, end }}
            onChange={(v: { start: string; end: string }) => {
              setValue('start', v.start);
              setValue('end', v.end);
            }}
          />
        </div>
      </div>
      <div>
        <Button type="submit">Preview</Button>
      </div>
    </form>
  );
}
