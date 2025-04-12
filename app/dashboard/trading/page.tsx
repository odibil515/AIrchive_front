"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowDownUp, ChevronDown, ChevronUp, LineChart, Play, RefreshCw, Bot } from "lucide-react"
import { useState } from "react"

interface TradingPair {
  id: string
  name: string
  price: number
  change: number
  volume: string
}

const tradingPairs: TradingPair[] = [
  { id: "btc-usdt", name: "BTC/USDT", price: 62458.32, change: 2.34, volume: "1.2B" },
  { id: "eth-usdt", name: "ETH/USDT", price: 3045.67, change: -1.23, volume: "845M" },
  { id: "sol-usdt", name: "SOL/USDT", price: 142.89, change: 5.67, volume: "324M" },
  { id: "bnb-usdt", name: "BNB/USDT", price: 567.21, change: 0.45, volume: "156M" },
]

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = useState(tradingPairs[0])
  const [amount, setAmount] = useState("0.1")
  const [isExecuting, setIsExecuting] = useState(false)
  const { toast } = useToast()

  const handleExecuteTrade = (type: "buy" | "sell") => {
    setIsExecuting(true)

    // Simulate API call to execute trade
    setTimeout(() => {
      toast({
        title: `${type === "buy" ? "Buy" : "Sell"} order executed`,
        description: `Successfully ${type === "buy" ? "bought" : "sold"} ${amount} ${selectedPair.name.split("/")[0]} at $${selectedPair.price.toFixed(2)}`,
      })
      setIsExecuting(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Trading Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trading Chart */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-xl">
                  {selectedPair.name}
                  <span className={`ml-2 text-sm ${selectedPair.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedPair.change >= 0 ? "+" : ""}
                    {selectedPair.change}%
                  </span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  ${selectedPair.price.toFixed(2)} • Volume: ${selectedPair.volume}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="1d">
                  <SelectTrigger className="w-[80px] bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="15m">15m</SelectItem>
                    <SelectItem value="1h">1h</SelectItem>
                    <SelectItem value="4h">4h</SelectItem>
                    <SelectItem value="1d">1d</SelectItem>
                    <SelectItem value="1w">1w</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative aspect-[16/9] w-full bg-gray-900 rounded-md overflow-hidden">
                {/* This would be your actual chart component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-gray-600" />
                  <span className="absolute text-gray-400">Trading chart will appear here</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Execute Trade</CardTitle>
              <CardDescription className="text-gray-400">Buy or sell on Binance Testnet</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-green-500">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-500">
                    Sell
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="buy" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Trading Pair</label>
                    <Select
                      value={selectedPair.id}
                      onValueChange={(value) => {
                        const pair = tradingPairs.find((p) => p.id === value)
                        if (pair) setSelectedPair(pair)
                      }}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select pair" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {tradingPairs.map((pair) => (
                          <SelectItem key={pair.id} value={pair.id}>
                            {pair.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        step="0.01"
                        min="0.01"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {selectedPair.name.split("/")[0]}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      ≈ ${(Number.parseFloat(amount) * selectedPair.price).toFixed(2)}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handleExecuteTrade("buy")}
                    disabled={isExecuting}
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" />
                        Buy {selectedPair.name.split("/")[0]}
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Trading Pair</label>
                    <Select
                      value={selectedPair.id}
                      onValueChange={(value) => {
                        const pair = tradingPairs.find((p) => p.id === value)
                        if (pair) setSelectedPair(pair)
                      }}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select pair" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {tradingPairs.map((pair) => (
                          <SelectItem key={pair.id} value={pair.id}>
                            {pair.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        step="0.01"
                        min="0.01"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {selectedPair.name.split("/")[0]}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      ≈ ${(Number.parseFloat(amount) * selectedPair.price).toFixed(2)}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() => handleExecuteTrade("sell")}
                    disabled={isExecuting}
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" />
                        Sell {selectedPair.name.split("/")[0]}
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* AI Strategy Section */}
        <div className="mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-400" />
                AI Trading Strategy
              </CardTitle>
              <CardDescription className="text-gray-400">Your current AI-powered trading strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-700 rounded-md border border-gray-600 mb-4">
                <p className="text-gray-300">
                  Buy BTC when it drops more than 3% in 24 hours and the RSI is below 30. Sell when it rises more than
                  5% from the purchase price or if it drops more than 2% from the purchase price.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-400">Status</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium">Active</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-400">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center text-green-400">
                      <ChevronUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">+12.4%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-medium text-gray-400">Last Trade</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center">
                      <ArrowDownUp className="h-4 w-4 mr-1 text-blue-400" />
                      <span className="font-medium">2 hours ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600">
                <Play className="mr-2 h-4 w-4" />
                Execute Strategy Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
