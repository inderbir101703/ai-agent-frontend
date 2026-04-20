import { type LoginResponse } from '../types/auth';

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function login(username: string): Promise<string> {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Login failed: ${response.status} ${text}`);
  }

  const data: LoginResponse = await response.json();
  const token = data.token ?? data.access_token ?? data.accessToken;

  if (!token) throw new Error('No token in response');
  return token;
}
