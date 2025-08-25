"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  Camera,
  Mail,
  Mic,
  Radio,
  BarChart3,
  Search,
  Settings,
  User,
  Phone,
  Palette,
} from "lucide-react";

const menuItems = [
  { icon: BarChart3, label: "AvatoDash™", href: "/analytics" },
  { icon: Shield, label: "Content Shield™", href: "/content-shield" },
  { icon: Camera, label: "Avatar Generator", href: "/avatar-generator" },
  { icon: Palette, label: "Branding Assistant", href: "/branding-assistant" },
  { icon: Mail, label: "Email Blaster", href: "/email-blaster" },
  { icon: Mic, label: "Voice Campaigns", href: "/voice-campaigns" },
  { icon: Phone, label: "Phone Campaigns", href: "/phone-campaigns" },
  { icon: Radio, label: "Podcast Generator", href: "/podcast-generator" },
  { icon: Search, label: "SEO Automation", href: "/seo-automation" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900/95 backdrop-blur-xl border-r border-purple-500/20 z-40">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 mb-8"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            AvatoAI
          </span>
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-purple-400"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-purple-400 font-medium"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <div className="space-y-2">
          <Link
            href="/profile"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
          >
            <User className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="text-gray-300 group-hover:text-white">
              Profile
            </span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="text-gray-300 group-hover:text-white">
              Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
