import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { type AuthState } from '../types/auth';
import { login as loginApi } from '../services/authService';

const TOKEN_KEY = 'ai_chat_token';
const USERNAME_KEY = 'ai_chat_username';

interface AuthContextValue extends AuthState {
  login: (username: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem(USERNAME_KEY));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const receivedToken = await loginApi(name);
      localStorage.setItem(TOKEN_KEY, receivedToken);
      localStorage.setItem(USERNAME_KEY, name);
      setToken(receivedToken);
      setUsername(name);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
