"use client";

import React from "react";
import { ChatInterface } from "./components/ChatInterface";
import { Video, ArrowLeft, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function InterviewPage() {
  // Mock data for the current interview session
  const roleId = "media_officer";
  const clubName = "摄影协会";
  const roleName = "媒体宣传部员";
  const interviewType = "AI模拟面试";

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/student/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {interviewType}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {clubName} · {roleName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>约10分钟</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col">
          {/* Club Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 flex-1 flex flex-col justify-center">
            <div className="text-center space-y-4">
              {/* Club Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-white text-2xl font-bold">📷</span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">{clubName}</h2>
                <p className="text-sm text-gray-600 mt-1">应聘职位</p>
                <p className="text-base font-semibold text-blue-600 mt-0.5">
                  {roleName}
                </p>
              </div>

              {/* Interview Info */}
              <div className="space-y-2 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>实时面试进行中</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>AI面试官</span>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white bg-opacity-60 rounded px-3 py-2">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  💡 面试建议：
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 诚实回答，展现真实自我</li>
                  <li>• 用具体例子说明你的能力</li>
                  <li>• 认真倾听AI面试官的问题</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="mt-6 space-y-3 text-xs text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-1">面试ID</p>
              <p className="font-mono bg-gray-100 px-2 py-1 rounded overflow-x-auto">
                INT-2026031429
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">开始时间</p>
              <p>{new Date().toLocaleString("zh-CN")}</p>
            </div>
          </div>

          {/* End Session Button */}
          <Link
            href="/student/dashboard"
            className="mt-6 w-full px-4 py-2 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            退出面试
          </Link>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          <ChatInterface roleId={roleId} />
        </div>
      </div>
    </div>
  );
}
