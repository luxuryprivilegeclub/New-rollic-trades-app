import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, glow = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/10 backdrop-blur-xl overflow-hidden',
        hover && 'cursor-pointer transition-shadow duration-300',
        glow && 'before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-blue-500/50 before:via-purple-500/50 before:to-pink-500/50 before:-z-10 before:blur-sm',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b border-white/10', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
}
