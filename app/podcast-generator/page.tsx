"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  Radio,
  Upload,
  Play,
  Pause,
  Download,
  Music,
  Mic,
  FileText,
  Volume2,
  Clock,
  Headphones,
} from "lucide-react";

interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  downloads: number;
  date: string;
  status: "published" | "draft" | "processing";
  thumbnail: string;
}

export default function PodcastGenerator() {
  const [script, setScript] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("professional-male");
  const [addIntroOutro, setAddIntroOutro] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([
    {
      id: "1",
      title: "AI Marketing Trends 2024",
      duration: "15:32",
      downloads: 1247,
      date: "2024-01-15",
      status: "published",
      thumbnail:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "2",
      title: "Content Creation with AI",
      duration: "12:18",
      downloads: 892,
      date: "2024-01-14",
      status: "published",
      thumbnail:
        "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "3",
      title: "Voice Technology Deep Dive",
      duration: "18:45",
      downloads: 0,
      date: "2024-01-13",
      status: "processing",
      thumbnail:
        "https://images.pexels.com/photos/7688367/pexels-photo-7688367.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]);

  const voiceOptions = [
    {
      value: "professional-male",
      label: "Professional Male",
      accent: "American",
    },
    {
      value: "professional-female",
      label: "Professional Female",
      accent: "American",
    },
    { value: "casual-male", label: "Casual Male", accent: "British" },
    { value: "casual-female", label: "Casual Female", accent: "Australian" },
    { value: "narrator-deep", label: "Deep Narrator", accent: "American" },
    { value: "narrator-warm", label: "Warm Narrator", accent: "Canadian" },
  ];

  const handleGenerate = async () => {
    if (!script.trim() || !episodeTitle.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedAudio("generated-podcast.mp3");
      setIsGenerating(false);

      // Add to episodes
      const newEpisode: PodcastEpisode = {
        id: Date.now().toString(),
        title: episodeTitle,
        duration: `${Math.floor(Math.random() * 10) + 10}:${Math.floor(
          Math.random() * 60
        )
          .toString()
          .padStart(2, "0")}`,
        downloads: 0,
        date: new Date().toISOString().split("T")[0],
        status: "draft",
        thumbnail:
          "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400",
      };

      setEpisodes((prev) => [newEpisode, ...prev]);
    }, 6000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-400 bg-green-500/20";
      case "processing":
        return "text-yellow-400 bg-yellow-500/20";
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
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            AI Podcast Generator
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform your scripts into professional podcast episodes with
          AI-powered voice synthesis and audio enhancement.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">
            Create Episode
          </h2>
          <div className="space-y-6">
            {/* Episode Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Episode Title
              </label>
              <input
                type="text"
                value={episodeTitle}
                onChange={(e) => setEpisodeTitle(e.target.value)}
                placeholder="Enter episode title..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Script Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Podcast Script
              </label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Welcome to today's episode. In this show, we'll discuss..."
                className="w-full h-32 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Estimated duration: {Math.ceil(script.length / 150)} minutes
              </p>
            </div>

            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                AI Voice
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

            {/* Audio Options */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={addIntroOutro}
                  onChange={(e) => setAddIntroOutro(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Music className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Add intro/outro music</span>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={backgroundMusic}
                  onChange={(e) => setBackgroundMusic(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Subtle background music</span>
                </div>
              </label>
            </div>

            <GradientButton
              onClick={handleGenerate}
              disabled={!script.trim() || !episodeTitle.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating Podcast..." : "Generate Episode"}
            </GradientButton>
          </div>
        </Card>

        {/* Output Card */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">
            Generated Episode
          </h2>

          {isGenerating && (
            <div className="text-center py-12">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-400 mb-2">
                Generating your podcast episode...
              </p>
              <p className="text-sm text-gray-500">
                Processing voice synthesis and audio enhancement
              </p>
              <div className="mt-4 bg-gray-800 rounded-full h-2 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse w-2/3"></div>
              </div>
            </div>
          )}

          {generatedAudio && !isGenerating && (
            <div className="space-y-6">
              {/* Audio Player */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Radio className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {episodeTitle}
                    </h3>
                    <p className="text-gray-400">
                      Generated with{" "}
                      {
                        voiceOptions.find((v) => v.value === selectedVoice)
                          ?.label
                      }
                    </p>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>2:15</span>
                      <span>12:30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Episode Details */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-lg font-semibold text-white">12:30</div>
                  <div className="text-sm text-gray-400">Duration</div>
                </div>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-lg font-semibold text-white">48 kHz</div>
                  <div className="text-sm text-gray-400">Quality</div>
                </div>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-lg font-semibold text-white">
                    15.2 MB
                  </div>
                  <div className="text-sm text-gray-400">File Size</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <GradientButton className="flex-1 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download MP3</span>
                </GradientButton>
                <GradientButton className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                  Publish to RSS
                </GradientButton>
              </div>
            </div>
          )}

          {!generatedAudio && !isGenerating && (
            <div className="text-center py-12">
              <Radio className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Enter your script above to generate a podcast episode
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Episodes History */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">
          Episode Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <div key={episode.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      episode.status
                    )}`}
                  >
                    {episode.status}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-white text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{episode.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white text-xs">
                    <Headphones className="w-3 h-3" />
                    <span>{episode.downloads}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
                {episode.title}
              </h3>
              <div className="text-sm text-gray-400">{episode.date}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
