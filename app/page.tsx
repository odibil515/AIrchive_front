"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Store, Wallet } from "lucide-react";
import Starfield from "@/components/Starfield";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleWalletConnect = async () => {
    setIsLoading(true);
    try {
      await connect({ connector: connectors[0] });
    } catch (err) {
      toast({
        title: "Connection failed",
        description: "MetaMask 연결에 실패했습니다.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleWalletDisconnect = () => {
    disconnect();
    toast({
      title: "Disconnected",
      description: "지갑 연결이 해제되었습니다.",
    });
  };

  const handleGetStarted = () => {
    if (!isConnected) {
      toast({
        title: "지갑이 연결되지 않았습니다.",
        description: "먼저 지갑을 연결해주세요.",
        variant: "destructive",
      });
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900/30 to-gray-800/30 text-white relative overflow-hidden">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-emerald-400" />
          <h1 className="text-2xl font-bold">TradingAI</h1>
        </div>

        {/* 👇 연결 상태에 따라 버튼 토글 */}
        {isConnected ? (
          <Button
            onClick={handleWalletDisconnect}
            className="bg-gray-700 hover:bg-gray-600 flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            Disconnect Wallet
          </Button>
        ) : (
          <Button
            onClick={handleWalletConnect}
            className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2"
            disabled={isLoading}
          >
            <Wallet className="h-4 w-4" />
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </header>

      <Starfield />

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Trade Smarter with{" "}
            <span className="text-emerald-400">AI-Powered</span> Strategies
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Create, deploy, and share trading strategies using natural language.
            Let AI handle the complex trading decisions while you focus on
            strategy.
          </p>

          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8"
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Card className="bg-gray-800 border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <Bot className="h-12 w-12 text-emerald-400 mb-2" />
              <CardTitle>AI Trading Agents</CardTitle>
              <CardDescription className="text-gray-400">
                Create custom trading agents using natural language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Describe your trading strategy in plain English, and our AI will
                turn it into an automated trading agent.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-emerald-400 mb-2" />
              <CardTitle>Automated Trading</CardTitle>
              <CardDescription className="text-gray-400">
                Connect to exchanges and trade automatically
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Connect your exchange API and let your AI agents execute trades
                based on your strategies.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <Store className="h-12 w-12 text-emerald-400 mb-2" />
              <CardTitle>Agent Marketplace</CardTitle>
              <CardDescription className="text-gray-400">
                Buy, sell, and share trading strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Discover profitable strategies from other traders or monetize
                your own successful agents.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto py-8 px-4 border-t border-gray-800 mt-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Bot className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-bold">TradingAI</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 TradingAI. All rights reserved. Built for Buidl AI Hackathon.
          </div>
        </div>
      </footer>
    </div>
  );
}
