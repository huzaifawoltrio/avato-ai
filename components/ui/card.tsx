"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={`bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
