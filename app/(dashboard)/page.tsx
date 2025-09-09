"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import Link from "next/link";
import {
  Users,
  BarChart3,
  HardDrive,
  Shield,
  Palette,
  Video,
  FileCheck,
  Star,
  MapPin,
  Camera,
  TrendingUp,
  Eye,
  Target,
  DollarSign,
  UserPlus,
  MousePointerClick,
  Award,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    icon: Users,
    title: "CRM",
    subtitle: "Contacts & Campaign Tracking",
    description:
      "Manage contacts, track campaigns, and nurture leads through your entire sales funnel",
    href: "/crm",
    color: "from-blue-500 via-blue-600 to-indigo-600",
    stats: [
      { label: "Leads", value: "1.2K" },
      { label: "Campaigns", value: "32" },
      { label: "Growth", value: "87%" },
    ],
    progress: 70,
  },
  {
    icon: BarChart3,
    title: "Dashboard & Analytics",
    subtitle: "Performance Intelligence",
    description:
      "Real-time insights, ROI tracking, and comprehensive campaign performance metrics",
    href: "/analytics",
    color: "from-purple-500 via-purple-600 to-pink-600",
    stats: [
      { label: "Reports", value: "56" },
      { label: "ROI", value: "312%" },
      { label: "KPI Hit", value: "93%" },
    ],
    progress: 80,
  },
  {
    icon: HardDrive,
    title: "Media Vault",
    subtitle: "Secure Storage",
    description:
      "Centralized secure storage for all your marketing assets, media, and brand materials",
    href: "/media-vault",
    color: "from-gray-500 via-gray-600 to-slate-600",
    stats: [
      { label: "Used", value: "8GB" },
      { label: "Total", value: "20GB" },
      { label: "Files", value: "1.8K" },
    ],
    progress: 40,
  },
  {
    icon: Shield,
    title: "Smart Content Shield",
    subtitle: "SEO, Plagiarism, Readability",
    description:
      "AI-powered content analysis for SEO optimization, originality checks, and readability scoring",
    href: "/content-shield",
    color: "from-emerald-500 via-green-600 to-teal-600",
    stats: [
      { label: "Scans", value: "230" },
      { label: "Unique", value: "98%" },
      { label: "SEO", value: "92%" },
    ],
    progress: 65,
  },
  {
    icon: Palette,
    title: "Branding Assistant",
    subtitle: "Logos, Visuals, Messaging",
    description:
      "Create consistent brand identity with AI-generated logos, visuals, and messaging frameworks",
    href: "/branding-assistant",
    color: "from-rose-500 via-pink-600 to-purple-600",
    stats: [
      { label: "Logos", value: "45" },
      { label: "Themes", value: "12" },
      { label: "Assets", value: "380" },
    ],
    progress: 55,
  },
  {
    icon: Video,
    title: "AI Video & Avatar Studio",
    subtitle: "Professional Content Creation",
    description:
      "Generate professional videos, AI avatars, and multimedia content for all your campaigns",
    href: "/video-studio",
    color: "from-orange-500 via-red-600 to-pink-600",
    stats: [
      { label: "Videos", value: "64" },
      { label: "Avatars", value: "12" },
      { label: "Exports", value: "302" },
    ],
    progress: 75,
  },
  {
    icon: FileCheck,
    title: "Marketing-Compliance Copilot",
    subtitle: "Legal & Regulatory Guidance",
    description:
      "Ensure your campaigns meet legal requirements and industry compliance standards",
    href: "/compliance-copilot",
    color: "from-amber-500 via-yellow-600 to-orange-600",
    stats: [
      { label: "Checks", value: "412" },
      { label: "Issues", value: "5" },
      { label: "Compliance", value: "99%" },
    ],
    progress: 95,
  },
  {
    icon: Star,
    title: "Review & Reputation Genie",
    subtitle: "Online Reputation Management",
    description:
      "Monitor, manage, and improve your online reputation across all review platforms",
    href: "/reputation-genie",
    color: "from-cyan-500 via-teal-600 to-blue-600",
    stats: [
      { label: "Reviews", value: "3.4K" },
      { label: "Avg", value: "4.7★" },
      { label: "Growth", value: "68%" },
    ],
    progress: 60,
  },
  {
    icon: MapPin,
    title: "Local Lead Radar",
    subtitle: "Geographic Targeting",
    description:
      "Identify and target local prospects with precision geographic and demographic filtering",
    href: "/local-lead-radar",
    color: "from-violet-500 via-indigo-600 to-blue-600",
    stats: [
      { label: "Regions", value: "120" },
      { label: "Leads", value: "15K" },
      { label: "Conversions", value: "72%" },
    ],
    progress: 85,
  },
  {
    icon: Camera,
    title: "UGC Rights & Consent Manager",
    subtitle: "Content Rights Management",
    description:
      "Manage user-generated content rights, permissions, and consent documentation",
    href: "/ugc-manager",
    color: "from-lime-500 via-green-600 to-emerald-600",
    stats: [
      { label: "UGC", value: "860" },
      { label: "Approved", value: "742" },
      { label: "Pending", value: "118" },
    ],
    progress: 78,
  },
];

const roiCards = [
  {
    icon: UserPlus,
    title: "Lead Generation",
    metric: "+147%",
    description: "Increase in qualified leads",
    color: "from-emerald-400 to-green-500",
    bgColor: "from-emerald-500/20 to-green-500/20",
    illustration: "https://illustrations.popsy.co/emerald/business-plan.svg", // Replace with your downloaded SVG
    period: "Last 90 days",
  },
  {
    icon: Eye,
    title: "Web Traffic",
    metric: "+234%",
    description: "Boost in organic traffic",
    color: "from-blue-400 to-cyan-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    illustration: "https://illustrations.popsy.co/blue/website-analytics.svg", // Replace with your downloaded SVG
    period: "Last 60 days",
  },
  {
    icon: Target,
    title: "Lead Quality Score",
    metric: "+89%",
    description: "Higher conversion potential",
    color: "from-purple-400 to-pink-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    illustration: "https://illustrations.popsy.co/purple/target.svg", // Replace with your downloaded SVG
    period: "This quarter",
  },
  // {
  //   icon: DollarSign,
  //   title: "Revenue Growth",
  //   metric: "+312%",
  //   description: "Increase in monthly revenue",
  //   color: "from-orange-400 to-red-500",
  //   bgColor: "from-orange-500/20 to-red-500/20",
  //   illustration: "https://illustrations.popsy.co/orange/investment.svg", // Replace with your downloaded SVG
  //   period: "Last 120 days",
  // },
  // {
  //   icon: MousePointerClick,
  //   title: "Click-Through Rate",
  //   metric: "+156%",
  //   description: "Better campaign engagement",
  //   color: "from-indigo-400 to-purple-500",
  //   bgColor: "from-indigo-500/20 to-purple-500/20",
  //   illustration: "https://illustrations.popsy.co/indigo/click.svg", // Replace with your downloaded SVG
  //   period: "Campaign average",
  // },
  // {
  //   icon: Award,
  //   title: "Customer Satisfaction",
  //   metric: "+78%",
  //   description: "Higher customer ratings",
  //   color: "from-yellow-400 to-orange-500",
  //   bgColor: "from-yellow-500/20 to-orange-500/20",
  //   illustration: "https://illustrations.popsy.co/yellow/customer-service.svg", // Replace with your downloaded SVG
  //   period: "YTD improvement",
  // },
];

export default function Home() {
  return (
    <div className="relative space-y-12 px-8 py-10 min-h-screen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center space-y-6"
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Mission Control
          </span>
        </h1>
        <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
          Your AI-powered marketing command center. Launch any tool to
          supercharge your campaigns.
        </p>
      </motion.div>

      {/* ROI Performance Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 mb-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Performance Impact
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h2>
          <p className="text-gray-400">
            Real results from our AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {roiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card
                  className={`relative p-6 bg-gradient-to-br ${card.bgColor} border-white/20 backdrop-blur-sm hover:border-white/40 transition-all duration-300 overflow-hidden`}
                >
                  {/* Background Illustration */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 overflow-hidden">
                    <img
                      src={card.illustration}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {card.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
                      >
                        {card.metric}
                      </span>
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>

                    <p className="text-gray-300 text-sm mb-3">
                      {card.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}
                      ></div>
                      <span className="text-xs text-gray-400">
                        {card.period}
                      </span>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}
                  ></div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Mission Control Grid */}
      <div className="relative z-10 max-w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Launch Control</h2>
          <p className="text-xl text-gray-400">
            Choose your AI-powered marketing weapon
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="group"
              >
                <Link href={tool.href}>
                  <Card className="relative h-96 p-8 bg-gradient-to-br from-white/5 to-white/10 border-white/20 backdrop-blur-sm hover:from-white/10 hover:to-white/20 transition-all duration-500 ease-out overflow-visible group">
                    {/* Icon */}
                    <div
                      className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-xl group-hover:shadow-2xl`}
                    >
                      <Icon className="w-10 h-10 text-white transition-all duration-500 ease-out group-hover:scale-110" />
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-400 mb-4">
                      {tool.subtitle}
                    </p>

                    {/* Micro Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {tool.stats.map((s) => (
                        <div key={s.label} className="text-center">
                          <span className="text-lg font-bold text-white">
                            {s.value}
                          </span>
                          <p className="text-xs text-gray-400">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden mb-6">
                      <div
                        className={`h-full bg-gradient-to-r ${tool.color}`}
                        style={{ width: `${tool.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      Campaign progress:{" "}
                      <span className="text-white">{tool.progress}%</span>
                    </p>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-center bg-black/70 backdrop-blur-lg rounded-lg transition-all duration-500 ease-out">
                      <p className="text-gray-200 px-6 mb-4">
                        {tool.description}
                      </p>
                      <GradientButton className="px-6 py-2">
                        Launch Tool
                      </GradientButton>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
