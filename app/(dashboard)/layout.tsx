import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { ChatbotWidget } from "@/components/ui/chatbotWidget";
import ParticlesBackground from "@/components/layout/ParticlesBackground";
import { NavigationDock } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AvatoAI - AI Marketing Assistant",
  description: "Your Always-On AI Marketing Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-900 text-white min-h-screen relative`}
      >
        {/* Global Particles Background */}
        <ParticlesBackground />

        {/* Centered Layout Structure */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}

          <Header />
          {/* Main Content - Centered and Full Width */}
          <main className="flex-1 relative m-3 mt-12 z-10 pb-12">
            {/* Added pb-24 to give space for the bottom dock */}
            {children}
          </main>

          {/* Bottom Dock */}
          <NavigationDock />

          {/* Chatbot Widget */}
          <ChatbotWidget />
        </div>
      </body>
    </html>
  );
}
