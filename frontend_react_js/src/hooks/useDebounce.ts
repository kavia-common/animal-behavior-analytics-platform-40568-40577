import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function useDebounce<T>(value: T, delay: number) {
  /** Debounce a value */
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
