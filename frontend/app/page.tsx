'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import PaymentModal from '../components/PaymentModal';
import { services } from '../lib/services';
import { formatCurrency } from '../lib/utils';
import type { PaymentRequest, Service } from '../lib/types';
import { useAuth } from '../components/AuthProvider';

export default function HomePage() {
  const { user, loading } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<PaymentRequest | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg text-white/80">
        جارٍ التحميل...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handlePackageSelect = (service: Service, duration: string, priceEgp: number, priceUsd: number) => {
    setSelectedPackage({
      serviceId: service.id,
      packageDuration: duration,
      priceEgp,
      priceUsd,
      paymentMethod: '',
      proofUrl: '',
      transactionId: ''
    });
  };

  return (
    <div className="pb-24">
      <Header />

      <main className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-12 px-4 pb-24">
        <GlassCard className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">مرحباً بكم في Shop Ton</h1>
            <p className="text-lg leading-loose text-white/80">
              مرحباً بكم أعزائي المستخدمين في موقع بيع المنتجات الخاصة بتليجرام. يتم تحديث الموقع وإضافة خدمات بشكل
              دوري دائماً ليحظى الموقع برضاكم.
            </p>
          </motion.div>
        </GlassCard>

        <section className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold text-white drop-shadow-lg"
          >
            خدماتنا المختارة
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <GlassCard key={service.id} className="relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="shine" />
                </div>
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl">{service.icon}</span>
                      <h3 className="mt-2 text-xl font-semibold text-white">{service.name}</h3>
                      <p className="text-sm text-white/70">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {service.packages.map((pack) => (
                      <motion.div
                        key={pack.duration}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/80 backdrop-blur"
                      >
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold text-white">{pack.duration}</p>
                          <p>
                            {formatCurrency(pack.priceEgp, 'EGP')} — {formatCurrency(pack.priceUsd, 'USD')}
                          </p>
                        </div>
                        <button
                          onClick={() => handlePackageSelect(service, pack.duration, pack.priceEgp, pack.priceUsd)}
                          className="self-start rounded-full border border-primary/70 bg-primary/20 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/40"
                        >
                          اشتري الآن
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>

      <PaymentModal
        open={Boolean(selectedPackage)}
        onClose={() => setSelectedPackage(null)}
        payload={{
          serviceId: selectedPackage?.serviceId ?? '',
          packageDuration: selectedPackage?.packageDuration ?? '',
          priceEgp: selectedPackage?.priceEgp ?? 0,
          priceUsd: selectedPackage?.priceUsd ?? 0,
          paymentMethod: '',
          proofUrl: '',
          transactionId: ''
        }}
      />
    </div>
  );
}
