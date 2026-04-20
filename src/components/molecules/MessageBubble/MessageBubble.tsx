import { type Message } from '../../../types/chat';
import { Avatar } from '../../atoms/Avatar';
import { TypingIndicator } from '../TypingIndicator';
import { cn } from '../../../utils/cn';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isEmpty = message.isStreaming && message.content === '';

  return (
    <div className={cn('flex gap-3 w-full', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <Avatar role={message.role} />

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-gray-800 text-gray-100 rounded-tl-sm'
        )}
      >
        {isEmpty ? (
          <TypingIndicator />
        ) : (
          <>
            <span className="whitespace-pre-wrap break-words">{message.content}</span>
            {message.isStreaming && (
              <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse align-text-bottom" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
