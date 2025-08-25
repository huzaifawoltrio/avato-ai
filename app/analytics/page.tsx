'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  Mic, 
  Radio,
  Eye,
  MousePointer,
} from 'lucide-react';

const campaignData = [
  { name: 'Jan', emails: 4000, voice: 2400, podcasts: 1200 },
  { name: 'Feb', emails: 3000, voice: 1398, podcasts: 2200 },
  { name: 'Mar', emails: 2000, voice: 9800, podcasts: 1800 },
  { name: 'Apr', emails: 2780, voice: 3908, podcasts: 2400 },
  { name: 'May', emails: 1890, voice: 4800, podcasts: 2100 },
  { name: 'Jun', emails: 2390, voice: 3800, podcasts: 2900 },
];

const engagementData = [
  { name: 'Email Campaigns', value: 45, color: '#8B5CF6' },
  { name: 'Voice Messages', value: 30, color: '#3B82F6' },
  { name: 'Podcast Episodes', value: 15, color: '#10B981' },
  { name: 'Avatar Videos', value: 10, color: '#F59E0B' },
];

const kpiData = [
  { 
    icon: Mail, 
    label: 'Email Opens', 
    value: '24,582', 
    change: '+12.5%', 
    color: 'text-green-400',
    bgColor: 'from-green-500/20 to-emerald-500/20',
  },
  { 
    icon: MousePointer, 
    label: 'Click Rate', 
    value: '8.9%', 
    change: '+3.2%', 
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
  },
  { 
    icon: Mic, 
    label: 'Voice Plays', 
    value: '15,247', 
    change: '+18.7%', 
    color: 'text-purple-400',
    bgColor: 'from-purple-500/20 to-pink-500/20',
  },
  { 
    icon: Radio, 
    label: 'Podcast Downloads', 
    value: '9,156', 
    change: '+25.1%', 
    color: 'text-orange-400',
    bgColor: 'from-orange-500/20 to-red-500/20',
  },
];

const aiSuggestions = [
  "Email campaigns perform 23% better on Tuesday mornings",
  "Voice messages have higher engagement in the 6-8 PM timeframe",
  "Your podcast audience prefers 15-minute episodes over longer formats",
  "Adding personalization increased click rates by 45% in recent campaigns",
  "Content with questions in subject lines get 18% more opens",
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">AvatoDash™ Analytics</h1>
            <p className="text-gray-400">Comprehensive insights and AI-driven recommendations</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['1w', '1m', '3m', '6m', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${kpi.bgColor} border-gray-600`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                  <span className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
                <div className="text-gray-300 text-sm">{kpi.label}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Performance Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Campaign Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="emails" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="voice" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="podcasts" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Engagement Distribution */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Engagement Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2 mt-4">
            {engagementData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span>AI-Powered Insights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiSuggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{suggestion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { type: 'email', title: 'Q4 Newsletter Campaign', status: 'completed', time: '2 hours ago' },
            { type: 'voice', title: 'Product Launch Voice Blast', status: 'in-progress', time: '4 hours ago' },
            { type: 'podcast', title: 'Marketing Tips Episode #12', status: 'completed', time: '1 day ago' },
            { type: 'avatar', title: 'CEO Welcome Video', status: 'completed', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${
                activity.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
              }`} />
              <div className="flex-1">
                <div className="text-white font-medium">{activity.title}</div>
                <div className="text-gray-400 text-sm capitalize">{activity.type} • {activity.time}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                activity.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {activity.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}