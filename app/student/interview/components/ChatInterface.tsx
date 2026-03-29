"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, AlertCircle } from "lucide-react";
import {
  getInterviewSetByRole,
  generateAIFeedback,
} from "../lib/mockInterviewData";

interface Message {
  id: string;
  sender: "interviewer" | "candidate";
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatInterfaceProps {
  roleId: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ roleId }) => {
  const interviewSet = getInterviewSetByRole(roleId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize interview with opening message
  useEffect(() => {
    const initialMessage: Message = {
      id: "intro",
      sender: "interviewer",
      text: interviewSet.openingMessage,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [interviewSet]);

  /**
   * Simulate AI response delay and send next question
   */
  const simulateAIResponse = async () => {
    setIsLoading(true);

    // Simulate thinking delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let aiMessage: Message;

    if (currentQuestionIndex < interviewSet.questions.length) {
      // Send next question
      const nextQuestion = interviewSet.questions[currentQuestionIndex];
      aiMessage = {
        id: `ai-${currentQuestionIndex}`,
        sender: "interviewer",
        text: `Great answer! ${generateAIFeedback()} \n\n📍 Question ${currentQuestionIndex + 2} of 3:\n${nextQuestion.question}`,
        timestamp: new Date(),
      };
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Interview complete - send closing message
      aiMessage = {
        id: "closing",
        sender: "interviewer",
        text: interviewSet.closingMessage,
        timestamp: new Date(),
      };
      setIsInterviewComplete(true);
    }

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  /**
   * Handle user message submission
   */
  const handleSendMessage = async () => {
    if (userInput.trim() === "" || isLoading || isInterviewComplete) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "candidate",
      text: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // Simulate AI response
    await simulateAIResponse();
  };

  /**
   * Handle enter key press
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Format timestamp
   */
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "interviewer"
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`max-w-md px-4 py-3 rounded-lg ${
                message.sender === "interviewer"
                  ? "bg-gray-100 text-gray-900 rounded-bl-none shadow-sm"
                  : "bg-blue-600 text-white rounded-br-none shadow-lg"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                {message.text}
              </p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === "interviewer"
                    ? "text-gray-500"
                    : "text-blue-100"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interview Complete Banner */}
      {isInterviewComplete && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white">
                ✓
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Interview Complete! 🎉
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Thank you for your time. Check your email for updates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      {!isInterviewComplete && (
        <div className="border-t border-gray-200 bg-white p-4 space-y-2">
          {currentQuestionIndex === 0 && messages.length === 1 && (
            <div className="flex items-start gap-2 mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900">
                Question 1 of 3: {interviewSet.questions[0].question}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || userInput.trim() === ""}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Estimated time remaining:{" "}
            <span className="font-semibold">
              {Math.max(0, 3 - currentQuestionIndex)} question(s)
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
