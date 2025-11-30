import React from 'react';
import Button from '@/components/ui/Button';

// PUBLIC_INTERFACE
export default function NetworkRetryPage() {
  /** Network retry helper with mock retry */
  const [attempts, setAttempts] = React.useState(0);
  const [status, setStatus] = React.useState<'idle'|'loading'|'ok'|'fail'>('idle');

  const retry = async () => {
    setStatus('loading');
    setAttempts(a => a + 1);
    setTimeout(() => {
      setStatus(Math.random() > 0.3 ? 'ok' : 'fail');
    }, 800);
  };

  return (
    <div className="card p-6 text-center space-y-3">
      <div className="font-heading font-semibold">Network Connection</div>
      <div className="text-sm text-neutral-600">Attempts: {attempts}</div>
      <div className="text-sm">{status === 'ok' ? 'Connection healthy.' : status === 'fail' ? 'Retry failed.' : status === 'loading' ? 'Checking...' : 'Idle'}</div>
      <Button onClick={retry}>Retry</Button>
    </div>
  );
}
