import { LoginForm } from '../components/organisms/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
