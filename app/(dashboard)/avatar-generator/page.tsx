"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Camera,
  Upload,
  Play,
  Download,
  Settings,
  User,
  Mic,
  Sparkles,
  X,
} from "lucide-react";

interface GeneratedVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  size: string;
}

export default function AvatarGenerator() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [avatarStyle, setAvatarStyle] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [enhanceWithAI, setEnhanceWithAI] = useState(true);
  const [usePremium, setUsePremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState<GeneratedVideo[]>([
    {
      id: "1",
      title: "CEO Welcome Message",
      thumbnail:
        "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "2:34",
      date: "2024-01-15",
      size: "45 MB",
    },
    {
      id: "2",
      title: "Product Demo Avatar",
      thumbnail:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "1:45",
      date: "2024-01-14",
      size: "32 MB",
    },
    {
      id: "3",
      title: "Training Video Avatar",
      thumbnail:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "3:12",
      date: "2024-01-13",
      size: "58 MB",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async () => {
    if (!selectedImage || !selectedAudio) return;

    setIsGenerating(true);
    setGeneratedVideo(null);

    setTimeout(() => {
      setGeneratedVideo("generated-avatar-video.mp4");
      setIsGenerating(false);

      const newVideo: GeneratedVideo = {
        id: Date.now().toString(),
        title: `Avatar Video ${new Date().toLocaleTimeString()}`,
        thumbnail:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
        duration: "2:15",
        date: new Date().toISOString().split("T")[0],
        size: "41 MB",
      };

      setHistory((prev) => [newVideo, ...prev]);
    }, 5000);
  };

  const handleImageUploadClick = () => imageInputRef.current?.click();
  const handleAudioUploadClick = () => audioInputRef.current?.click();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setter(e.target.files[0]);
    }
  };

  const handleRemoveFile = (
    setter: React.Dispatch<React.SetStateAction<File | null>>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    setter(null);
    if (ref.current) {
      ref.current.value = "";
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
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
          <Card className="lg:col-span-2">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Loading Avatar Generator...</p>
            </div>
          </Card>
        </div>
        <Card>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
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
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Avatar Generator</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform photos and voice recordings into professional avatar videos
          using cutting-edge AI technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">
            Upload & Configure
          </h2>
          <div className="space-y-6">
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => handleFileChange(e, setSelectedImage)}
              className="hidden"
              accept="image/png, image/jpeg"
            />
            <input
              type="file"
              ref={audioInputRef}
              onChange={(e) => handleFileChange(e, setSelectedAudio)}
              className="hidden"
              accept="audio/mpeg, audio/wav"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Photo
              </label>
              {selectedImage ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <User className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-300 truncate">{selectedImage.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(selectedImage.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={() =>
                      handleRemoveFile(setSelectedImage, imageInputRef)
                    }
                    className="mt-2 text-red-500 hover:text-red-400 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleImageUploadClick}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Upload profile image</p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG up to 10MB
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Voice Sample
              </label>
              {selectedAudio ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Mic className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-300 truncate">{selectedAudio.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(selectedAudio.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={() =>
                      handleRemoveFile(setSelectedAudio, audioInputRef)
                    }
                    className="mt-2 text-red-500 hover:text-red-400 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleAudioUploadClick}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Upload audio file</p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP3, WAV up to 50MB
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Avatar Style
              </label>
              <select
                value={avatarStyle}
                onChange={(e) => setAvatarStyle(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="animated">Animated</option>
                <option value="realistic">Ultra Realistic</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enhanceWithAI}
                  onChange={(e) => setEnhanceWithAI(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">
                    Enhance with Stable Diffusion
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={usePremium}
                  onChange={(e) => setUsePremium(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Use Premium D-ID API</span>
                </div>
              </label>
            </div>

            <GradientButton
              onClick={handleGenerate}
              disabled={!selectedImage || !selectedAudio || isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating Video..." : "Generate Avatar Video"}
            </GradientButton>
          </div>
        </Card>

        {/* Output Card */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">
            Generated Video
          </h2>

          {isGenerating && (
            <div className="text-center py-12">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-400 mb-2">
                Creating your avatar video...
              </p>
              <p className="text-sm text-gray-500">This may take 3-5 minutes</p>
              <div className="mt-4 bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse w-1/3"></div>
              </div>
            </div>
          )}

          {generatedVideo && !isGenerating && (
            <div className="space-y-6">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Generated Avatar"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="text-white text-sm">00:00 / 02:15</div>
                  <div className="bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                    HD 1080p
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-lg font-semibold text-white">2:15</div>
                  <div className="text-sm text-gray-400">Duration</div>
                </div>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-lg font-semibold text-white">1080p</div>
                  <div className="text-sm text-gray-400">Resolution</div>
                </div>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-lg font-semibold text-white">41 MB</div>
                  <div className="text-sm text-gray-400">File Size</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <GradientButton className="flex-1 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download MP4</span>
                </GradientButton>
                <GradientButton className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                  Share Video
                </GradientButton>
              </div>
            </div>
          )}

          {!generatedVideo && !isGenerating && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Upload an image and audio file to generate your avatar video
              </p>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">
          Generated Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{video.date}</span>
                <span>{video.size}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
