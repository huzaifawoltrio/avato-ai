"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { GradientButton } from "@/components/ui/GradientButton";
import {
  Palette,
  Upload,
  Download,
  Sparkles,
  Eye,
  Copy,
  FileText,
  Image,
  Type,
  Layers,
  RefreshCw,
  Check,
  X,
} from "lucide-react";

interface BrandKit {
  id: string;
  businessName: string;
  logoPreview: string;
  colorPalette: string[];
  date: string;
  industry: string;
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  text: string;
}

export default function BrandingAssistant() {
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [industry, setIndustry] = useState("");
  const [coreValues, setCoreValues] = useState("");
  const [brandVision, setBrandVision] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedKit, setGeneratedKit] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("logos");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);

  const [brandHistory, setBrandHistory] = useState<BrandKit[]>([
    {
      id: "1",
      businessName: "TechFlow Solutions",
      logoPreview:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
      colorPalette: ["#6366f1", "#8b5cf6", "#06b6d4", "#64748b", "#1e293b"],
      date: "2024-01-15",
      industry: "Technology",
    },
    {
      id: "2",
      businessName: "Green Leaf Wellness",
      logoPreview:
        "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400",
      colorPalette: ["#10b981", "#059669", "#34d399", "#6b7280", "#374151"],
      date: "2024-01-14",
      industry: "Health & Wellness",
    },
    {
      id: "3",
      businessName: "Urban Coffee Co.",
      logoPreview:
        "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=400",
      colorPalette: ["#92400e", "#d97706", "#fbbf24", "#78716c", "#292524"],
      date: "2024-01-13",
      industry: "Food & Beverage",
    },
  ]);

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Food & Beverage",
    "Fashion",
    "Real Estate",
    "Consulting",
    "Marketing",
    "Manufacturing",
    "Other",
  ];

  const handleLogoUpload = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUploadedLogo({ name: file.name, size: file.size });
    }
  };

  const handleRemoveLogo = () => {
    setUploadedLogo(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const handleGenerateBrandKit = async () => {
    if (!businessName.trim()) return;

    setIsGenerating(true);
    setGeneratedKit(null);

    setTimeout(() => {
      const mockKit = {
        logos: [
          "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400",
          "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400",
          "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=400",
        ],
        colorPalettes: [
          {
            name: "Primary Palette",
            colors: {
              primary: "#6366f1",
              secondary: "#8b5cf6",
              accent: "#06b6d4",
              neutral: "#64748b",
              text: "#1e293b",
            },
          },
          {
            name: "Alternative Palette",
            colors: {
              primary: "#10b981",
              secondary: "#059669",
              accent: "#34d399",
              neutral: "#6b7280",
              text: "#374151",
            },
          },
          {
            name: "Bold Palette",
            colors: {
              primary: "#dc2626",
              secondary: "#ea580c",
              accent: "#facc15",
              neutral: "#737373",
              text: "#262626",
            },
          },
        ],
        taglines: [
          `${businessName}: Innovation Meets Excellence`,
          `Empowering Your Success with ${businessName}`,
          `${businessName} - Where Quality Matters`,
          `Transform Your Future with ${businessName}`,
          `${businessName}: Leading the Way Forward`,
        ],
        fonts: [
          {
            name: "Inter",
            category: "Modern Sans-serif",
            preview: "Aa Bb Cc 123",
          },
          {
            name: "Poppins",
            category: "Friendly Sans-serif",
            preview: "Aa Bb Cc 123",
          },
          {
            name: "Playfair Display",
            category: "Elegant Serif",
            preview: "Aa Bb Cc 123",
          },
          {
            name: "Roboto",
            category: "Clean Sans-serif",
            preview: "Aa Bb Cc 123",
          },
        ],
      };

      setGeneratedKit(mockKit);
      setIsGenerating(false);

      // Add to history
      const newBrandKit: BrandKit = {
        id: Date.now().toString(),
        businessName,
        logoPreview: mockKit.logos[0],
        colorPalette: Object.values(mockKit.colorPalettes[0].colors),
        date: new Date().toISOString().split("T")[0],
        industry: industry || "General",
      };

      setBrandHistory((prev) => [newBrandKit, ...prev]);
    }, 5000);
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const tabs = [
    { id: "logos", label: "Logo Designs", icon: Image },
    { id: "colors", label: "Color Palettes", icon: Palette },
    { id: "taglines", label: "Taglines", icon: Type },
    { id: "fonts", label: "Typography", icon: Layers },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            AI Branding Assistant
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create comprehensive brand identities with AI-generated logos, color
          palettes, taglines, and typography recommendations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Intake Form */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">
            Brand Information
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter your business name..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current Tagline (Optional)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Your current tagline or motto..."
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">Select your industry</option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Core Values
              </label>
              <textarea
                value={coreValues}
                onChange={(e) => setCoreValues(e.target.value)}
                placeholder="Innovation, Quality, Trust, Customer Focus..."
                className="w-full h-20 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Brand Vision
              </label>
              <textarea
                value={brandVision}
                onChange={(e) => setBrandVision(e.target.value)}
                placeholder="Describe your brand's personality, target audience, and goals..."
                className="w-full h-24 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Existing Logo (Optional)
              </label>
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoChange}
                className="hidden"
                accept="image/*"
              />
              {uploadedLogo ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-300 truncate">{uploadedLogo.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(uploadedLogo.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={handleRemoveLogo}
                    className="mt-2 text-red-500 hover:text-red-400 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={handleLogoUpload}
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    Upload existing logo for reference
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, SVG up to 10MB
                  </p>
                </div>
              )}
            </div>

            <GradientButton
              onClick={handleGenerateBrandKit}
              disabled={!businessName.trim() || isGenerating}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isGenerating
                  ? "Generating Brand Kit..."
                  : "Generate Brand Kit"}
              </span>
            </GradientButton>
          </div>
        </Card>

        {/* Brand Kit Results */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Generated Brand Kit
            </h2>
            {generatedKit && (
              <div className="flex space-x-2">
                <GradientButton className="text-sm px-3 py-1">
                  <Download className="w-4 h-4 mr-1" />
                  Export PDF
                </GradientButton>
                <GradientButton className="text-sm px-3 py-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                  <FileText className="w-4 h-4 mr-1" />
                  Canva Template
                </GradientButton>
              </div>
            )}
          </div>

          {isGenerating && (
            <div className="text-center py-12">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-400 mb-2">
                Creating your brand identity...
              </p>
              <p className="text-sm text-gray-500">
                Generating logos, colors, and typography
              </p>
              <div className="mt-4 bg-gray-800 rounded-full h-2 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full animate-pulse w-3/5"></div>
              </div>
            </div>
          )}

          {generatedKit && !isGenerating && (
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "logos" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      AI-Generated Logos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {generatedKit.logos.map((logo: string, index: number) => (
                        <div key={index} className="group relative">
                          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-gray-700 hover:border-purple-500/50 transition-colors">
                            <img
                              src={logo}
                              alt={`Logo ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg mb-4"
                            />
                            <div className="flex justify-center space-x-2">
                              <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-xs hover:bg-purple-500/30">
                                <Download className="w-3 h-3 mr-1 inline" />
                                PNG
                              </button>
                              <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-xs hover:bg-purple-500/30">
                                <Download className="w-3 h-3 mr-1 inline" />
                                SVG
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "colors" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      Color Palettes
                    </h3>
                    <div className="space-y-6">
                      {generatedKit.colorPalettes.map(
                        (palette: any, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-900/50 rounded-lg p-6 border border-gray-700"
                          >
                            <h4 className="text-white font-medium mb-4">
                              {palette.name}
                            </h4>
                            <div className="grid grid-cols-5 gap-4">
                              {Object.entries(palette.colors).map(
                                ([name, color]: [string, any]) => (
                                  <div key={name} className="text-center">
                                    <div
                                      className="w-full h-16 rounded-lg mb-2 cursor-pointer hover:scale-105 transition-transform"
                                      style={{ backgroundColor: color }}
                                      onClick={() =>
                                        copyColorToClipboard(color)
                                      }
                                    />
                                    <div className="text-xs text-gray-400 capitalize mb-1">
                                      {name}
                                    </div>
                                    <div className="flex items-center justify-center space-x-1">
                                      <code className="text-xs text-white bg-gray-800 px-2 py-1 rounded">
                                        {color}
                                      </code>
                                      <button
                                        onClick={() =>
                                          copyColorToClipboard(color)
                                        }
                                        className="text-gray-400 hover:text-white"
                                      >
                                        {copiedColor === color ? (
                                          <Check className="w-3 h-3 text-green-400" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "taglines" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      AI-Generated Taglines
                    </h3>
                    <div className="space-y-3">
                      {generatedKit.taglines.map(
                        (tagline: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors"
                          >
                            <span className="text-white font-medium">
                              {tagline}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => copyColorToClipboard(tagline)}
                                className="text-gray-400 hover:text-white"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button className="text-purple-400 hover:text-purple-300">
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "fonts" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      Typography Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedKit.fonts.map((font: any, index: number) => (
                        <div
                          key={index}
                          className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-colors"
                        >
                          <div className="mb-4">
                            <h4 className="text-white font-semibold text-lg">
                              {font.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {font.category}
                            </p>
                          </div>
                          <div
                            className="text-white text-2xl mb-4"
                            style={{ fontFamily: font.name.replace(" ", "+") }}
                          >
                            {font.preview}
                          </div>
                          <GradientButton className="w-full text-sm">
                            Add to Style Guide
                          </GradientButton>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!generatedKit && !isGenerating && (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Fill in your brand information to generate a comprehensive brand
                kit
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Brand History */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">
          Brand Kit History
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandHistory.map((brand) => (
            <div key={brand.id} className="group cursor-pointer">
              <div className="bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors p-4">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={brand.logoPreview}
                    alt={`${brand.businessName} logo`}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {brand.businessName}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                  {brand.colorPalette.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{brand.industry}</span>
                  <span>{brand.date}</span>
                </div>

                <div className="mt-3 flex space-x-2">
                  <GradientButton className="flex-1 text-xs py-2">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </GradientButton>
                  <button className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors">
                    <Download className="w-3 h-3 mr-1 inline" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
