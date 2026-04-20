const API_BASE = import.meta.env.VITE_API_URL || '';

export interface StreamOptions {
  message: string;
  token: string;
  conversationHistory?: Array<{ role: string; content: string }>;
  onChunk: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
  signal?: AbortSignal;
}

export async function streamChat(options: StreamOptions): Promise<void> {
  const { message, token, conversationHistory = [], onChunk, onDone, onError, signal } = options;

  try {
    const response = await fetch(`${API_BASE}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message, history: conversationHistory }),
      signal,
    });

    if (!response.ok) {
      const text = await response.text();
      onError(`Request failed: ${response.status} ${text}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError('No response body');
      return;
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const raw = decoder.decode(value, { stream: true });

      // Handle SSE format (data: ...) or raw chunks
      const lines = raw.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            onDone();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) onChunk(parsed.content);
            else if (parsed.error) { onError(parsed.error); return; }
          } catch {
            // Plain text chunk inside data:
            if (data) onChunk(data);
          }
        } else if (line.trim() && !line.startsWith(':')) {
          // Raw text streaming (non-SSE)
          onChunk(line);
        }
      }
    }

    onDone();
  } catch (err) {
    if ((err as Error).name === 'AbortError') return;
    onError((err as Error).message || 'Unknown error');
  }
}
