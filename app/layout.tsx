import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import Starfield from "@/components/Starfield";
import "./globals.css";
import { WagmiProvider } from "wagmi";
import Providers from "../app/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Trading Agent Platform",
  description:
    "LLM-based trading agent platform for automated trading strategies",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} relative min-h-screen`}>
        {/* 전역 배경 효과: 모든 페이지에 동일하게 적용됩니다 */}
        <Starfield />
        {/* 실제 콘텐츠는 Starfield 위에 나타납니다 */}
        <div className="relative z-10">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>{children}</Providers>

            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
