import { useEffect, useRef } from 'react';
import { type Message } from '../types/chat';

export function useAutoScroll(messages: Message[], isLoading: boolean) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bottom = bottomRef.current;
    if (!container || !bottom) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;

    if (isNearBottom || isLoading) {
      bottom.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  return { bottomRef, containerRef };
}
