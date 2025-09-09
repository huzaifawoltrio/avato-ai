"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

interface GeneratedVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  size: string;
}

const steps = [
  {
    id: 1,
    title: "Upload Photo",
    icon: User,
    description: "Upload your profile image",
  },
  {
    id: 2,
    title: "Add Voice",
    icon: Mic,
    description: "Upload your voice recording",
  },
  {
    id: 3,
    title: "Customize",
    icon: Settings,
    description: "Choose style and settings",
  },
  {
    id: 4,
    title: "Generate",
    icon: Sparkles,
    description: "Create your avatar video",
  },
  {
    id: 5,
    title: "Download",
    icon: Download,
    description: "Get your final video",
  },
];

export default function AvatarGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [avatarStyle, setAvatarStyle] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [enhanceWithAI, setEnhanceWithAI] = useState(true);
  const [usePremium, setUsePremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);

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
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Progress simulation for generation
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Calculate progress bar width based on current step and completed steps
  const getProgressWidth = () => {
    // If we're generating or done, show full progress for completed steps
    if (currentStep >= 4) {
      return (completedSteps.length / (steps.length - 1)) * 100;
    }
    // Otherwise, show progress up to current step
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  const handleGenerate = async () => {
    if (!selectedImage || !selectedAudio) return;

    setIsGenerating(true);
    setGeneratedVideo(null);
    setCurrentStep(4);
    setGenerationProgress(0);

    // Mark step 3 as completed when starting generation
    if (!completedSteps.includes(3)) {
      setCompletedSteps((prev) => [...prev, 3]);
    }

    setTimeout(() => {
      setGeneratedVideo("generated-avatar-video.mp4");
      setIsGenerating(false);
      setCurrentStep(5);
      setCompletedSteps([1, 2, 3, 4]);
      setGenerationProgress(100);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      if (!completedSteps.includes(1)) {
        setCompletedSteps((prev) => [...prev, 1]);
      }
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedAudio(e.target.files[0]);
      if (!completedSteps.includes(2)) {
        setCompletedSteps((prev) => [...prev, 2]);
      }
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedImage !== null;
      case 2:
        return selectedAudio !== null;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedImage(null);
    setSelectedAudio(null);
    setGeneratedVideo(null);
    setCompletedSteps([]);
    setGenerationProgress(0);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  if (isLoading) {
    return (
      <motion.div
        className="space-y-8 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-lg mx-auto" />
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
        <Card className="p-8">
          <Skeleton className="h-8 w-1/4 mb-6" />
          <div className="flex justify-between mb-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </Card>
      </motion.div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Upload Your Photo
              </h3>
              <p className="text-gray-400">
                Choose a clear, front-facing photo for the best results
              </p>
            </div>

            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/png, image/jpeg"
            />

            <AnimatePresence mode="wait">
              {selectedImage ? (
                <motion.div
                  key="uploaded"
                  className="max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
                    <motion.div
                      className="flex items-center justify-center space-x-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">
                          {selectedImage.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </motion.div>
                    <motion.button
                      onClick={() => {
                        setSelectedImage(null);
                        setCompletedSteps((prev) =>
                          prev.filter((step) => step !== 1)
                        );
                        if (imageInputRef.current)
                          imageInputRef.current.value = "";
                      }}
                      className="mt-4 text-red-400 hover:text-red-300 text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove and choose another
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  onClick={() => imageInputRef.current?.click()}
                  className="max-w-md mx-auto border-2 border-dashed border-gray-600 rounded-lg p-12 cursor-pointer hover:border-purple-500 transition-all duration-300 hover:bg-purple-500/5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-300 text-lg mb-2">
                    Click to upload your photo
                  </p>
                  <p className="text-gray-500 text-sm">JPG, PNG up to 10MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mic className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Add Your Voice
              </h3>
              <p className="text-gray-400">
                Upload a clear audio recording of your voice (10+ seconds
                recommended)
              </p>
            </div>

            <input
              type="file"
              ref={audioInputRef}
              onChange={handleAudioUpload}
              className="hidden"
              accept="audio/mpeg, audio/wav, audio/mp3"
            />

            <AnimatePresence mode="wait">
              {selectedAudio ? (
                <motion.div
                  key="uploaded"
                  className="max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6">
                    <motion.div
                      className="flex items-center justify-center space-x-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">
                          {selectedAudio.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {(selectedAudio.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </motion.div>
                    <motion.button
                      onClick={() => {
                        setSelectedAudio(null);
                        setCompletedSteps((prev) =>
                          prev.filter((step) => step !== 2)
                        );
                        if (audioInputRef.current)
                          audioInputRef.current.value = "";
                      }}
                      className="mt-4 text-red-400 hover:text-red-300 text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove and choose another
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  onClick={() => audioInputRef.current?.click()}
                  className="max-w-md mx-auto border-2 border-dashed border-gray-600 rounded-lg p-12 cursor-pointer hover:border-purple-500 transition-all duration-300 hover:bg-purple-500/5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-300 text-lg mb-2">
                    Click to upload your voice
                  </p>
                  <p className="text-gray-500 text-sm">MP3, WAV up to 50MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Settings className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Customize Your Avatar
              </h3>
              <p className="text-gray-400">
                Choose the style and settings for your avatar video
              </p>
            </div>

            <motion.div
              className="max-w-md mx-auto space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Avatar Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: "professional",
                      label: "Professional",
                      desc: "Business ready",
                    },
                    { value: "casual", label: "Casual", desc: "Relaxed look" },
                    {
                      value: "animated",
                      label: "Animated",
                      desc: "Cartoon style",
                    },
                    {
                      value: "realistic",
                      label: "Ultra Realistic",
                      desc: "Lifelike",
                    },
                  ].map((style, index) => (
                    <motion.button
                      key={style.value}
                      onClick={() => setAvatarStyle(style.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        avatarStyle === style.value
                          ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                          : "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-white font-medium">
                        {style.label}
                      </div>
                      <div className="text-gray-400 text-sm">{style.desc}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                className="space-y-4 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.label
                  className="flex items-center space-x-3 cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="checkbox"
                    checked={enhanceWithAI}
                    onChange={(e) => setEnhanceWithAI(e.target.checked)}
                    className="w-5 h-5 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">
                      AI Enhancement (Recommended)
                    </span>
                  </div>
                </motion.label>

                <motion.label
                  className="flex items-center space-x-3 cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="checkbox"
                    checked={usePremium}
                    onChange={(e) => setUsePremium(e.target.checked)}
                    className="w-5 h-5 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Premium Quality</span>
                  </div>
                </motion.label>
              </motion.div>
            </motion.div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isGenerating ? (
                <motion.div
                  className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Sparkles className="w-10 h-10 text-white" />
              )}
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {isGenerating ? "Creating Your Avatar..." : "Ready to Generate"}
              </h3>
              <p className="text-gray-400">
                {isGenerating
                  ? "This may take 3-5 minutes. Please don't close this window."
                  : "Everything looks good! Click generate to create your avatar video."}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="generating"
                  className="max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="bg-gray-900 rounded-lg p-6">
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Processing...</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${generationProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <motion.p
                      className="text-gray-400 text-sm"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      Analyzing your photo and voice...
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  className="max-w-md mx-auto space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <motion.div
                    className="bg-gray-900 rounded-lg p-4 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[
                      { text: "Photo uploaded", completed: selectedImage },
                      { text: "Voice added", completed: selectedAudio },
                      { text: "Settings configured", completed: true },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 mb-2 last:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-white">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GradientButton
                      onClick={handleGenerate}
                      className="w-full py-4 text-lg"
                    >
                      Generate Avatar Video
                    </GradientButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <Download className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Your Avatar is Ready!
              </h3>
              <p className="text-gray-400">
                Your personalized avatar video has been generated successfully
              </p>
            </div>

            {generatedVideo && (
              <motion.div
                className="max-w-lg mx-auto space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="relative bg-gray-900 rounded-lg overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Generated Avatar"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="text-white text-sm">00:00 / 02:15</div>
                    <div className="bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                      HD 1080p
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-3 gap-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    { label: "Duration", value: "2:15" },
                    { label: "Resolution", value: "1080p" },
                    { label: "File Size", value: "41 MB" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="p-3 bg-gray-900 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-lg font-semibold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GradientButton className="w-full flex items-center justify-center space-x-2 py-3">
                      <Download className="w-5 h-5" />
                      <span>Download Video</span>
                    </GradientButton>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <GradientButton className="px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                      Share
                    </GradientButton>
                  </motion.div>
                </motion.div>

                <motion.button
                  onClick={resetForm}
                  className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Create Another Avatar
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="space-y-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center justify-center space-x-3">
          <motion.div
            className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Camera className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Avatar Generator</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create professional avatar videos in 5 simple steps
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-8">
          {/* Step Progress Bar */}
          <div className="mb-12">
            <motion.div
              className="flex justify-between items-center mb-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Progress Line Background */}
              <div
                className="absolute top-6 left-0 right-0 h-1 bg-gray-700 rounded-full"
                style={{ zIndex: 0 }}
              />

              {/* Animated Progress Line */}
              <motion.div
                className="absolute top-6 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full"
                style={{ zIndex: 1 }}
                initial={{ width: 0 }}
                animate={{ width: `${getProgressWidth()}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {steps.map((step, index) => {
                const isActive = currentStep === step.id;
                const isCompleted = completedSteps.includes(step.id);
                const StepIcon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center space-y-2 flex-1 relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/30"
                          : isActive
                          ? "bg-purple-500 border-purple-500 shadow-lg shadow-purple-500/30"
                          : "bg-gray-700 border-gray-600"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={
                        isActive
                          ? {
                              boxShadow: [
                                "0 0 0 0 rgba(168, 85, 247, 0.4)",
                                "0 0 0 10px rgba(168, 85, 247, 0)",
                                "0 0 0 0 rgba(168, 85, 247, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        scale: { type: "spring", stiffness: 300 },
                        boxShadow: { repeat: Infinity, duration: 2 },
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Check className="w-6 h-6 text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <StepIcon
                              className={`w-6 h-6 ${
                                isActive ? "text-white" : "text-gray-400"
                              }`}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <div className="text-center">
                      <motion.div
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : isCompleted
                            ? "text-green-400"
                            : "text-gray-500"
                        }`}
                        animate={
                          isActive
                            ? {
                                color: ["#ffffff", "#a855f7", "#ffffff"],
                              }
                            : {}
                        }
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {step.title}
                      </motion.div>
                      <div className="text-xs text-gray-500 mt-1">
                        {step.description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex justify-between items-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 1 || isGenerating}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                currentStep === 1 || isGenerating
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white hover:bg-gray-800 hover:scale-105"
              }`}
              whileHover={
                currentStep !== 1 && !isGenerating ? { scale: 1.05 } : {}
              }
              whileTap={
                currentStep !== 1 && !isGenerating ? { scale: 0.95 } : {}
              }
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </motion.button>

            {currentStep < 4 && (
              <motion.div
                whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                whileTap={{ scale: canProceed() ? 0.95 : 1 }}
              >
                <GradientButton
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-8 py-3"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-5 h-5" />
                </GradientButton>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GradientButton onClick={resetForm} className="px-8 py-3">
                  Start Over
                </GradientButton>
              </motion.div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
