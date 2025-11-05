'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postJson } from '../../../lib/api';
import { useAuth } from '../../../components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white/70">
        جارٍ إعادة التوجيه...
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await postJson<{ token: string; user: any; settings: any }>(
        '/api/login',
        {
          username,
          password
        },
        false
      );
      login(data.token, data.user, data.settings);
    } catch (err: any) {
      setError(err?.message ?? 'فشل تسجيل الدخول، حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="glass-card w-full max-w-md space-y-6 border border-white/20 bg-white/10 p-8 text-center text-white">
        <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
        <p className="text-sm text-white/70">مرحبا بعودتك إلى Shop Ton.</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          <label className="block text-sm">
            اسم المستخدم
            <input
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            كلمة المرور
            <input
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="rounded-xl border border-red-500/40 bg-red-500/20 p-3 text-sm text-red-200">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-primary/60 bg-primary/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/50 disabled:cursor-not-allowed"
          >
            {loading ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="space-y-2 text-sm text-white/70">
          <p>
            مستخدم جديد؟{' '}
            <Link className="text-primary hover:underline" href="/register">
              أنشئ حساباً الآن
            </Link>
          </p>
          <p>
            نسيت كلمة المرور؟{' '}
            <Link className="text-primary hover:underline" href="/forgot-password">
              استعادة الوصول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
