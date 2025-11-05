'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getStoredToken, setStoredToken, clearStoredToken } from '../lib/tokenStorage';
import type { User, UserSettings } from '../lib/types';

interface AuthContextValue {
  user: User | null;
  settings: UserSettings | null;
  loading: boolean;
  login: (token: string, profile: User, settings: UserSettings) => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const publicRoutes = new Set(['/login', '/register', '/forgot-password']);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000'}/api/account`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('failed');
    }

    const data = await response.json();
    setUser(data.user);
    setSettings(data.settings);
  };

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setLoading(false);
      if (!publicRoutes.has(pathname)) {
        router.replace('/login');
      }
      return;
    }

    fetchProfile(token)
      .catch(() => {
        clearStoredToken();
        if (!publicRoutes.has(pathname)) {
          router.replace('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      settings,
      loading,
      login: (token, profile, userSettings) => {
        setStoredToken(token);
        setUser(profile);
        setSettings(userSettings);
        router.replace('/');
      },
      logout: () => {
        clearStoredToken();
        setUser(null);
        setSettings(null);
        router.replace('/login');
      },
      refresh: async () => {
        const token = getStoredToken();
        if (!token) return;
        await fetchProfile(token);
      }
    }),
    [user, settings, loading, router]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
