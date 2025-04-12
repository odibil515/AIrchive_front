"use client";

import type React from "react";

import DashboardLayout from "@/components/dashboard-layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v5 as uuidv5 } from "uuid";
import { useAccount } from "wagmi"; // Import useAccount hook

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I’m your AI agent here to help with your investments. If you tell me your preferred investment strategy, I’ll handle your investments accordingly. Which type of assets do you mainly invest in? Also, what kind of investor are you?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { address, isConnected } = useAccount(); // Get wallet address and connection status
  const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341"; // 고정된 네임스페이스 UUID

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateUUID = (walletAddress: string): string => {
    const uuid = uuidv5(walletAddress, NAMESPACE);
    return uuid;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!isConnected || !address) {
      alert("지갑을 연결해주세요.");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // API 호출
      const userId = generateUUID(address); // 지갑 주소를 사용하여 UUID 생성
      const response = await fetch(
        "http://localhost:3001/aiagent/chat?userId=" + userId,
        {
          // 백엔드 API 호출
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error("API 호출 오류:", error);
      // 에러 처리
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold">AI Trading Assistant</h1>
          <p className="text-gray-400">
            Describe your trading strategy in natural language
          </p>
        </div>

        <div className="flex-1 flex flex-col p-4">
          <Card className="flex-1 flex flex-col bg-gray-800 border-gray-700 overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-start gap-3 max-w-[80%]">
                      {message.role === "assistant" && (
                        <Avatar className="mt-1">
                          <AvatarFallback className="bg-emerald-600">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="mt-1">
                          <AvatarFallback className="bg-gray-600">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-emerald-600">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-2 bg-gray-700 text-white">
                        <div className="flex space-x-2">
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <CardContent className="p-4 border-t border-gray-700">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
              >
                <Input
                  placeholder="Type your trading strategy..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-emerald-500 hover:bg-emerald-600"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
