"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  X,
  Palette,
  Bell,
  User,
  ShieldCheck,
  CreditCard,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

const settingsTabs = [
  { icon: Palette, label: "Appearance" },
  { icon: Bell, label: "Notifications" },
  { icon: User, label: "Account" },
  { icon: ShieldCheck, label: "Security" },
  { icon: CreditCard, label: "Billing" },
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("Appearance");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-4xl h-[600px] bg-gray-900/80 backdrop-blur-2xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar for settings */}
            <div className="w-1/4 border-r border-gray-800 p-6 flex flex-col">
              <h2 className="text-xl font-bold text-white mb-8 flex items-center">
                <Settings className="mr-2" /> Settings
              </h2>
              <nav className="space-y-2">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.label;
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(tab.label)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 font-medium"
                          : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors ${
                          isActive
                            ? "text-purple-400"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content for settings */}
            <div className="w-3/4 p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">{activeTab}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Appearance Tab */}
              {activeTab === "Appearance" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Theme
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <ThemeOption icon={Sun} label="Light" />
                      <ThemeOption icon={Moon} label="Dark" isActive />
                      <ThemeOption icon={Laptop} label="System" />
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Accent Color
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <ColorOption color="bg-purple-500" isActive />
                      <ColorOption color="bg-blue-500" />
                      <ColorOption color="bg-green-500" />
                      <ColorOption color="bg-yellow-500" />
                      <ColorOption color="bg-red-500" />
                      <ColorOption color="bg-pink-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "Notifications" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <NotificationOption
                    title="Campaign Updates"
                    description="Receive email notifications for campaign status changes."
                    defaultChecked
                  />
                  <NotificationOption
                    title="Weekly Summaries"
                    description="Get a weekly performance report delivered to your inbox."
                    defaultChecked
                  />
                  <NotificationOption
                    title="New Feature Announcements"
                    description="Stay up-to-date with the latest AvatoAI tools and features."
                  />
                  <NotificationOption
                    title="AI Assistant Tips"
                    description="Get tips on how to best use the AvatoAI assistant."
                  />
                </motion.div>
              )}

              {/* Placeholder for other tabs */}
              {(activeTab === "Account" ||
                activeTab === "Security" ||
                activeTab === "Billing") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-400 pt-20"
                >
                  <p>Settings for {activeTab} will be available soon.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper components for settings options
const ThemeOption = ({
  icon: Icon,
  label,
  isActive = false,
}: {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}) => (
  <div
    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
      isActive
        ? "border-purple-500 bg-purple-500/10"
        : "border-gray-700 hover:border-gray-600"
    }`}
  >
    <Icon
      className={`w-6 h-6 mx-auto mb-2 ${
        isActive ? "text-purple-400" : "text-gray-400"
      }`}
    />
    <p
      className={`text-center text-sm font-medium ${
        isActive ? "text-white" : "text-gray-300"
      }`}
    >
      {label}
    </p>
  </div>
);

const ColorOption = ({
  color,
  isActive = false,
}: {
  color: string;
  isActive?: boolean;
}) => (
  <button
    className={`w-10 h-10 rounded-full cursor-pointer transition-all ${color} ${
      isActive
        ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-500"
        : "hover:scale-110"
    }`}
  ></button>
);

const NotificationOption = ({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) => (
  <div className="flex items-start justify-between p-4 bg-gray-800/30 rounded-lg">
    <div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-400 max-w-md">{description}</p>
    </div>
    <Switch defaultChecked={defaultChecked} />
  </div>
);
