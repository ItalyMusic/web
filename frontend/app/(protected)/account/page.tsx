'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../components/AuthProvider';
import GlassCard from '../../../components/GlassCard';
import { getJson, putJson } from '../../../lib/api';
import { formatCurrency } from '../../../lib/utils';
import type { UserSettings } from '../../../lib/types';
import { useRouter } from 'next/navigation';

const Toggle = ({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) => (
  <label className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full ${checked ? 'bg-primary/70' : 'bg-white/20'} p-1 transition`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="peer hidden"
    />
    <span className={`h-6 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : ''}`} />
  </label>
);

export default function AccountPage() {
  const router = useRouter();
  const { user, settings, refresh, logout } = useAuth();
  const [localSettings, setLocalSettings] = useState<UserSettings | null>(settings);
  const [profileImage, setProfileImage] = useState(user?.profileImage ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [payments, setPayments] = useState<
    Array<{
      id: number;
      service: string;
      packageDuration: string;
      priceEgp: number;
      priceUsd: number;
      status: string;
      createdAt: string;
    }>
  >([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user?.profileImage]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setPaymentsLoading(true);
        const data = await getJson<{ payments: any[] }>('/api/payments');
        setPayments(
          data.payments.map((payment) => ({
            id: payment.id,
            service: payment.service,
            packageDuration: payment.packageDuration,
            priceEgp: payment.priceEgp,
            priceUsd: payment.priceUsd,
            status: payment.status,
            createdAt: payment.createdAt
          }))
        );
      } finally {
        setPaymentsLoading(false);
      }
    };

    loadPayments();
  }, []);

  const handleSettingChange = (key: keyof UserSettings, value: string | boolean) => {
    if (!localSettings) return;
    setLocalSettings({ ...localSettings, [key]: value } as UserSettings);
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await putJson('/api/account/profile', {
        profileImage
      });
      await refresh();
      setMessage('تم تحديث الملف الشخصي بنجاح');
    } catch (error: any) {
      setMessage(error?.message ?? 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const saveSettings = async () => {
    if (!localSettings) return;
    setSaving(true);
    setMessage(null);
    try {
      await putJson('/api/account/settings', localSettings);
      await refresh();
      setMessage('تم حفظ الإعدادات');
    } catch (error: any) {
      setMessage(error?.message ?? 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const statusMessage = useMemo(() => message, [message]);

  if (!user || !localSettings) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <header className="flex items-center justify-between p-6">
        <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center text-white/80">
          ←
        </button>
        <h1 className="text-xl font-bold text-white drop-shadow glow">الملف الشخصي</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 pt-0">
        <GlassCard className="mb-10 flex flex-col items-center gap-4 bg-white/10 p-6 text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border border-white/30 bg-cover bg-center" style={{ backgroundImage: `url(${profileImage || 'https://placehold.co/200x200'})` }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{user.username}</p>
            <p className="text-sm text-white/60">انضم {new Date(user.joinDate).toLocaleDateString('ar-EG')}</p>
          </div>
          <div className="w-full max-w-sm space-y-3 text-right">
            <label className="block text-sm">
              رابط صورة جديدة
              <input
                type="url"
                value={profileImage}
                onChange={(event) => setProfileImage(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
            </label>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full rounded-full border border-primary/60 bg-primary/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/50 disabled:cursor-not-allowed"
            >
              حفظ الصورة
            </button>
          </div>
        </GlassCard>

        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-3 px-2 text-lg font-bold text-white">الإعدادات العامة</h2>
            <GlassCard className="space-y-4 bg-white/10 p-0">
              <div className="space-y-4 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">⚙️</div>
                    <p className="text-base text-white">إعدادات الملف الشخصي</p>
                  </div>
                  <button onClick={saveProfile} className="text-sm text-primary hover:underline">
                    تعديل
                  </button>
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">🌐</div>
                    <p className="text-base text-white">اللغة</p>
                  </div>
                  <select
                    value={localSettings.language}
                    onChange={(event) => handleSettingChange('language', event.target.value)}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="ar" className="text-black">
                      العربية
                    </option>
                    <option value="en" className="text-black">
                      English
                    </option>
                  </select>
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">🌓</div>
                    <p className="text-base text-white">المظهر</p>
                  </div>
                  <select
                    value={localSettings.theme}
                    onChange={(event) => handleSettingChange('theme', event.target.value)}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="dark" className="text-black">
                      داكن
                    </option>
                    <option value="light" className="text-black">
                      فاتح
                    </option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </section>

          <section>
            <h2 className="mb-3 px-2 text-lg font-bold text-white">إعدادات الإشعارات</h2>
            <GlassCard className="space-y-4 bg-white/10 p-0">
              <div className="space-y-4 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">خدمات جديدة</p>
                  <Toggle
                    checked={localSettings.notifyNewServices}
                    onChange={(value) => handleSettingChange('notifyNewServices', value)}
                  />
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">تأكيدات الدفع</p>
                  <Toggle
                    checked={localSettings.notifyPaymentConfirmations}
                    onChange={(value) => handleSettingChange('notifyPaymentConfirmations', value)}
                  />
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">العروض الترويجية</p>
                  <Toggle
                    checked={localSettings.notifyPromotions}
                    onChange={(value) => handleSettingChange('notifyPromotions', value)}
                  />
                </div>
              </div>
            </GlassCard>
          </section>

          <section>
            <h2 className="mb-3 px-2 text-lg font-bold text-white">إعدادات الخصوصية</h2>
            <GlassCard className="space-y-4 bg-white/10 p-0">
              <div className="space-y-4 px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">مشاركة البيانات مع الشركاء</p>
                  <Toggle
                    checked={localSettings.shareDataWithPartners}
                    onChange={(value) => handleSettingChange('shareDataWithPartners', value)}
                  />
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">رؤية الملف الشخصي العام</p>
                  <Toggle
                    checked={localSettings.publicProfile}
                    onChange={(value) => handleSettingChange('publicProfile', value)}
                  />
                </div>
                <div className="border-t border-white/10" />
                <div className="flex items-center justify-between">
                  <p className="text-base text-white">أمان الحساب</p>
                  <select
                    value={localSettings.accountSecurity}
                    onChange={(event) => handleSettingChange('accountSecurity', event.target.value)}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white focus:border-primary focus:outline-none"
                  >
                    <option value="high" className="text-black">
                      مرتفع
                    </option>
                    <option value="medium" className="text-black">
                      متوسط
                    </option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </section>

          <section>
            <h2 className="mb-3 px-2 text-lg font-bold text-white">سجل المدفوعات</h2>
            <GlassCard className="space-y-4 bg-white/10 p-6 text-sm text-white/70">
              {paymentsLoading ? (
                <p>جارٍ تحميل السجل...</p>
              ) : payments.length === 0 ? (
                <p>لا توجد مدفوعات بعد</p>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <p className="font-semibold text-white">{payment.service}</p>
                        <p className="text-xs text-white/50">
                          {payment.packageDuration} • {new Date(payment.createdAt).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">
                          -{formatCurrency(payment.priceUsd, 'USD')} / -{formatCurrency(payment.priceEgp, 'EGP')}
                        </p>
                        <p
                          className={`text-xs ${
                            payment.status === 'completed'
                              ? 'text-green-400'
                              : payment.status === 'awaiting_confirmation'
                              ? 'text-yellow-300'
                              : payment.status === 'user_waiting'
                              ? 'text-sky-300'
                              : 'text-red-300'
                          }`}
                        >
                          {payment.status === 'completed'
                            ? 'تم التنفيذ'
                            : payment.status === 'awaiting_confirmation'
                            ? 'قيد المراجعة'
                            : payment.status === 'user_waiting'
                            ? 'بانتظار بياناتك'
                            : 'مرفوض'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </section>

          <section>
            <h2 className="mb-3 px-2 text-lg font-bold text-white">الدعم</h2>
            <GlassCard className="space-y-4 bg-white/10 p-0">
              <div className="space-y-4 px-6 py-4">
                <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-primary/40">
                  <span>مركز المساعدة</span>
                  <span>→</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-primary/40">
                  <span>اتصل بنا</span>
                  <span>→</span>
                </button>
                <button
                  onClick={logout}
                  className="flex w-full items-center justify-between rounded-2xl border border-red-500/40 bg-red-500/20 px-4 py-3 text-sm text-red-200 transition hover:border-red-400/60"
                >
                  <span>تسجيل الخروج</span>
                  <span>→</span>
                </button>
              </div>
            </GlassCard>
          </section>
        </div>

        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-primary/40 bg-primary/20 p-4 text-center text-sm text-white"
          >
            {statusMessage}
          </motion.div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="rounded-full border border-primary/60 bg-primary/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary/50 disabled:cursor-not-allowed"
          >
            حفظ كل الإعدادات
          </button>
        </div>
      </main>
    </div>
  );
}
