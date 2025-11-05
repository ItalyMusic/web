'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postJson } from '../lib/api';
import type { PaymentRequest } from '../lib/types';
import { useAuth } from './AuthProvider';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  payload: Omit<PaymentRequest, 'paymentMethod' | 'transactionId' | 'proofUrl'>;
}

const localMethods = ['Vodafone Cash', 'Orange Cash', 'Etisalat Cash', 'Bank Transfer'];
const binanceMethod = 'Binance';

export default function PaymentModal({ open, onClose, payload }: PaymentModalProps) {
  const { refresh, user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState(localMethods[0]);
  const [transactionId, setTransactionId] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setPaymentMethod(localMethods[0]);
      setTransactionId('');
      setProofUrl('');
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      await postJson('/api/payments', {
        ...payload,
        paymentMethod,
        transactionId,
        proofUrl,
        telegramId: user?.telegramId
      });
      setSuccess(true);
      await refresh();
    } catch (err: any) {
      setError(err?.message ?? 'حدث خطأ غير متوقع.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-backdrop fixed inset-0 z-40 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card relative w-full max-w-lg space-y-4 border border-white/20 bg-white/10 p-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">إتمام عملية الدفع</h3>
              <button
                onClick={onClose}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/70 transition hover:text-white"
              >
                إغلاق
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-white/70">اختر وسيلة الدفع داخل مصر</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {localMethods.map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                        paymentMethod === method
                          ? 'border-primary/80 bg-primary/20 shadow-glow'
                          : 'border-white/20 bg-white/5 hover:border-primary/40'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">طرق الدفع خارج مصر</p>
                <button
                  onClick={() => setPaymentMethod(binanceMethod)}
                  className={`mt-3 w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    paymentMethod === binanceMethod
                      ? 'border-primary/80 bg-primary/20 shadow-glow'
                      : 'border-white/20 bg-white/5 hover:border-primary/40'
                  }`}
                >
                  Binance ID: 575801133
                </button>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/80">
                <p>رقم الدفع: 01223885943</p>
                <p className="mt-2 text-xs text-yellow-300">
                  ⚠️ تأكد من كتابة يوزر قناتك أو حسابك بدقة. لا يمكن استرجاع الأموال في حال الخطأ.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-white/70">
                  رقم العملية
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(event) => setTransactionId(event.target.value)}
                    placeholder="TX12345"
                    className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="text-sm text-white/70">
                  رابط إثبات الدفع
                  <input
                    type="url"
                    value={proofUrl}
                    onChange={(event) => setProofUrl(event.target.value)}
                    placeholder="https://..."
                    className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  />
                </label>
              </div>

              {error && <p className="rounded-xl border border-red-400/40 bg-red-500/20 p-3 text-sm text-red-200">{error}</p>}
              {success && (
                <p className="rounded-xl border border-green-400/40 bg-green-500/20 p-3 text-sm text-green-200">
                  تم إرسال طلب الدفع بنجاح، في انتظار التأكيد.
                </p>
              )}

              <button
                disabled={loading || !transactionId || !proofUrl}
                onClick={handleSubmit}
                className="w-full rounded-full border border-primary/60 bg-primary/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/50 disabled:cursor-not-allowed disabled:border-white/20 disabled:bg-white/10"
              >
                {loading ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
