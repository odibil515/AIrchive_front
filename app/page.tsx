import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BarChart3, Bot, Store } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-emerald-400" />
          <h1 className="text-2xl font-bold">TradingAI</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-emerald-500 hover:bg-emerald-600">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Trade Smarter with <span className="text-emerald-400">AI-Powered</span> Strategies
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Create, deploy, and share trading strategies using natural language. Let AI handle the complex trading
            decisions while you focus on strategy.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <Bot className="h-12 w-12 text-emerald-400 mb-2" />
              <CardTitle>AI Trading Agents</CardTitle>
              <CardDescription className="text-gray-400">
                Create custom trading agents using natural language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Describe your trading strategy in plain English, and our AI will turn it into an automated trading
                agent.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-emerald-400 mb-2" />
              <CardTitle>Automated Trading</CardTitle>
              <CardDescription className="text-gray-400">Connect to exchanges and trade automatically</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Connect your exchange API and let your AI agents execute trades based on your strategies.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <Store className="h-12 w-12 text-emerald-400 mb-2" />
              <CardTitle>Agent Marketplace</CardTitle>
              <CardDescription className="text-gray-400">Buy, sell, and share trading strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Discover profitable strategies from other traders or monetize your own successful agents.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="container mx-auto py-8 px-4 border-t border-gray-800 mt-20">
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
  )
}
