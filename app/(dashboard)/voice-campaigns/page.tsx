"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  Mic,
  Upload,
  Play,
  Pause,
  Send,
  Users,
  Phone,
  MessageSquare,
  Volume2,
  FileAudio,
  TrendingUp,
  Eye,
} from "lucide-react";

interface VoiceCampaign {
  id: string;
  title: string;
  recipients: number;
  deliveryRate: number;
  playRate: number;
  engagementRate: number;
  status: "sent" | "sending" | "scheduled" | "draft";
  date: string;
  voiceType: "recorded" | "ai-generated";
}

export default function VoiceCampaigns() {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [messageType, setMessageType] = useState<"upload" | "text-to-speech">(
    "text-to-speech"
  );
  const [textMessage, setTextMessage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("professional-female");
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [personalizeMessages, setPersonalizeMessages] = useState(true);

  const [campaigns, setCampaigns] = useState<VoiceCampaign[]>([
    {
      id: "1",
      title: "Product Launch Announcement",
      recipients: 5420,
      deliveryRate: 96.8,
      playRate: 78.5,
      engagementRate: 23.4,
      status: "sent",
      date: "2024-01-15",
      voiceType: "ai-generated",
    },
    {
      id: "2",
      title: "Holiday Greetings Campaign",
      recipients: 8930,
      deliveryRate: 98.2,
      playRate: 85.7,
      engagementRate: 31.2,
      status: "sent",
      date: "2024-01-14",
      voiceType: "recorded",
    },
    {
      id: "3",
      title: "Customer Survey Request",
      recipients: 2340,
      deliveryRate: 94.5,
      playRate: 67.3,
      engagementRate: 18.9,
      status: "sending",
      date: "2024-01-13",
      voiceType: "ai-generated",
    },
  ]);

  const voiceOptions = [
    {
      value: "professional-female",
      label: "Professional Female",
      accent: "American",
    },
    {
      value: "professional-male",
      label: "Professional Male",
      accent: "American",
    },
    { value: "friendly-female", label: "Friendly Female", accent: "British" },
    { value: "friendly-male", label: "Friendly Male", accent: "Australian" },
    {
      value: "authoritative-male",
      label: "Authoritative Male",
      accent: "American",
    },
    { value: "warm-female", label: "Warm Female", accent: "Canadian" },
  ];

  const handleSendCampaign = async () => {
    if (!campaignTitle || (!textMessage && !uploadedAudio)) return;

    setIsSending(true);

    setTimeout(() => {
      const newCampaign: VoiceCampaign = {
        id: Date.now().toString(),
        title: campaignTitle,
        recipients: Math.floor(Math.random() * 8000) + 2000,
        deliveryRate: Math.floor(Math.random() * 5) + 95,
        playRate: Math.floor(Math.random() * 20) + 70,
        engagementRate: Math.floor(Math.random() * 15) + 15,
        status: "sent",
        date: new Date().toISOString().split("T")[0],
        voiceType: messageType === "upload" ? "recorded" : "ai-generated",
      };

      setCampaigns((prev) => [newCampaign, ...prev]);
      setIsSending(false);

      // Reset form
      setCampaignTitle("");
      setTextMessage("");
      setUploadedAudio(null);
    }, 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "text-green-400 bg-green-500/20";
      case "sending":
        return "text-yellow-400 bg-yellow-500/20";
      case "scheduled":
        return "text-blue-400 bg-blue-500/20";
      case "draft":
        return "text-gray-400 bg-gray-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Voice Campaigns</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create and distribute AI-powered voice marketing messages with
          personalized delivery and comprehensive analytics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Creation Card */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">
            Create Voice Campaign
          </h2>
          <div className="space-y-6">
            {/* Campaign Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                placeholder="Enter campaign title..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Message Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Message Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setMessageType("text-to-speech")}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    messageType === "text-to-speech"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-white font-medium">Text-to-Speech</div>
                  <div className="text-gray-400 text-sm">
                    AI Generated Voice
                  </div>
                </button>
                <button
                  onClick={() => setMessageType("upload")}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    messageType === "upload"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <FileAudio className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                  <div className="text-white font-medium">Upload Audio</div>
                  <div className="text-gray-400 text-sm">
                    Pre-recorded Message
                  </div>
                </button>
              </div>
            </div>

            {/* Text-to-Speech Input */}
            {messageType === "text-to-speech" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Voice Message Script
                  </label>
                  <textarea
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    placeholder="Hello {{name}}, we're excited to share our latest product with you..."
                    className="w-full h-32 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {"{{name}}"}, {"{{company}}"} for personalization •
                    Estimated duration: {Math.ceil(textMessage.length / 180)}{" "}
                    seconds
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    AI Voice Selection
                  </label>
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {voiceOptions.map((voice) => (
                      <option key={voice.value} value={voice.value}>
                        {voice.label} ({voice.accent})
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Audio Upload */}
            {messageType === "upload" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Audio File
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">
                    Drop audio file here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports MP3, WAV files up to 10MB
                  </p>
                </div>
              </div>
            )}

            {/* Recipients Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipients List
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">
                  Upload CSV with phone numbers and contact data
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Include columns: phone, name, company, etc.
                </p>
              </div>
            </div>

            {/* Personalization Options */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="personalize-messages"
                checked={personalizeMessages}
                onChange={(e) => setPersonalizeMessages(e.target.checked)}
                className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="personalize-messages" className="text-gray-300">
                Enable AI-powered message personalization
              </label>
            </div>

            <GradientButton
              onClick={handleSendCampaign}
              disabled={
                !campaignTitle || (!textMessage && !uploadedAudio) || isSending
              }
              className="w-full flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>
                {isSending ? "Sending Campaign..." : "Send Voice Campaign"}
              </span>
            </GradientButton>
          </div>
        </Card>

        {/* Preview Card */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">
            Message Preview
          </h2>
          <div className="space-y-4">
            {/* Voice Preview */}
            {messageType === "text-to-speech" && textMessage && (
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-400">Voice Preview</div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Play className="w-4 h-4 text-purple-400 ml-0.5" />
                    )}
                  </button>
                </div>
                <div className="text-white text-sm mb-2">
                  {voiceOptions.find((v) => v.value === selectedVoice)?.label}
                </div>
                <div className="bg-gray-800 rounded-full h-1">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full w-1/3"></div>
                </div>
              </div>
            )}

            {/* Message Content */}
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Message Content:</div>
              <div className="text-gray-300 text-sm">
                {messageType === "text-to-speech"
                  ? textMessage ||
                    "Your voice message script will appear here..."
                  : uploadedAudio
                  ? uploadedAudio.name
                  : "Upload an audio file to preview"}
              </div>
            </div>

            {/* Campaign Stats Preview */}
            <div className="space-y-3">
              <div className="text-sm text-gray-400">Expected Performance:</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="text-lg font-bold text-green-400">94%</div>
                  <div className="text-xs text-gray-400">Delivery Rate</div>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">76%</div>
                  <div className="text-xs text-gray-400">Play Rate</div>
                </div>
              </div>
            </div>

            {personalizeMessages && (
              <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">
                    AI Personalization Active
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Messages will be customized based on recipient data and
                  engagement history.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Campaign History */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">
          Campaign History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">
                  Campaign Title
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Recipients
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Delivery Rate
                </th>
                <th className="text-left py-3 px-4 text-gray-300">Play Rate</th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Engagement
                </th>
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
                  <td className="py-3 px-4 text-white font-medium">
                    {campaign.title}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{campaign.recipients.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-green-400 font-semibold">
                    {campaign.deliveryRate}%
                  </td>
                  <td className="py-3 px-4 text-blue-400 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Play className="w-4 h-4" />
                      <span>{campaign.playRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">
                    {campaign.engagementRate}%
                  </td>
                  <td className="py-3 px-4 text-gray-300 capitalize">
                    {campaign.voiceType.replace("-", " ")}
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
                    <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
