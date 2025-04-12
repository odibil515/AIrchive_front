"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Bot, ExternalLink, RefreshCw, ThumbsUp } from "lucide-react"
import { useState } from "react"

interface NewsItem {
  id: string
  title: string
  source: string
  date: string
  summary: string
  url: string
  category: "crypto" | "stocks" | "economy" | "commodities"
  sentiment: "positive" | "negative" | "neutral"
  aiAnalyzed: boolean
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cut in Coming Months",
    source: "Financial Times",
    date: "2 hours ago",
    summary:
      "The Federal Reserve has indicated it may cut interest rates in the coming months as inflation shows signs of cooling. This could have significant implications for cryptocurrency markets, which have historically reacted positively to looser monetary policy.",
    url: "#",
    category: "economy",
    sentiment: "positive",
    aiAnalyzed: true,
  },
  {
    id: "2",
    title: "Bitcoin Mining Difficulty Reaches All-Time High",
    source: "CoinDesk",
    date: "5 hours ago",
    summary:
      "Bitcoin mining difficulty has reached a new all-time high, indicating increased competition among miners despite recent price volatility. This suggests long-term confidence in the network's security and value proposition.",
    url: "#",
    category: "crypto",
    sentiment: "neutral",
    aiAnalyzed: true,
  },
  {
    id: "3",
    title: "Major Tech Companies Report Strong Quarterly Earnings",
    source: "Wall Street Journal",
    date: "1 day ago",
    summary:
      "Leading technology companies have reported better-than-expected earnings for the last quarter, driving stock market gains. This positive sentiment in traditional markets often spills over to cryptocurrency markets.",
    url: "#",
    category: "stocks",
    sentiment: "positive",
    aiAnalyzed: true,
  },
  {
    id: "4",
    title: "Oil Prices Drop Amid Global Supply Concerns",
    source: "Bloomberg",
    date: "1 day ago",
    summary:
      "Oil prices have fallen sharply due to concerns about oversupply and weakening demand. This could lead to lower inflation figures, potentially influencing central bank policies on interest rates.",
    url: "#",
    category: "commodities",
    sentiment: "negative",
    aiAnalyzed: false,
  },
  {
    id: "5",
    title: "New Regulatory Framework for Cryptocurrencies Proposed",
    source: "Reuters",
    date: "2 days ago",
    summary:
      "Lawmakers have proposed a new regulatory framework for cryptocurrencies, aiming to provide clarity while ensuring consumer protection. The proposal has received mixed reactions from industry participants.",
    url: "#",
    category: "crypto",
    sentiment: "neutral",
    aiAnalyzed: false,
  },
]

export default function NewsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTab, setCurrentTab] = useState("all")
  const [news, setNews] = useState(newsItems)
  const { toast } = useToast()

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call to refresh news
    setTimeout(() => {
      toast({
        title: "News feed refreshed",
        description: "Latest economic news has been loaded",
      })
      setIsRefreshing(false)
    }, 1500)
  }

  const handleAnalyzeNews = (id: string) => {
    // Simulate AI analyzing the news
    setTimeout(() => {
      setNews(news.map((item) => (item.id === id ? { ...item, aiAnalyzed: true } : item)))

      toast({
        title: "News analyzed",
        description: "AI has analyzed this news item and updated your trading strategy",
      })
    }, 1000)
  }

  const filteredNews = currentTab === "all" ? news : news.filter((item) => item.category === currentTab)

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Economic News</h1>
            <p className="text-gray-400">Latest news that may impact your trading strategy</p>
          </div>
          <Button
            variant="outline"
            className="mt-2 md:mt-0 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh News
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
          </TabsList>

          <TabsContent value={currentTab} className="mt-6 space-y-6">
            {filteredNews.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No news found in this category</div>
            ) : (
              filteredNews.map((item) => (
                <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {item.source} • {item.date}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`
                          ${
                            item.sentiment === "positive"
                              ? "bg-green-500 hover:bg-green-600"
                              : item.sentiment === "negative"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gray-500 hover:bg-gray-600"
                          }
                        `}
                      >
                        {item.sentiment === "positive"
                          ? "Bullish"
                          : item.sentiment === "negative"
                            ? "Bearish"
                            : "Neutral"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{item.summary}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center"
                    >
                      Read full article <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {item.aiAnalyzed ? (
                      <div className="flex items-center text-emerald-400 text-sm">
                        <Bot className="mr-1 h-4 w-4" />
                        Analyzed by AI
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-sm border-gray-600 hover:bg-gray-700"
                        onClick={() => handleAnalyzeNews(item.id)}
                      >
                        <Bot className="mr-1 h-4 w-4" />
                        Analyze with AI
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* AI Insights Section */}
        <div className="mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-400" />
                AI Market Insights
              </CardTitle>
              <CardDescription className="text-gray-400">AI-generated insights based on recent news</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                <p className="text-gray-300 mb-4">
                  Based on recent economic news, I've identified the following market trends and potential trading
                  opportunities:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      The Federal Reserve's signals about potential rate cuts could lead to increased liquidity in
                      crypto markets. Consider increasing exposure to major cryptocurrencies.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Strong tech earnings suggest a healthy market environment. This positive sentiment often
                      correlates with increased risk appetite for crypto assets.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ThumbsUp className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Bitcoin's increasing mining difficulty indicates network strength despite price volatility. This
                      could be a positive long-term indicator.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
