import { useCallback, useReducer, useRef } from 'react';
import { type Message, type ChatState } from '../types/chat';
import { streamChat } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { generateId } from '../utils/id';

type Action =
  | { type: 'ADD_USER_MESSAGE'; payload: Message }
  | { type: 'ADD_ASSISTANT_MESSAGE'; payload: Message }
  | { type: 'APPEND_CHUNK'; id: string; chunk: string }
  | { type: 'FINISH_STREAMING'; id: string }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'CLEAR_MESSAGES' };

function reducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'ADD_USER_MESSAGE':
    case 'ADD_ASSISTANT_MESSAGE':
      return { ...state, isLoading: true, error: null, messages: [...state.messages, action.payload] };
    case 'APPEND_CHUNK':
      return {
        ...state,
        messages: state.messages.map(m =>
          m.id === action.id ? { ...m, content: m.content + action.chunk } : m
        ),
      };
    case 'FINISH_STREAMING':
      return {
        ...state,
        isLoading: false,
        messages: state.messages.map(m =>
          m.id === action.id ? { ...m, isStreaming: false } : m
        ),
      };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.error };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'CLEAR_MESSAGES':
      return { messages: [], isLoading: false, error: null };
    default:
      return state;
  }
}

const initialState: ChatState = { messages: [], isLoading: false, error: null };

export function useChat() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortRef = useRef<AbortController | null>(null);
  const { token } = useAuth();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading || !token) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_USER_MESSAGE', payload: userMessage });

    const assistantId = generateId();
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: new Date(),
      isStreaming: true,
    };
    dispatch({ type: 'ADD_ASSISTANT_MESSAGE', payload: assistantMessage });

    const history = state.messages.map(m => ({ role: m.role, content: m.content }));

    await streamChat({
      message: content.trim(),
      token: token,
      conversationHistory: history,
      signal: abortRef.current.signal,
      onChunk: (chunk) => dispatch({ type: 'APPEND_CHUNK', id: assistantId, chunk }),
      onDone: () => dispatch({ type: 'FINISH_STREAMING', id: assistantId }),
      onError: (error) => dispatch({ type: 'SET_ERROR', error }),
    });
  }, [state.messages, state.isLoading, token]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return { ...state, sendMessage, stopStreaming, clearMessages, clearError };
}
