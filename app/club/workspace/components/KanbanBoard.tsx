"use client";

import React from "react";
import { ApplicantCard } from "./ApplicantCard";
import { Kanban } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  jobRole: string;
  appliedDate: string;
  avatar: string;
  resumeScore: number;
  matchScore: number;
  skills: string[];
  status: "new" | "screening" | "interviewing" | "offered" | "rejected";
  stage: string;
  email: string;
  phone: string;
}

interface KanbanBoardProps {
  applicants: Applicant[];
}

const KanbanColumn: React.FC<{
  title: string;
  count: number;
  children: React.ReactNode;
  color: string;
}> = ({ title, count, children, color }) => {
  const colorClasses = {
    blue: "border-l-4 border-blue-500 bg-blue-50",
    purple: "border-l-4 border-purple-500 bg-purple-50",
    orange: "border-l-4 border-orange-500 bg-orange-50",
    green: "border-l-4 border-green-500 bg-green-50",
    red: "border-l-4 border-red-500 bg-red-50",
  };

  return (
    <div className={`rounded-lg p-4 min-h-[600px] ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue} flex flex-col`}>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          {title}
          <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full text-xs font-bold text-gray-700">
            {count}
          </span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">点击卡片查看详情或拖拽进度</p>
      </div>

      {/* Cards Container */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ applicants }) => {
  // Group applicants by status
  const groupByStatus = (
    status: "new" | "screening" | "interviewing" | "offered" | "rejected"
  ) => {
    return applicants.filter((app) => app.status === status);
  };

  const newApps = groupByStatus("new");
  const screeningApps = groupByStatus("screening");
  const interviewingApps = groupByStatus("interviewing");
  const offeredApps = groupByStatus("offered");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Kanban className="w-7 h-7 text-blue-600" />
          智能ATS看板
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>总计:</span>
          <span className="font-bold text-gray-900">{applicants.length}</span>
          <span>位申请者</span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">💡 AI驱动特性:</span> 每个卡片的"匹配度"和"技能标签"由智能简历解析引擎自动生成，实时匹配招聘需求。拖拽卡片进行状态更新。
        </p>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* New Applications */}
        <KanbanColumn title="新申请" count={newApps.length} color="blue">
          {newApps.map((app) => (
            <ApplicantCard key={app.id} {...app} />
          ))}
          {newApps.length === 0 && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              暂无新申请
            </div>
          )}
        </KanbanColumn>

        {/* Resume Screening */}
        <KanbanColumn title="简历筛选中" count={screeningApps.length} color="purple">
          {screeningApps.map((app) => (
            <ApplicantCard key={app.id} {...app} />
          ))}
          {screeningApps.length === 0 && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              暂无筛选中的应聘者
            </div>
          )}
        </KanbanColumn>

        {/* Interviewing */}
        <KanbanColumn title="面试中" count={interviewingApps.length} color="orange">
          {interviewingApps.map((app) => (
            <ApplicantCard key={app.id} {...app} />
          ))}
          {interviewingApps.length === 0 && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              暂无进行中的面试
            </div>
          )}
        </KanbanColumn>

        {/* Offered/Rejected */}
        <KanbanColumn
          title="已获Offer / 已拒绝"
          count={offeredApps.length}
          color="green"
        >
          {offeredApps.map((app) => (
            <ApplicantCard key={app.id} {...app} />
          ))}
          {offeredApps.length === 0 && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              暂无结束的流程
            </div>
          )}
        </KanbanColumn>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{newApps.length}</p>
          <p className="text-xs text-gray-600 mt-1">待处理</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{screeningApps.length}</p>
          <p className="text-xs text-gray-600 mt-1">筛选中</p>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <p className="text-2xl font-bold text-orange-600">
            {interviewingApps.length}
          </p>
          <p className="text-xs text-gray-600 mt-1">进行中</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{offeredApps.length}</p>
          <p className="text-xs text-gray-600 mt-1">已完成</p>
        </div>
      </div>
    </div>
  );
};
