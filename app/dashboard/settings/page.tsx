"use client"

import type React from "react"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Bot, Key, Save } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [llmApiKey, setLlmApiKey] = useState("")
  const [binanceApiKey, setBinanceApiKey] = useState("")
  const [binanceSecretKey, setBinanceSecretKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate saving API keys
    setTimeout(() => {
      toast({
        title: "API keys saved",
        description: "Your API keys have been securely stored",
      })
      setIsSaving(false)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="api-keys">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="mt-6">
            <form onSubmit={handleSaveApiKeys}>
              <div className="grid gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-emerald-400" />
                      LLM API Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure your LLM API for the AI trading assistant
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="llm-api-key" className="text-gray-300">
                          LLM API Key
                        </Label>
                        <div className="relative">
                          <Input
                            id="llm-api-key"
                            type="password"
                            placeholder="sk-••••••••••••••••••••••••••••••"
                            value={llmApiKey}
                            onChange={(e) => setLlmApiKey(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white pr-10"
                          />
                          <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400">
                          Your API key is securely stored and never shared with third parties.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Binance API Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure your Binance Testnet API for automated trading
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="binance-api-key" className="text-gray-300">
                          Binance API Key
                        </Label>
                        <div className="relative">
                          <Input
                            id="binance-api-key"
                            type="password"
                            placeholder="••••••••••••••••••••••••••••••"
                            value={binanceApiKey}
                            onChange={(e) => setBinanceApiKey(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white pr-10"
                          />
                          <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="binance-secret-key" className="text-gray-300">
                          Binance Secret Key
                        </Label>
                        <div className="relative">
                          <Input
                            id="binance-secret-key"
                            type="password"
                            placeholder="••••••••••••••••••••••••••••••"
                            value={binanceSecretKey}
                            onChange={(e) => setBinanceSecretKey(e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white pr-10"
                          />
                          <Key className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-400">
                          For testing purposes, please use Binance Testnet API keys.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <CardFooter className="flex justify-end px-0">
                  <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Bot className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save API Keys
                      </>
                    )}
                  </Button>
                </CardFooter>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Trading Preferences</CardTitle>
                <CardDescription className="text-gray-400">Configure your default trading settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Trading preferences settings will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription className="text-gray-400">Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Account settings will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
