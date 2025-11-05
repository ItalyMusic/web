'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="glass-card w-full max-w-md space-y-6 border border-white/20 bg-white/10 p-8 text-center text-white">
        <h1 className="text-3xl font-bold">استعادة كلمة المرور</h1>
        <p className="text-sm text-white/70">
          سنقوم بإرسال تعليمات الاستعادة على حساب التليجرام المرتبط.
        </p>

        {submitted ? (
          <div className="space-y-4 text-sm text-white/80">
            <p>تم استلام الطلب بنجاح. سنتواصل معك قريباً عبر التليجرام.</p>
            <Link className="text-primary hover:underline" href="/login">
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        ) : (
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
            <button
              type="submit"
              className="w-full rounded-full border border-primary/60 bg-primary/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/50"
            >
              إرسال الطلب
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
