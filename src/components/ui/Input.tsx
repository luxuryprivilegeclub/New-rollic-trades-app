import { cn } from '@/utils/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
          'transition-all duration-200',
          error && 'border-red-500/50 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

export function TextArea({ label, error, className, ...props }: InputProps & { rows?: number }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50',
          'transition-all duration-200 resize-none',
          error && 'border-red-500/50 focus:ring-red-500/50',
          className
        )}
        {...(props as any)}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
