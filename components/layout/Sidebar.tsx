"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Menu,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SettingsModal } from "../ui/settingsModal"; // Assuming this modal component exists
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: BarChart3, label: "AvatoDash™", href: "/analytics" },
  { icon: Shield, label: "Content Shield™", href: "/content-shield" },
  { icon: Camera, label: "Avatar Generator", href: "/avatar-generator" },
  { icon: Palette, label: "Branding Assistant", href: "/branding-assistant" },
  { icon: Mail, label: "Email Blaster", href: "/email-blaster" },
  { icon: Phone, label: "Phone Campaigns", href: "/phone-campaigns" },
  { icon: Radio, label: "Podcast Generator", href: "/podcast-generator" },
  { icon: Search, label: "SEO Automation", href: "/seo-automation" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(true);
      } else {
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800/50 rounded-lg"
        onClick={toggleMobileMenu}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`peer fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-xl border-r border-purple-500/20 z-40 flex flex-col transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-20" : "w-64"
            }`}
          >
            {/* CHANGE: This div now handles the main flex layout and padding. */}
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-4 flex-shrink-0">
                <div className="flex justify-between items-center mb-8">
                  <Link href={`/`}>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">A</span>
                      </div>
                      {!isCollapsed && (
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          AvatoAI
                        </span>
                      )}
                    </motion.div>
                  </Link>
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:block p-1 rounded-lg hover:bg-gray-800/50"
                  >
                    {isCollapsed ? (
                      <ChevronsRight className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronsLeft className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <button className="md:hidden" onClick={toggleMobileMenu}>
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Navigation (Scrolling Area) */}
              {/* CHANGE: Added flex-grow and overflow-y-auto here to make only the nav scroll. */}
              <div className="flex-grow overflow-y-auto px-4">
                <nav className="space-y-2">
                  <TooltipProvider delayDuration={0}>
                    {menuItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Link
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                  isCollapsed ? "justify-center" : ""
                                } ${
                                  isActive
                                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                                    : "hover:bg-gray-800/50"
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 transition-colors flex-shrink-0 ${
                                    isActive
                                      ? "text-purple-400"
                                      : "text-gray-400 group-hover:text-white"
                                  }`}
                                />
                                <AnimatePresence>
                                  {!isCollapsed && (
                                    <motion.span
                                      initial={{ opacity: 0, width: 0 }}
                                      animate={{ opacity: 1, width: "auto" }}
                                      exit={{ opacity: 0, width: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className={`whitespace-nowrap transition-colors ${
                                        isActive
                                          ? "text-purple-400 font-medium"
                                          : "text-gray-300 group-hover:text-white"
                                      }`}
                                    >
                                      {item.label}
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </Link>
                            </motion.div>
                          </TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent side="right">
                              {item.label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div
                className={`p-4 border-t border-gray-800 flex-shrink-0 ${
                  isCollapsed ? "px-2" : ""
                }`}
              >
                <div className="space-y-2">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/profile"
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                            isCollapsed ? "justify-center" : ""
                          } ${
                            pathname === "/profile"
                              ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                              : "hover:bg-gray-800/50"
                          }`}
                        >
                          <User
                            className={`w-5 h-5 transition-colors flex-shrink-0 ${
                              pathname === "/profile"
                                ? "text-purple-400"
                                : "text-gray-400 group-hover:text-white"
                            }`}
                          />
                          {!isCollapsed && (
                            <span
                              className={`transition-colors ${
                                pathname === "/profile"
                                  ? "text-purple-400 font-medium"
                                  : "text-gray-300 group-hover:text-white"
                              }`}
                            >
                              Profile
                            </span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">Profile</TooltipContent>
                      )}
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setIsSettingsOpen(true)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors group ${
                            isCollapsed ? "justify-center" : ""
                          }`}
                        >
                          <Settings className="w-5 h-5 text-gray-400 group-hover:text-white flex-shrink-0" />
                          {!isCollapsed && (
                            <span className="text-gray-300 group-hover:text-white">
                              Settings
                            </span>
                          )}
                        </button>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right">Settings</TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
