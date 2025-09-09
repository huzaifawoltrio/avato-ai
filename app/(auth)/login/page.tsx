"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Chrome, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/GradientButton";

// A simple component for a social login button
const SocialLoginButton = ({
  provider,
  icon: Icon,
}: {
  provider: string;
  icon: React.ElementType;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
  >
    <Icon className="w-5 h-5" />
    <span>{provider}</span>
  </motion.button>
);

export default function LoginPage() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("asd123123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // On success, redirect to the dashboard
      window.location.href = "/";
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Card className="p-8">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">A</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Welcome to AvatoAI
                </h1>
              </div>
              <p className="text-gray-400">
                Sign in to access your AI marketing dashboard.
              </p>
            </motion.div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <motion.div variants={itemVariants} className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-400 hover:underline">
                  Forgot Password?
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <GradientButton className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </GradientButton>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="relative my-8 text-center"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative inline-block px-4 bg-gray-800 text-gray-400 text-sm">
                Or continue with
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4">
              <SocialLoginButton provider="Google" icon={Chrome} />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-center text-sm text-gray-400 mt-8"
            >
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-purple-400 hover:underline"
              >
                Sign up
              </a>
            </motion.p>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
