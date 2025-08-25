'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { GradientButton } from '@/components/ui/GradientButton';
import { 
  Search, 
  Globe, 
  FileText, 
  Download, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  Zap,
} from 'lucide-react';

interface SEOTask {
  id: string;
  url: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  score: number;
  improvements: number;
  date: string;
  type: 'full-audit' | 'keyword-optimization' | 'meta-update';
}

export default function SEOAutomation() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [autoOptimization, setAutoOptimization] = useState(true);
  const [weeklyUpdates, setWeeklyUpdates] = useState(false);

  const [seoTasks, setSeoTasks] = useState<SEOTask[]>([
    {
      id: '1',
      url: 'https://example.com',
      status: 'completed',
      score: 89,
      improvements: 12,
      date: '2024-01-15',
      type: 'full-audit',
    },
    {
      id: '2',
      url: 'https://blog.example.com',
      status: 'in-progress',
      score: 67,
      improvements: 8,
      date: '2024-01-14',
      type: 'keyword-optimization',
    },
    {
      id: '3',
      url: 'https://shop.example.com',
      status: 'completed',
      score: 94,
      improvements: 15,
      date: '2024-01-13',
      type: 'meta-update',
    },
  ]);

  const handleAnalyze = async () => {
    if (!sitemapUrl.trim()) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newResults = {
        overallScore: Math.floor(Math.random() * 30) + 70,
        pages: Math.floor(Math.random() * 50) + 20,
        issues: Math.floor(Math.random() * 15) + 5,
        improvements: [
          'Optimize meta descriptions for 12 pages',
          'Add alt text to 8 images',
          'Improve page loading speed',
          'Fix broken internal links',
          'Add structured data markup',
          'Optimize heading hierarchy',
        ],
        keywords: [
          { keyword: 'AI marketing', difficulty: 'Medium', volume: '2.4K', rank: 15 },
          { keyword: 'marketing automation', difficulty: 'High', volume: '5.1K', rank: 23 },
          { keyword: 'content optimization', difficulty: 'Low', volume: '890', rank: 8 },
        ],
      };
      
      setAnalysisResults(newResults);
      setIsAnalyzing(false);

      // Add to history
      const newTask: SEOTask = {
        id: Date.now().toString(),
        url: sitemapUrl,
        status: 'completed',
        score: newResults.overallScore,
        improvements: newResults.issues,
        date: new Date().toISOString().split('T')[0],
        type: 'full-audit',
      };
      
      setSeoTasks(prev => [newTask, ...prev]);
    }, 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'scheduled': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    return score > 80 ? 'text-green-400' : score > 60 ? 'text-yellow-400' : 'text-red-400';
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">SEO Automation</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Automated SEO optimization and content enhancement with AI-driven insights and recommendations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Card */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-4">SEO Analysis</h2>
          <div className="space-y-6">
            {/* Sitemap URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website URL or Sitemap
              </label>
              <input
                type="url"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://yoursite.com/sitemap.xml"
                className="w-full p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Target Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Keywords (Optional)
              </label>
              <textarea
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
                placeholder="AI marketing, automation tools, content optimization..."
                className="w-full h-20 p-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Automation Options */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={autoOptimization}
                  onChange={(e) => setAutoOptimization(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Auto-apply safe optimizations</span>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={weeklyUpdates}
                  onChange={(e) => setWeeklyUpdates(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-600 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Enable weekly CRON updates</span>
                </div>
              </label>
            </div>

            <GradientButton 
              onClick={handleAnalyze}
              disabled={!sitemapUrl.trim() || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing SEO...' : 'Run SEO Analysis'}
            </GradientButton>
          </div>
        </Card>

        {/* Results Card */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Analysis Results</h2>
          
          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Analyzing your website's SEO performance...</p>
            </div>
          )}

          {analysisResults && !isAnalyzing && (
            <div className="space-y-6">
              {/* Score Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className={`text-2xl font-bold ${getScoreColor(analysisResults.overallScore)}`}>
                    {analysisResults.overallScore}
                  </div>
                  <div className="text-sm text-gray-400">Overall Score</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {analysisResults.pages}
                  </div>
                  <div className="text-sm text-gray-400">Pages Analyzed</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">
                    {analysisResults.issues}
                  </div>
                  <div className="text-sm text-gray-400">Issues Found</div>
                </div>
              </div>

              {/* Improvements */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Recommended Improvements</h3>
                <div className="space-y-2">
                  {analysisResults.improvements.map((improvement: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-900/30 rounded-lg">
                      <Target className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyword Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Keyword Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 text-gray-300">Keyword</th>
                        <th className="text-left py-2 text-gray-300">Difficulty</th>
                        <th className="text-left py-2 text-gray-300">Volume</th>
                        <th className="text-left py-2 text-gray-300">Current Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisResults.keywords.map((keyword: any, index: number) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-2 text-white">{keyword.keyword}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              keyword.difficulty === 'Low' ? 'bg-green-500/20 text-green-400' :
                              keyword.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {keyword.difficulty}
                            </span>
                          </td>
                          <td className="py-2 text-gray-300">{keyword.volume}</td>
                          <td className="py-2 text-purple-400">#{keyword.rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex space-x-3">
                <GradientButton className="flex-1">
                  Apply Optimizations
                </GradientButton>
                <GradientButton className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </GradientButton>
              </div>
            </div>
          )}

          {!analysisResults && !isAnalyzing && (
            <div className="text-center py-8">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Enter a website URL above to start SEO analysis</p>
            </div>
          )}
        </Card>
      </div>

      {/* History Card */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">SEO Task History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">Website URL</th>
                <th className="text-left py-3 px-4 text-gray-300">Type</th>
                <th className="text-left py-3 px-4 text-gray-300">SEO Score</th>
                <th className="text-left py-3 px-4 text-gray-300">Improvements</th>
                <th className="text-left py-3 px-4 text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seoTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-3 px-4 text-white">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="truncate max-w-xs">{task.url}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300 capitalize">
                    {task.type.replace('-', ' ')}
                  </td>
                  <td className={`py-3 px-4 font-semibold ${getScoreColor(task.score)}`}>
                    {task.score}/100
                  </td>
                  <td className="py-3 px-4 text-blue-400 font-semibold">
                    {task.improvements}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{task.date}</td>
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