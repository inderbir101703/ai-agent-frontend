import { type InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full bg-gray-800 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-3 text-sm',
        'border outline-none transition-colors duration-150',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        error ? 'border-red-500' : 'border-gray-700',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}
