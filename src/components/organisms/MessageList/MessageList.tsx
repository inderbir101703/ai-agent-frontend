import { type Message } from '../../../types/chat';
import { MessageBubble } from '../../molecules/MessageBubble';
import { useAutoScroll } from '../../../hooks/useAutoScroll';
import { Bot } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const { bottomRef, containerRef } = useAutoScroll(messages, isLoading);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center">
          <Bot size={32} className="text-gray-400" />
        </div>
        <div>
          <p className="text-gray-300 font-medium">How can I help you?</p>
          <p className="text-gray-500 text-sm mt-1">Start a conversation below</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} className="h-1" aria-hidden="true" />
      </div>
    </div>
  );
}
