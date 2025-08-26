"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  Mail,
  Upload,
  Send,
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  FileText,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  recipients: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  status: "draft" | "sent" | "scheduled" | "sending";
  date: string;
}

export default function EmailBlaster() {
  const [campaignName, setCampaignName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Q4 Product Launch",
      recipients: 15420,
      deliveryRate: 98.5,
      openRate: 24.8,
      clickRate: 4.2,
      status: "sent",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Holiday Newsletter",
      recipients: 8930,
      deliveryRate: 97.2,
      openRate: 31.5,
      clickRate: 6.8,
      status: "sent",
      date: "2024-01-14",
    },
    {
      id: "3",
      name: "Welcome Series - Part 1",
      recipients: 2340,
      deliveryRate: 99.1,
      openRate: 42.3,
      clickRate: 8.9,
      status: "sending",
      date: "2024-01-13",
    },
  ]);

  const handleSendCampaign = async () => {
    if (!campaignName || !subject || !body) return;

    setIsSending(true);

    setTimeout(() => {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: campaignName,
        recipients: Math.floor(Math.random() * 10000) + 1000,
        deliveryRate: Math.floor(Math.random() * 5) + 95,
        openRate: Math.floor(Math.random() * 20) + 20,
        clickRate: Math.floor(Math.random() * 10) + 3,
        status: "sent",
        date: new Date().toISOString().split("T")[0],
      };

      setCampaigns((prev) => [newCampaign, ...prev]);
      setIsSending(false);

      // Reset form
      setCampaignName("");
      setSubject("");
      setBody("");
    }, 3000);
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
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Text + Email Blaster
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create and send bulk personalized email campaigns with AI-powered
          optimization and advanced analytics.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Form Card */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">
            Create Campaign
          </h2>
          <div className="space-y-6">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Enter campaign name..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Subject Line */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Your compelling subject line..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use {"{{name}}"}, {"{{company}}"}, etc. for personalization
              </p>
            </div>

            {/* Email Body */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Hello {{name}},&#10;&#10;We're excited to share..."
                className="w-full h-40 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Recipients Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipients List
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">
                  Upload CSV file with recipient data
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Include columns: email, name, company, etc.
                </p>
              </div>
            </div>

            {/* AI Personalization */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="ai-personalization"
                checked={aiPersonalization}
                onChange={(e) => setAiPersonalization(e.target.checked)}
                className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="ai-personalization" className="text-gray-300">
                Enable AI Personalization
              </label>
            </div>

            <GradientButton
              onClick={handleSendCampaign}
              disabled={!campaignName || !subject || !body || isSending}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? "Sending Campaign..." : "Send Campaign"}</span>
            </GradientButton>
          </div>
        </Card>

        {/* Preview Card */}
        <Card>
          <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">Subject:</div>
              <div className="text-white font-medium">
                {subject || "Your subject line will appear here"}
              </div>
            </div>

            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 h-40 overflow-y-auto">
              <div className="text-sm text-gray-400 mb-2">Body Preview:</div>
              <div className="text-gray-300 text-sm whitespace-pre-wrap">
                {body || "Your email content will be previewed here..."}
              </div>
            </div>

            {aiPersonalization && (
              <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">
                    AI Personalization Active
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Each email will be customized based on recipient data and
                  engagement patterns.
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
                  Campaign Name
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Recipients
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Delivery Rate
                </th>
                <th className="text-left py-3 px-4 text-gray-300">Open Rate</th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Click Rate
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
                    {campaign.name}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{campaign.recipients.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-green-400 font-semibold">
                    {campaign.deliveryRate}%
                  </td>
                  <td className="py-3 px-4 text-blue-400 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{campaign.openRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-purple-400 font-semibold">
                    <div className="flex items-center space-x-1">
                      <MousePointer className="w-4 h-4" />
                      <span>{campaign.clickRate}%</span>
                    </div>
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
                      <TrendingUp className="w-4 h-4" />
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
