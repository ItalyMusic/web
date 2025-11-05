import type { Service } from './types';

export const services: Service[] = [
  {
    id: 'telegram-premium',
    icon: '☰',
    name: 'اشتراك تليجرام مميز',
    description: 'مزايا حصرية لكل مستخدم لتجربة تليجرام كاملة.',
    packages: [
      { duration: '3 أشهر', priceEgp: 650, priceUsd: 13.5 },
      { duration: '6 أشهر', priceEgp: 850, priceUsd: 17.5 },
      { duration: '12 شهر', priceEgp: 1600, priceUsd: 32 }
    ]
  },
  {
    id: 'account-boost',
    icon: '☰',
    name: 'تعزيزات حسابات محذوفة',
    description: 'إعادة تنشيط وزيادة مصداقية الحسابات المهجورة.',
    packages: [
      { duration: '10 تعزيزات', priceEgp: 100, priceUsd: 2 },
      { duration: '20 تعزيز', priceEgp: 200, priceUsd: 4 },
      { duration: '30 تعزيز', priceEgp: 300, priceUsd: 6 },
      { duration: '40 تعزيز', priceEgp: 400, priceUsd: 8 }
    ]
  }
];
