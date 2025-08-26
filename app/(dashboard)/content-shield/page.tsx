"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield,
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Download,
  X,
} from "lucide-react";

interface ScanResult {
  id: string;
  title: string;
  plagiarism: number;
  seo: number;
  date: string;
  status: "clean" | "warning" | "flagged";
}

export default function ContentShield() {
  const [content, setContent] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<ScanResult[]>([
    {
      id: "1",
      title: "Marketing Blog Post - Q4 Strategy",
      plagiarism: 2,
      seo: 89,
      date: "2024-01-15",
      status: "clean",
    },
    {
      id: "2",
      title: "Product Launch Email Campaign",
      plagiarism: 15,
      seo: 67,
      date: "2024-01-14",
      status: "warning",
    },
    {
      id: "3",
      title: "Social Media Content Calendar",
      plagiarism: 45,
      seo: 34,
      date: "2024-01-13",
      status: "flagged",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleScan = async () => {
    if (!content.trim()) return;

    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      const newResults = {
        plagiarism: Math.floor(Math.random() * 20),
        seo: Math.floor(Math.random() * 40) + 60,
        readability: Math.floor(Math.random() * 30) + 70,
        suggestions: [
          "Add more headings to improve readability",
          "Include more relevant keywords",
          "Reduce sentence length for better flow",
          "Add internal links for SEO value",
        ],
      };

      setScanResults(newResults);
      setIsScanning(false);

      const newHistoryItem: ScanResult = {
        id: Date.now().toString(),
        title: content.substring(0, 50) + "...",
        plagiarism: newResults.plagiarism,
        seo: newResults.seo,
        date: new Date().toISOString().split("T")[0],
        status:
          newResults.plagiarism > 20
            ? "flagged"
            : newResults.plagiarism > 10
            ? "warning"
            : "clean",
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "flagged":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getScoreColor = (score: number, reverse = false) => {
    if (reverse) {
      return score < 10
        ? "text-green-400"
        : score < 20
        ? "text-yellow-400"
        : "text-red-400";
    }
    return score > 80
      ? "text-green-400"
      : score > 60
      ? "text-yellow-400"
      : "text-red-400";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile({ name: file.name, size: file.size });
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setContent(text as string);
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </Card>
          <Card className="lg:col-span-2">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Loading Content Shield...</p>
            </div>
          </Card>
        </div>
        <Card>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
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
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Smart Content Shield™
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Scan your content for originality, plagiarism, and SEO optimization.
          Get AI-powered suggestions to improve your content quality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">
            Content Input
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Paste Your Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content here for plagiarism and SEO analysis..."
                className="w-full h-40 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".txt,.docx"
            />
            {uploadedFile ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-300 truncate">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(uploadedFile.size / 1024).toFixed(2)} KB
                </p>
                <button
                  onClick={handleRemoveFile}
                  className="mt-2 text-red-500 hover:text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports .txt, .docx files
                </p>
              </div>
            )}

            <GradientButton
              onClick={handleScan}
              disabled={!content.trim() || isScanning}
              className="w-full"
            >
              {isScanning ? "Scanning Content..." : "Run Content Scan"}
            </GradientButton>
          </div>
        </Card>

        {/* Results Card */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">
            Scan Results
          </h2>

          {isScanning && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Analyzing content with AI...</p>
            </div>
          )}

          {scanResults && !isScanning && (
            <div className="space-y-6">
              {/* Score Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      scanResults.plagiarism,
                      true
                    )}`}
                  >
                    {scanResults.plagiarism}%
                  </div>
                  <div className="text-sm text-gray-400">Plagiarism</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      scanResults.seo
                    )}`}
                  >
                    {scanResults.seo}%
                  </div>
                  <div className="text-sm text-gray-400">SEO Score</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      scanResults.readability
                    )}`}
                  >
                    {scanResults.readability}%
                  </div>
                  <div className="text-sm text-gray-400">Readability</div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  AI Suggestions
                </h3>
                <div className="space-y-2">
                  {scanResults.suggestions.map(
                    (suggestion: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-900/30 rounded-lg"
                      >
                        <FileText className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          {suggestion}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <GradientButton className="flex-1">
                  Generate Report
                </GradientButton>
                <GradientButton className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </GradientButton>
              </div>
            </div>
          )}

          {!scanResults && !isScanning && (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                Enter content above and click scan to see results
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* History Card */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Scan History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">
                  Content Title
                </th>
                <th className="text-left py-3 px-4 text-gray-300">
                  Plagiarism %
                </th>
                <th className="text-left py-3 px-4 text-gray-300">SEO Score</th>
                <th className="text-left py-3 px-4 text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-800 hover:bg-gray-800/30"
                >
                  <td className="py-3 px-4 text-gray-200">{item.title}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${getScoreColor(
                      item.plagiarism,
                      true
                    )}`}
                  >
                    {item.plagiarism}%
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold ${getScoreColor(
                      item.seo
                    )}`}
                  >
                    {item.seo}%
                  </td>
                  <td className="py-3 px-4 text-gray-400">{item.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className="capitalize text-gray-300">
                        {item.status}
                      </span>
                    </div>
                  </td>
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
