import { type KeyboardEvent, useRef, useState } from 'react';
import { Send, Square } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { cn } from '../../../utils/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isLoading, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  return (
    <div className="flex items-end gap-2 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-colors">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Message AI..."
        rows={1}
        disabled={disabled}
        className={cn(
          'flex-1 bg-transparent text-gray-100 placeholder-gray-500 resize-none outline-none text-sm leading-relaxed',
          'max-h-[200px] overflow-y-auto'
        )}
      />
      {isLoading ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onStop}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 flex-shrink-0 mb-0.5"
          aria-label="Stop generation"
        >
          <Square size={16} fill="currentColor" />
        </Button>
      ) : (
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="flex-shrink-0 mb-0.5 w-8 h-8 p-0 rounded-lg"
          aria-label="Send message"
        >
          <Send size={14} />
        </Button>
      )}
    </div>
  );
}
