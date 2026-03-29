"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UpcomingEventsSection } from "./components/UpcomingEventsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Background decorative elements - subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-10" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="text-xl">🚀</span>
            <span className="text-sm font-medium text-slate-700">
              为你匹配最合适的校园社团
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              <span className="text-blue-600">智能匹配</span>
              <br />
              校园社团
              <br />
              <span className="text-slate-600">智能招聘平台</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed">
              发现适合你的社团，或找到最优秀的新成员。由智能匹配技术驱动。
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4 sm:pt-8">
            {/* C-Side Button */}
            <Link
              href="/student/dashboard"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95 shadow-md"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <span className="hidden sm:inline">我是学生（进入C端）</span>
                <span className="sm:hidden">学生入口</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* B-Side Button */}
            <Link
              href="/club/workspace"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-lg active:scale-95 shadow-md"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">🏢</span>
                <span className="hidden sm:inline">社团管理（进入B端）</span>
                <span className="sm:hidden">社团入口</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16">
            <div className="space-y-2 text-center">
              <div className="text-3xl mx-auto mb-2">⚡</div>
              <h3 className="font-semibold text-slate-900">智能匹配</h3>
              <p className="text-sm text-slate-600">
                AI驱动的智能匹配算法
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-3xl mx-auto mb-2">🎯</div>
              <h3 className="font-semibold text-slate-900">双端平台</h3>
              <p className="text-sm text-slate-600">
                为学生和社团双向服务
              </p>
            </div>
            <div className="space-y-2 text-center">
              <div className="text-3xl mx-auto mb-2">🔒</div>
              <h3 className="font-semibold text-slate-900">安全隐私</h3>
              <p className="text-sm text-slate-600">
                你的数据受到保护
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center">
          <p className="text-sm text-slate-600">
            用 <span className="text-red-500">❤️</span> 为校园社团打造
          </p>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />
    </div>
  );
}
