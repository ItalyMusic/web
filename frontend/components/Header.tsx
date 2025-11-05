'use client';

import { motion } from 'framer-motion';
import { useAuth } from './AuthProvider';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-8 flex w-full max-w-6xl items-center justify-between rounded-full border border-white/20 bg-white/10 px-8 py-4 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold tracking-wide text-white drop-shadow-lg">Shop Ton</span>
        <div className="h-1 w-16 rounded-full bg-primary/60" />
      </div>
      {user && (
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="h-10 w-10 rounded-full border border-white/20 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-semibold">
                {user.username[0]?.toUpperCase() ?? 'م'}
              </div>
            )}
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user.username}</p>
              <p className="text-xs text-white/70">عضو منذ {new Date(user.joinDate).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary/80 hover:bg-primary/10"
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </motion.header>
  );
}
