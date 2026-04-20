import { cn } from '../../../utils/cn';

interface AvatarProps {
  role: 'user' | 'assistant';
  className?: string;
}

export function Avatar({ role, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold select-none',
        role === 'user'
          ? 'bg-blue-500 text-white'
          : 'bg-emerald-500 text-white',
        className
      )}
    >
      {role === 'user' ? 'You' : 'AI'}
    </div>
  );
}
