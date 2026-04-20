import { type ReactNode } from 'react';

interface ChatLayoutProps {
  children: ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[calc(100vh-2rem)] max-h-[800px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {children}
      </div>
    </div>
  );
}
