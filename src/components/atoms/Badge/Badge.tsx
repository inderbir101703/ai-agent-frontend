import { type ReactNode } from 'react';
import { cn } from '../../../utils/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'error';
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-700 text-gray-300',
  success: 'bg-emerald-900 text-emerald-300',
  error: 'bg-red-900 text-red-300',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
