export interface User {
  id: number;
  username: string;
  profileImage?: string | null;
  telegramId?: string | null;
  joinDate: string;
}

export interface UserSettings {
  language: string;
  theme: string;
  notifyNewServices: boolean;
  notifyPaymentConfirmations: boolean;
  notifyPromotions: boolean;
  shareDataWithPartners: boolean;
  publicProfile: boolean;
  accountSecurity: string;
}

export interface ServicePackage {
  duration: string;
  priceEgp: number;
  priceUsd: number;
}

export interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  packages: ServicePackage[];
}

export interface PaymentRequest {
  serviceId: string;
  packageDuration: string;
  priceEgp: number;
  priceUsd: number;
  paymentMethod: string;
  transactionId: string;
  proofUrl: string;
  telegramId?: string;
}
