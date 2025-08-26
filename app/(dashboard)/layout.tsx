import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatbotWidget } from "@/components/ui/chatbotWidget";

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
        className={`${inter.className} bg-gray-900 text-white min-h-screen`}
      >
        <div className="flex">
          <Sidebar />
          {/* CHANGE: Added responsive margin for collapsed sidebar */}
          <div className="flex-1 md:ml-64 peer-[.w-20]:md:ml-20 transition-all duration-300 ease-in-out">
            <Header />
            <main className="p-6 pt-20">{children}</main>
            <ChatbotWidget />
          </div>
        </div>
      </body>
    </html>
  );
}
