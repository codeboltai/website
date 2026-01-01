import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Codebolt - The Intelligent Runtime for Autonomous Engineering",
  description: "Codebolt is an agentic IDE that goes beyond simple code completion. Powered by Horizon Mode architecture and D3 Engine for infinite context, agentic reasoning, and autonomous refactoring.",
  keywords: ["AI", "Code Editor", "Agents", "Automation", "IDE", "Autonomous Engineering", "Agentic IDE"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-300">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
