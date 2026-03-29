"use client";

import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export const ResourceBanner: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 sm:p-12 shadow-lg border border-blue-500">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-3xl" />

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl">
          {/* Icon and Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                学生领导者 & 顾问资源
              </h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                为政策导航、活动计划和管理提供工具、模板和指导的中心枢纽。获取所有必要资源以创建和管理成功的校园社团。
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-md"
            >
              浏览所有资源
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              下载资源包
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
