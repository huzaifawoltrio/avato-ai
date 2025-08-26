"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import Link from "next/link";
import {
  Shield,
  Camera,
  Mail,
  Mic,
  Radio,
  BarChart3,
  Search,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react";

const tools = [
  {
    icon: Shield,
    title: "Smart Content Shield™",
    description:
      "Scan content for originality, plagiarism, and SEO optimization",
    href: "/content-shield",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Camera,
    title: "Avatar Generator",
    description: "Convert photos and voice into professional avatar videos",
    href: "/avatar-generator",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Text + Email Blaster",
    description: "Send bulk personalized email campaigns with AI optimization",
    href: "/email-blaster",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Mic,
    title: "Voice Campaigns",
    description: "Create and distribute AI-powered voice marketing messages",
    href: "/voice-campaigns",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Radio,
    title: "Podcast Generator",
    description: "Transform scripts into professional podcast episodes",
    href: "/podcast-generator",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: BarChart3,
    title: "AvatoDash™ Analytics",
    description: "Comprehensive analytics and AI-driven insights",
    href: "/analytics",
    color: "from-teal-500 to-blue-500",
  },
  {
    icon: Search,
    title: "SEO Automation",
    description: "Automated SEO optimization and content enhancement",
    href: "/seo-automation",
    color: "from-yellow-500 to-orange-500",
  },
];

const stats = [
  { icon: Zap, label: "AI Tools", value: "8+", color: "text-purple-400" },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "97%",
    color: "text-green-400",
  },
  { icon: Users, label: "Active Users", value: "10K+", color: "text-blue-400" },
];

export default function Home() {
  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Your Always-On AI Marketing Assistant
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0">
          Supercharge your marketing with cutting-edge AI tools. From content
          creation to analytics, AvatoAI helps you dominate your market with
          intelligent automation.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center py-4 sm:py-6">
                <Icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 ${stat.color}`}
                />
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer h-full">
                <Link href={tool.href} className="block h-full">
                  <div className="flex flex-col h-full">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 flex-grow leading-relaxed">
                      {tool.description}
                    </p>
                    <GradientButton className="w-full mt-auto text-sm sm:text-base py-2 sm:py-2.5">
                      Launch Tool
                    </GradientButton>
                  </div>
                </Link>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Start Section */}
      <Card className="text-center space-y-3 sm:space-y-4 py-6 sm:py-8 mx-2 sm:mx-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Ready to Get Started?
        </h2>
        <p className="text-sm sm:text-base text-gray-400 px-2 sm:px-4 max-w-2xl mx-auto">
          Pick any tool above to begin your AI-powered marketing journey, or
          start with our most popular feature.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 px-4 sm:px-0">
          <Link href="/content-shield" className="w-full sm:w-auto">
            <GradientButton className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3">
              Try Content Shield™
            </GradientButton>
          </Link>
          <Link href="/analytics" className="w-full sm:w-auto">
            <GradientButton className="w-full sm:w-auto bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3">
              View Analytics
            </GradientButton>
          </Link>
        </div>
      </Card>
    </div>
  );
}
