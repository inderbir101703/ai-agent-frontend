import { Trash2, Bot, LogOut } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { useAuth } from '../../../context/AuthContext';

interface ChatHeaderProps {
  onClear: () => void;
  isConnected?: boolean;
  messageCount: number;
}

export function ChatHeader({ onClear, isConnected = true, messageCount }: ChatHeaderProps) {
  const { username, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-100">AI Assistant</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="text-xs text-gray-400">
              {username ? `@${username}` : (isConnected ? 'Online' : 'Offline')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {messageCount > 0 && (
          <Badge variant="default">{messageCount} msgs</Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={messageCount === 0}
          aria-label="Clear conversation"
        >
          <Trash2 size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          aria-label="Sign out"
        >
          <LogOut size={14} />
        </Button>
      </div>
    </header>
  );
}
