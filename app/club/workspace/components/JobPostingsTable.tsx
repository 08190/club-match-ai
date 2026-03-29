"use client";

import React from "react";
import { FileText, Eye, Users } from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  status: "active" | "closed";
  postedDate: string;
  applicantCount: number;
  viewsCount: number;
}

interface JobPostingsTableProps {
  jobs: JobPosting[];
}

export const JobPostingsTable: React.FC<JobPostingsTableProps> = ({ jobs }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          招聘职位 {jobs.length}
        </h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
          + 发布新职位
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                职位名称
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                部门
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                状态
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                发布日期
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">
                浏览
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">
                申请
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{job.title}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600">{job.department}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status === "active" ? "🟢 招聘中" : "⏹️ 已关闭"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600">
                    {new Date(job.postedDate).toLocaleDateString("zh-CN")}
                  </p>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    {job.viewsCount}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-semibold text-blue-600">
                    <Users className="w-4 h-4" />
                    {job.applicantCount}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
