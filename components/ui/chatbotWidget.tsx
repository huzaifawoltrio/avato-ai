// components/ui/ChatbotWidget.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Minimize2,
  Send,
  Mic,
  Upload,
  FileSpreadsheet,
  Play,
  Download,
  BarChart3,
  Bot,
  User,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  hasChart?: boolean;
  hasActions?: boolean;
}

export function ChatbotWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your AvatoAI assistant. I can help you with analytics, content creation, SEO optimization, and more. What would you like to explore?",
      timestamp: new Date(),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(message),
        timestamp: new Date(),
        hasChart:
          message.toLowerCase().includes("analytics") ||
          message.toLowerCase().includes("chart"),
        hasActions:
          message.toLowerCase().includes("export") ||
          message.toLowerCase().includes("download"),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("analytics") || msg.includes("chart")) {
      return "Here's your analytics overview. I can see your email campaigns have a 24.8% open rate and podcast downloads are up 25.1% this month. Would you like me to generate a detailed report?";
    }
    if (msg.includes("seo")) {
      return "I can help optimize your SEO! I've found 8 pages that need meta description updates and 5 missing alt tags. Should I run a full site audit?";
    }
    if (msg.includes("content")) {
      return "Great! I can help with content creation, plagiarism checking, or SEO optimization. Which content tool would you like to explore?";
    }
    return (
      "I understand you're asking about " +
      userMessage +
      ". I can help you with analytics, content creation, SEO automation, email campaigns, and more. What specific area interests you most?"
    );
  };

  const quickActions = [
    {
      icon: Upload,
      label: "Upload CSV",
      action: () => console.log("Upload CSV"),
    },
    {
      icon: FileSpreadsheet,
      label: "Connect Sheets",
      action: () => console.log("Connect Sheets"),
    },
    {
      icon: Play,
      label: "Run Scenario",
      action: () => console.log("Run Scenario"),
    },
  ];

  // Floating button tooltip
  const FloatingTooltip = () => (
    <AnimatePresence>
      {showTooltip && !isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="absolute right-20 bottom-2 bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap shadow-2xl z-[9999]"
        >
          Ask AvatoAI
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-gray-900/95 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Typing indicator
  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-gray-800/30 rounded-lg border border-purple-500/20 mb-4">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );

  // Chart component for bot responses
  const MiniChart = () => (
    <div className="mt-3 p-3 bg-gray-900/50 rounded-lg border border-purple-500/20">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">Campaign Performance</span>
        <BarChart3 className="w-4 h-4 text-purple-400" />
      </div>
      <div className="flex space-x-1 h-8 items-end">
        <div className="bg-purple-500 w-3 h-6 rounded-sm"></div>
        <div className="bg-blue-500 w-3 h-8 rounded-sm"></div>
        <div className="bg-green-500 w-3 h-4 rounded-sm"></div>
        <div className="bg-yellow-500 w-3 h-7 rounded-sm"></div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <FloatingTooltip />

      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group overflow-hidden"
          >
            {/* Pulsing animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping opacity-30"></div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>

            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: isMinimized ? 0.3 : 1,
              y: isMinimized ? 100 : 0,
              x: isMinimized ? 150 : 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            // --- CHANGE 1: Added `flex flex-col` to make this a flex container ---
            className="absolute bottom-20 right-0 w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden flex flex-col"
          >
            {!isMinimized && (
              <>
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        AvatoAI Assistant
                      </h3>
                      <p className="text-xs text-gray-400">
                        Always ready to help
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMinimized(true)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Minimize2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                {/* --- CHANGE 2: Removed `h-80` and added `flex-1` to make it fill available space --- */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs ${
                          msg.type === "user" ? "order-2" : "order-1"
                        }`}
                      >
                        <div
                          className={`flex items-end space-x-2 ${
                            msg.type === "user"
                              ? "flex-row-reverse space-x-reverse"
                              : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              msg.type === "user"
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                : "bg-gradient-to-r from-purple-500 to-blue-500"
                            }`}
                          >
                            {msg.type === "user" ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              msg.type === "user"
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                : "bg-gray-800/50 border border-purple-500/20 text-gray-100"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            {msg.hasChart && <MiniChart />}
                            {msg.hasActions && (
                              <div className="flex space-x-2 mt-3">
                                <button className="flex items-center space-x-1 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs hover:bg-purple-500/30 transition-colors">
                                  <Download className="w-3 h-3" />
                                  <span>Export</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-10">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* --- CHANGE 3: Wrapped footer elements in a div that won't shrink --- */}
                <div className="flex-shrink-0">
                  {/* Quick Actions */}
                  <div className="px-4 pb-2">
                    <div className="flex space-x-2">
                      {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={index}
                            onClick={action.action}
                            className="flex items-center space-x-1 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/30 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-200"
                          >
                            <Icon className="w-3 h-3" />
                            <span>{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                          placeholder="Ask about your data..."
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"
                        />
                      </div>
                      <button
                        onClick={() => console.log("Voice input")}
                        className="p-3 bg-gray-800/50 hover:bg-purple-500/20 border border-gray-700 hover:border-purple-500/50 rounded-xl text-gray-400 hover:text-purple-400 transition-all duration-200"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Minimized State */}
            {isMinimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-2 cursor-pointer"
                onClick={() => setIsMinimized(false)}
              >
                <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
