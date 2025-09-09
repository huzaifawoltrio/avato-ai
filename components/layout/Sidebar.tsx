"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Camera,
  Mail,
  Phone,
  Radio,
  BarChart3,
  Search,
  Settings,
  User,
  Palette,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/magicui/dock";

const menuItems = [
  { icon: BarChart3, label: "AvatoDash™", href: "/" },
  { icon: Shield, label: "Content Shield™", href: "/" },
  { icon: Camera, label: "Avatar Generator", href: "/avatar-generator" },
  { icon: Palette, label: "Branding Assistant", href: "/" },
  { icon: Mail, label: "Email Blaster", href: "/" },
  { icon: Phone, label: "Phone Campaigns", href: "/" },
  { icon: Radio, label: "Podcast Generator", href: "/" },
  { icon: Search, label: "SEO Automation", href: "/" },
  { icon: User, label: "Profile", href: "/" },
  { icon: Settings, label: "Settings", href: "/" },
];

export function NavigationDock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Dock iconMagnification={60} iconDistance={100}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <DockIcon
              key={item.label}
              className={`relative flex items-center justify-center rounded-full size-12 transition-all duration-300 group
              ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                  : "bg-black/20 dark:bg-white/10 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Link
                href={item.href}
                className="size-full flex items-center justify-center"
              >
                <Icon
                  className={`size-6 transition-all duration-300 ${
                    isActive
                      ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      : "text-gray-400 group-hover:text-cyan-300"
                  }`}
                />
              </Link>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium bg-black/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-100 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-cyan-500/10">
                {item.label}
              </div>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
