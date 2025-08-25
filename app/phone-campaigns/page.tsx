"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { GradientButton } from "@/components/ui/GradientButton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  Upload,
  Play,
  Pause,
  Send,
  Users,
  FileAudio,
  Shield,
  Clock,
  TrendingUp,
  Eye,
  Download,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Calendar,
  Settings,
  Mic,
  Volume2,
  Timer,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface PhoneCampaign {
  id: string;
  title: string;
  listSize: number;
  answerRate: number;
  avgDuration: string;
  callbackRate: number;
  cost: number;
  status: "completed" | "running" | "scheduled" | "paused" | "failed";
  date: string;
  voiceType: "ai-generated" | "recorded" | "live-transfer";
}

const callOutcomeData = [
  { name: "9:00", answered: 45, voicemail: 23, busy: 12, failed: 8 },
  { name: "9:15", answered: 52, voicemail: 28, busy: 15, failed: 5 },
  { name: "9:30", answered: 48, voicemail: 31, busy: 18, failed: 7 },
  { name: "9:45", answered: 61, voicemail: 25, busy: 14, failed: 4 },
  { name: "10:00", answered: 58, voicemail: 29, busy: 16, failed: 6 },
  { name: "10:15", answered: 65, voicemail: 22, busy: 13, failed: 3 },
];

const campaignFunnelData = [
  { name: "Calls Placed", value: 2500, color: "#8B5CF6" },
  { name: "Answered", value: 1420, color: "#3B82F6" },
  { name: "Engaged", value: 890, color: "#10B981" },
  { name: "Callbacks", value: 156, color: "#F59E0B" },
];

export default function PhoneCampaigns() {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [selectedCallerId, setSelectedCallerId] = useState("");
  const [targetList, setTargetList] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [scriptType, setScriptType] = useState<"text" | "upload">("text");
  const [scriptText, setScriptText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("professional-female");
  const [scheduleType, setScheduleType] = useState<"immediate" | "scheduled">(
    "immediate"
  );
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [maxRetries, setMaxRetries] = useState("3");
  const [callThrottle, setCallThrottle] = useState("10");
  const [vmDetection, setVmDetection] = useState(true);
  const [dncSuppression, setDncSuppression] = useState(true);
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);

  const [campaigns, setCampaigns] = useState<PhoneCampaign[]>([
    {
      id: "1",
      title: "Q4 Product Launch Calls",
      listSize: 5420,
      answerRate: 68.3,
      avgDuration: "2:45",
      callbackRate: 12.7,
      cost: 1250.4,
      status: "completed",
      date: "2024-01-15",
      voiceType: "ai-generated",
    },
    {
      id: "2",
      title: "Customer Survey Campaign",
      listSize: 3200,
      answerRate: 71.5,
      avgDuration: "1:58",
      callbackRate: 8.9,
      cost: 820.15,
      status: "running",
      date: "2024-01-14",
      voiceType: "recorded",
    },
    {
      id: "3",
      title: "Holiday Promotion Calls",
      listSize: 8900,
      answerRate: 64.7,
      avgDuration: "3:12",
      callbackRate: 15.3,
      cost: 2180.9,
      status: "completed",
      date: "2024-01-13",
      voiceType: "ai-generated",
    },
  ]);

  const callerIdOptions = [
    { value: "+1-555-0123", label: "(555) 012-3456 - Business Main" },
    { value: "+1-555-0124", label: "(555) 012-3457 - Sales Team" },
    { value: "+1-555-0125", label: "(555) 012-3458 - Support" },
  ];

  const voiceOptions = [
    {
      value: "professional-female",
      label: "Professional Female",
      provider: "ElevenLabs",
    },
    {
      value: "professional-male",
      label: "Professional Male",
      provider: "ElevenLabs",
    },
    {
      value: "friendly-female",
      label: "Friendly Female",
      provider: "Azure TTS",
    },
    {
      value: "authoritative-male",
      label: "Authoritative Male",
      provider: "ElevenLabs",
    },
  ];

  const targetListOptions = [
    { value: "prospects-q4", label: "Q4 Prospects (2,450 contacts)" },
    {
      value: "existing-customers",
      label: "Existing Customers (1,890 contacts)",
    },
    { value: "webinar-leads", label: "Webinar Leads (3,200 contacts)" },
    { value: "trial-users", label: "Trial Users (890 contacts)" },
  ];

  // Mock real-time call stats
  const [callStats, setCallStats] = useState({
    total: 2500,
    sent: 1847,
    ringing: 23,
    answered: 1420,
    voicemail: 347,
    failed: 57,
    answerRate: 68.3,
    avgDuration: "2:45",
    callbackRate: 12.7,
    voicemailRate: 18.9,
    estimatedCost: 445.6,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates when campaign is running
  useEffect(() => {
    if (isRunning && !isPaused) {
      const interval = setInterval(() => {
        setCallStats((prev) => ({
          ...prev,
          sent: Math.min(
            prev.total,
            prev.sent + Math.floor(Math.random() * 15) + 5
          ),
          ringing: Math.floor(Math.random() * 30) + 10,
          answered: prev.answered + Math.floor(Math.random() * 8) + 2,
          voicemail: prev.voicemail + Math.floor(Math.random() * 4) + 1,
          failed: prev.failed + Math.floor(Math.random() * 2),
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning, isPaused]);

  const handleStartCampaign = () => {
    if (!campaignTitle || !selectedCallerId || !targetList || !consentConfirmed)
      return;
    setIsRunning(true);
  };

  const handlePauseCampaign = () => {
    setIsPaused(!isPaused);
  };

  const handleStopCampaign = () => {
    setIsRunning(false);
    setIsPaused(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-500/20";
      case "running":
        return "text-blue-400 bg-blue-500/20";
      case "scheduled":
        return "text-purple-400 bg-purple-500/20";
      case "paused":
        return "text-yellow-400 bg-yellow-500/20";
      case "failed":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-lg mx-auto" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </Card>
          <Card className="lg:col-span-2">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="text-center py-8">
              <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Loading Phone Campaign Builder...</p>
            </div>
          </Card>
        </div>
        <Card>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Automated Phone Call Campaigns
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create and manage automated phone campaigns with AI-powered voice
          synthesis, real-time analytics, and full compliance controls.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Builder Card */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-green-400" />
            <span>Campaign Builder</span>
          </h2>
          <div className="space-y-6">
            {/* Basic Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="Enter campaign name..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Caller ID (Provisioned Numbers)
              </label>
              <select
                value={selectedCallerId}
                onChange={(e) => setSelectedCallerId(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Select caller ID...</option>
                {callerIdOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target List (From CRM)
              </label>
              <select
                value={targetList}
                onChange={(e) => setTargetList(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="">Select target list...</option>
                {targetListOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>

            {/* Script Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Call Script
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => setScriptType("text")}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    scriptType === "text"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Mic className="w-4 h-4 inline mr-1" />
                  Text-to-Speech
                </button>
                <button
                  onClick={() => setScriptType("upload")}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    scriptType === "upload"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <FileAudio className="w-4 h-4 inline mr-1" />
                  Upload Audio
                </button>
              </div>

              {scriptType === "text" ? (
                <>
                  <textarea
                    value={scriptText}
                    onChange={(e) => setScriptText(e.target.value)}
                    placeholder="Hello {{name}}, this is calling from {{company}}. I wanted to personally reach out about..."
                    className="w-full h-24 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {"{{name}}"}, {"{{company}}"} for personalization
                  </p>
                </>
              ) : (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Upload audio file</p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP3, WAV up to 10MB
                  </p>
                </div>
              )}
            </div>

            {scriptType === "text" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  AI Voice Selection
                </label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                >
                  {voiceOptions.map((voice) => (
                    <option key={voice.value} value={voice.value}>
                      {voice.label} ({voice.provider})
                    </option>
                  ))}
                </select>
                <button className="mt-2 text-green-400 hover:text-green-300 text-sm flex items-center space-x-1">
                  <Play className="w-3 h-3" />
                  <span>Test Call to Me</span>
                </button>
              </div>
            )}

            {/* Schedule Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Campaign Schedule
              </label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => setScheduleType("immediate")}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    scheduleType === "immediate"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Activity className="w-4 h-4 inline mr-1" />
                  Start Now
                </button>
                <button
                  onClick={() => setScheduleType("scheduled")}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                    scheduleType === "scheduled"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Schedule
                </button>
              </div>

              {scheduleType === "scheduled" && (
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="p-2 bg-gray-900/50 border border-gray-600 rounded text-white focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="p-2 bg-gray-900/50 border border-gray-600 rounded text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Advanced Settings
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400">
                    Call Throttle (per min)
                  </label>
                  <input
                    type="number"
                    value={callThrottle}
                    onChange={(e) => setCallThrottle(e.target.value)}
                    className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">Max Retries</label>
                  <input
                    type="number"
                    value={maxRetries}
                    onChange={(e) => setMaxRetries(e.target.value)}
                    className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Compliance Settings */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Compliance Controls
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={vmDetection}
                  onChange={(e) => setVmDetection(e.target.checked)}
                  className="w-4 h-4 text-green-500 bg-gray-900 border-gray-600 rounded focus:ring-green-500"
                />
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">
                    Voicemail Detection
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={dncSuppression}
                  onChange={(e) => setDncSuppression(e.target.checked)}
                  className="w-4 h-4 text-green-500 bg-gray-900 border-gray-600 rounded focus:ring-green-500"
                />
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">
                    DNC Suppression List
                  </span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <input
                  type="checkbox"
                  checked={consentConfirmed}
                  onChange={(e) => setConsentConfirmed(e.target.checked)}
                  className="w-4 h-4 text-amber-500 bg-gray-900 border-gray-600 rounded focus:ring-amber-500 mt-0.5"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">
                      Consent Required
                    </span>
                  </div>
                  <span className="text-gray-300 text-xs">
                    I confirm all contacts have provided consent to receive
                    calls and comply with TCPA regulations.
                  </span>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <GradientButton
                onClick={handleStartCampaign}
                disabled={
                  !campaignTitle ||
                  !selectedCallerId ||
                  !targetList ||
                  !consentConfirmed ||
                  isRunning
                }
                className="w-full flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>
                  {scheduleType === "immediate"
                    ? "Start Campaign Now"
                    : "Schedule Campaign"}
                </span>
              </GradientButton>

              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors">
                  Save Draft
                </button>
                <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm transition-colors">
                  Test Call
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Status/Results Card */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span>Campaign Status</span>
            </h2>
            {isRunning && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePauseCampaign}
                  className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors"
                >
                  {isPaused ? (
                    <Play className="w-4 h-4" />
                  ) : (
                    <Pause className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleStopCampaign}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Stop
                </button>
              </div>
            )}
          </div>

          {isRunning ? (
            <div className="space-y-6">
              {/* Real-time Progress */}
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-medium">
                    Campaign Running
                  </span>
                  {isPaused && (
                    <span className="text-yellow-400 text-sm">PAUSED</span>
                  )}
                </div>
                <div className="bg-gray-800 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(callStats.sent / callStats.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">
                  {callStats.sent} of {callStats.total} calls completed (
                  {Math.round((callStats.sent / callStats.total) * 100)}%)
                </div>
              </div>

              {/* Live Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {callStats.answered}
                  </div>
                  <div className="text-sm text-gray-400">Answered</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {callStats.ringing}
                  </div>
                  <div className="text-sm text-gray-400">Ringing</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">
                    {callStats.voicemail}
                  </div>
                  <div className="text-sm text-gray-400">Voicemail</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">
                    {callStats.failed}
                  </div>
                  <div className="text-sm text-gray-400">Failed</div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="text-lg font-bold text-green-400">
                    {callStats.answerRate}%
                  </div>
                  <div className="text-xs text-gray-400">Answer Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">
                    {callStats.avgDuration}
                  </div>
                  <div className="text-xs text-gray-400">Avg Duration</div>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="text-lg font-bold text-purple-400">
                    {callStats.callbackRate}%
                  </div>
                  <div className="text-xs text-gray-400">Callback Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="text-lg font-bold text-yellow-400">
                    ${callStats.estimatedCost}
                  </div>
                  <div className="text-xs text-gray-400">Est. Cost</div>
                </div>
              </div>

              {/* Real-time Call Events */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Live Call Stream
                </h3>
                <div className="bg-gray-900/50 rounded-lg p-4 h-40 overflow-y-auto">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>Call to +1-555-0178 answered - Duration: 2:34</span>
                      <span className="text-xs text-gray-500">12:45:23</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-400">
                      <Volume2 className="w-3 h-3" />
                      <span>Call to +1-555-0179 sent to voicemail</span>
                      <span className="text-xs text-gray-500">12:45:21</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>Call to +1-555-0180 answered - Duration: 1:45</span>
                      <span className="text-xs text-gray-500">12:45:18</span>
                    </div>
                    <div className="flex items-center space-x-2 text-red-400">
                      <AlertCircle className="w-3 h-3" />
                      <span>Call to +1-555-0181 failed - Busy signal</span>
                      <span className="text-xs text-gray-500">12:45:15</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Phone className="w-3 h-3" />
                      <span>Call to +1-555-0182 ringing...</span>
                      <span className="text-xs text-gray-500">12:45:12</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Charts */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Call Outcomes Timeline
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={callOutcomeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="answered"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="voicemail"
                        stroke="#F59E0B"
                        strokeWidth={3}
                        dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="busy"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="failed"
                        stroke="#EF4444"
                        strokeWidth={3}
                        dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Campaign Funnel */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Campaign Funnel (Last Completed)
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={campaignFunnelData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {campaignFunnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-2">
                    {campaignFunnelData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-900/30 rounded"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-300 text-sm">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-white font-medium">
                          {item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Placeholder for no active campaign */}
              <div className="text-center py-8">
                <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No active campaign running</p>
                <p className="text-sm text-gray-500">
                  Configure your campaign settings and click "Start Campaign" to
                  begin
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Campaign History & Analytics */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <span>Campaign History & Analytics</span>
          </h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">
                  Campaign Title
                </th>
                <th className="text-left py-3 px-4 text-gray-300">List Size</th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Answer Rate
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Avg Duration
                </th>
                <th className="text-left py-3 px-4 text-gray-300">Callbacks</th>
                <th className="text-left py-3 px-4 text-gray-300">Cost</th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Voice Type
                </th>
                <th className="text-left py-3 px-4 text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b border-gray-800 hover:bg-gray-800/30"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium">
                        {campaign.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{campaign.listSize.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        campaign.answerRate > 70
                          ? "text-green-400"
                          : campaign.answerRate > 50
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {campaign.answerRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-blue-400 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Timer className="w-4 h-4" />
                      <span>{campaign.avgDuration}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">
                    {campaign.callbackRate}%
                  </td>
                  <td className="py-3 px-4 text-yellow-400 font-semibold">
                    ${campaign.cost.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        campaign.voiceType === "ai-generated"
                          ? "bg-purple-500/20 text-purple-400"
                          : campaign.voiceType === "recorded"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {campaign.voiceType.replace("-", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(
                        campaign.status
                      )}`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{campaign.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-green-400 hover:text-green-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">17,520</div>
            <div className="text-sm text-gray-400">Total Calls Made</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">68.2%</div>
            <div className="text-sm text-gray-400">Avg Answer Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">12.3%</div>
            <div className="text-sm text-gray-400">Avg Callback Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">2:31</div>
            <div className="text-sm text-gray-400">Avg Call Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">$4,251</div>
            <div className="text-sm text-gray-400">Total Campaign Cost</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
