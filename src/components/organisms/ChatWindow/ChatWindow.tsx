import { useChat } from '../../../hooks/useChat';
import { ChatHeader } from '../ChatHeader';
import { MessageList } from '../MessageList';
import { ChatInput } from '../../molecules/ChatInput';
import { AlertCircle, X } from 'lucide-react';

export function ChatWindow() {
  const { messages, isLoading, error, sendMessage, stopStreaming, clearMessages, clearError } = useChat();

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <ChatHeader
        onClear={clearMessages}
        messageCount={messages.length}
        isConnected={!error}
      />

      <MessageList messages={messages} isLoading={isLoading} />

      {error && (
        <div className="mx-4 mb-2 flex items-center gap-2 bg-red-950 border border-red-800 text-red-300 text-xs px-3 py-2 rounded-lg">
          <AlertCircle size={14} className="flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={clearError} className="flex-shrink-0 hover:text-red-100" aria-label="Dismiss error">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="px-4 pb-4 pt-2 max-w-3xl w-full mx-auto">
        <ChatInput
          onSend={sendMessage}
          onStop={stopStreaming}
          isLoading={isLoading}
        />
        <p className="text-center text-gray-600 text-xs mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
