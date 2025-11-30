import React from 'react';
import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

// PUBLIC_INTERFACE
export default function Button({ variant = 'primary', size = 'md', className, ...rest }: Props) {
  /** Button with variants and sizes */
  return (
    <button
      {...rest}
      className={clsx(
        'rounded-md font-medium transition-colors',
        size === 'sm' && 'px-2.5 py-1.5 text-xs',
        size === 'md' && 'px-3 py-2 text-sm',
        size === 'lg' && 'px-4 py-2.5',
        variant === 'primary' && 'bg-primary text-white hover:opacity-90',
        variant === 'secondary' && 'bg-secondary text-white hover:opacity-90',
        variant === 'ghost' && 'bg-transparent hover:bg-neutral-100',
        className
      )}
    />
  );
}
