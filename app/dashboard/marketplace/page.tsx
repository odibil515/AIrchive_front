"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Bot, ChevronUp, Download, Search, Star, Wallet } from "lucide-react"
import { useState } from "react"

interface Agent {
  id: string
  name: string
  description: string
  creator: string
  price: number
  performance: number
  rating: number
  ratingCount: number
  category: "crypto" | "stocks" | "forex" | "commodities"
  tags: string[]
}

const agents: Agent[] = [
  {
    id: "1",
    name: "BTC Momentum Trader",
    description:
      "This agent uses momentum indicators to trade Bitcoin. It buys when momentum is increasing and sells when it's decreasing.",
    creator: "crypto_expert",
    price: 0.05,
    performance: 18.7,
    rating: 4.5,
    ratingCount: 124,
    category: "crypto",
    tags: ["bitcoin", "momentum", "technical"],
  },
  {
    id: "2",
    name: "ETH Swing Trader",
    description:
      "Specialized in Ethereum swing trading. This agent identifies potential reversal points and executes trades accordingly.",
    creator: "eth_trader",
    price: 0.03,
    performance: 12.3,
    rating: 4.2,
    ratingCount: 87,
    category: "crypto",
    tags: ["ethereum", "swing", "technical"],
  },
  {
    id: "3",
    name: "Forex Trend Follower",
    description:
      "This agent follows major forex trends, focusing on EUR/USD and GBP/USD pairs. It uses moving averages and trend indicators.",
    creator: "forex_master",
    price: 0.08,
    performance: 9.5,
    rating: 4.0,
    ratingCount: 56,
    category: "forex",
    tags: ["forex", "trend", "moving-average"],
  },
  {
    id: "4",
    name: "Gold Price Predictor",
    description: "Specialized in predicting gold price movements based on economic indicators and market sentiment.",
    creator: "gold_trader",
    price: 0.06,
    performance: 7.8,
    rating: 3.8,
    ratingCount: 42,
    category: "commodities",
    tags: ["gold", "commodities", "fundamental"],
  },
  {
    id: "5",
    name: "Tech Stock Analyzer",
    description: "This agent analyzes tech stocks based on earnings reports, news sentiment, and technical indicators.",
    creator: "stock_guru",
    price: 0.1,
    performance: 15.2,
    rating: 4.7,
    ratingCount: 98,
    category: "stocks",
    tags: ["stocks", "tech", "fundamental"],
  },
  {
    id: "6",
    name: "Crypto News Trader",
    description:
      "Trades cryptocurrencies based on news sentiment analysis. Buys on positive news and sells on negative news.",
    creator: "news_trader",
    price: 0.04,
    performance: 11.6,
    rating: 4.1,
    ratingCount: 73,
    category: "crypto",
    tags: ["crypto", "news", "sentiment"],
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTab, setCurrentTab] = useState("all")
  const [sortBy, setSortBy] = useState("performance")
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null)
  const { toast } = useToast()

  const handlePurchase = (agentId: string) => {
    setIsPurchasing(agentId)

    // Simulate purchase process
    setTimeout(() => {
      toast({
        title: "Agent purchased",
        description: "The trading agent has been added to your collection",
      })
      setIsPurchasing(null)
    }, 1500)
  }

  // Filter agents based on search query and selected tab
  const filteredAgents = agents
    .filter(
      (agent) =>
        (currentTab === "all" || agent.category === currentTab) &&
        (searchQuery === "" ||
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
    )
    .sort((a, b) => {
      if (sortBy === "performance") {
        return b.performance - a.performance
      } else if (sortBy === "price") {
        return a.price - b.price
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Agent Marketplace</h1>
            <p className="text-gray-400">Discover and purchase AI trading agents</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="performance">Best Performance</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
          </TabsList>

          <TabsContent value={currentTab} className="mt-6">
            {filteredAgents.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No agents found matching your criteria</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <Card key={agent.id} className="bg-gray-800 border-gray-700 flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{agent.name}</CardTitle>
                          <CardDescription className="text-gray-400">by {agent.creator}</CardDescription>
                        </div>
                        <Badge className="bg-emerald-500 hover:bg-emerald-600">{agent.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-300 mb-4">{agent.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-700 p-2 rounded-md">
                          <div className="text-emerald-400 font-bold flex items-center justify-center">
                            <ChevronUp className="h-4 w-4 mr-1" />
                            {agent.performance}%
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Performance</div>
                        </div>
                        <div className="bg-gray-700 p-2 rounded-md">
                          <div className="text-white font-bold flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {agent.rating}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{agent.ratingCount} ratings</div>
                        </div>
                        <div className="bg-gray-700 p-2 rounded-md">
                          <div className="text-white font-bold flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-blue-400 mr-1" />
                            {agent.price} ETH
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Price</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-700 pt-4">
                      <Button
                        className="w-full bg-emerald-500 hover:bg-emerald-600"
                        onClick={() => handlePurchase(agent.id)}
                        disabled={isPurchasing === agent.id}
                      >
                        {isPurchasing === agent.id ? (
                          <>
                            <Bot className="mr-2 h-4 w-4 animate-spin" />
                            Purchasing...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Purchase Agent
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
