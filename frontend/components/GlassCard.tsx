'use client';

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export default function GlassCard({ children, className, hoverGlow = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative glass-card border border-white/20 bg-white/10 p-8 text-white shadow-2xl',
        hoverGlow && 'transition-all duration-500 hover:shadow-glow',
        className
      )}
    >
      <div className="absolute inset-0 rounded-[24px] border border-white/10" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
