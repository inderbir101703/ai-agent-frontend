import { type FormEvent, useState } from 'react';
import { Bot } from 'lucide-react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Spinner } from '../../atoms/Spinner';
import { FormField } from '../../molecules/FormField';
import { useAuth } from '../../../context/AuthContext';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) login(username.trim());
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
          <Bot size={28} className="text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-100">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-1">Enter your username to continue</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Username" htmlFor="username" error={error ?? undefined}>
          <Input
            id="username"
            type="text"
            placeholder="e.g. john_doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            autoFocus
            autoComplete="username"
            error={!!error}
          />
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!username.trim()}
          loading={isLoading}
          className="w-full mt-1"
        >
          {isLoading ? <Spinner size="sm" /> : null}
          {isLoading ? 'Signing in…' : 'Continue'}
        </Button>
      </form>
    </div>
  );
}
