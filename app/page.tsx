'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { GradientButton } from '@/components/ui/GradientButton';
import Link from 'next/link';
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
} from 'lucide-react';

const tools = [
  {
    icon: Shield,
    title: 'Smart Content Shield™',
    description: 'Scan content for originality, plagiarism, and SEO optimization',
    href: '/content-shield',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Camera,
    title: 'Avatar Generator',
    description: 'Convert photos and voice into professional avatar videos',
    href: '/avatar-generator',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Mail,
    title: 'Text + Email Blaster',
    description: 'Send bulk personalized email campaigns with AI optimization',
    href: '/email-blaster',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Mic,
    title: 'Voice Campaigns',
    description: 'Create and distribute AI-powered voice marketing messages',
    href: '/voice-campaigns',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Radio,
    title: 'Podcast Generator',
    description: 'Transform scripts into professional podcast episodes',
    href: '/podcast-generator',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'AvatoDash™ Analytics',
    description: 'Comprehensive analytics and AI-driven insights',
    href: '/analytics',
    color: 'from-teal-500 to-blue-500',
  },
  {
    icon: Search,
    title: 'SEO Automation',
    description: 'Automated SEO optimization and content enhancement',
    href: '/seo-automation',
    color: 'from-yellow-500 to-orange-500',
  },
];

const stats = [
  { icon: Zap, label: 'AI Tools', value: '8+', color: 'text-purple-400' },
  { icon: TrendingUp, label: 'Success Rate', value: '97%', color: 'text-green-400' },
  { icon: Users, label: 'Active Users', value: '10K+', color: 'text-blue-400' },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Your Always-On AI Marketing Assistant
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Supercharge your marketing with cutting-edge AI tools. From content creation to analytics, 
          AvatoAI helps you dominate your market with intelligent automation.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer">
                <Link href={tool.href}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  <GradientButton className="w-full">
                    Launch Tool
                  </GradientButton>
                </Link>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Start Section */}
      <Card className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to Get Started?</h2>
        <p className="text-gray-400">
          Pick any tool above to begin your AI-powered marketing journey, or start with our most popular feature.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/content-shield">
            <GradientButton>Try Content Shield™</GradientButton>
          </Link>
          <Link href="/analytics">
            <GradientButton className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
              View Analytics
            </GradientButton>
          </Link>
        </div>
      </Card>
    </div>
  );
}