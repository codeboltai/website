import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeboltAI - Futuristic Code Editor for AI and Agents",
  description: "Create your own AI agents with CodeboltAI, the futuristic code editor that exposes editor functionalities as APIs and MCP for automation.",
  keywords: ["AI", "Code Editor", "Agents", "Automation", "API", "MCP"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
