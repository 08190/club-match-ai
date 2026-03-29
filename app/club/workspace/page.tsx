"use client";

import React from "react";
import { Sidebar } from "./components/Sidebar";
import { StatCard } from "./components/StatCard";
import { JobPostingsTable } from "./components/JobPostingsTable";
import { KanbanBoard } from "./components/KanbanBoard";
import { AutoScheduler } from "./components/AutoScheduler";
import {
  mockStatistics,
  mockJobPostings,
  mockApplicants,
  mockInterviewSlots,
} from "./lib/mockData";

export default function ClubWorkspace() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab="dashboard" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        {/* Navbar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  摄影协会 - 招聘仪表盘
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date().toLocaleDateString("zh-CN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                同步数据
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Statistics Cards */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              📊 实时统计数据
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockStatistics.map((stat, idx) => (
                <StatCard
                  key={idx}
                  {...stat}
                  color={stat.color as "blue" | "green" | "purple"}
                />
              ))}
            </div>
          </section>

          {/* Job Postings Table */}
          <section>
            <JobPostingsTable jobs={mockJobPostings} />
          </section>

          {/* Kanban Board */}
          <section>
            <KanbanBoard applicants={mockApplicants} />
          </section>

          {/* Auto Scheduler */}
          <section>
            <AutoScheduler slots={mockInterviewSlots} />
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  💡 使用建议
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 定期查看AI解析的候选人匹配度，优先邀请高匹配度候选人</li>
                  <li>• 拖拽Kanban卡片以更新候选人状态（即将支持）</li>
                  <li>• 使用自动排期功能以减少日程冲突</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  🚀 下周规划
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • 实现拖拽排序功能（Kanban卡片在列之间拖拽）
                  </li>
                  <li>• 添加候选人评分和评论功能</li>
                  <li>• 集成招聘漏斗分析看板</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
              <p>&copy; 2026 Club Match AI - Club Workspace</p>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <a href="#" className="hover:text-gray-700">
                  帮助文档
                </a>
                <a href="#" className="hover:text-gray-700">
                  联系支持
                </a>
                <a href="#" className="hover:text-gray-700">
                  意见反馈
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
