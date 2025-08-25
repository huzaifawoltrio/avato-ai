'use client';

import { Bell, Search, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Header() {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools, campaigns..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-purple-400" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}