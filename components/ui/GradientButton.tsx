'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function GradientButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false 
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-purple-500 to-blue-500
        hover:from-purple-600 hover:to-blue-600
        shadow-lg hover:shadow-purple-500/25
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}