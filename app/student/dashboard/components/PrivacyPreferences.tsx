"use client";

import React, { useState } from "react";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  Network,
} from "lucide-react";

interface PrivacyItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  status: string;
  visible: boolean;
}

export const PrivacyPreferences: React.FC = () => {
  const [items, setItems] = useState<PrivacyItem[]>([
    {
      id: "graduate",
      icon: <User className="w-5 h-5" />,
      label: "毕业年份",
      status: "可见",
      visible: true,
    },
    {
      id: "biography",
      icon: <FileText className="w-5 h-5" />,
      label: "个人简介",
      status: "未设置",
      visible: false,
    },
    {
      id: "company",
      icon: <Briefcase className="w-5 h-5" />,
      label: "公司 / 职位",
      status: "未设置",
      visible: false,
    },
    {
      id: "school",
      icon: <GraduationCap className="w-5 h-5" />,
      label: "学校 / 专业",
      status: "理学院",
      visible: true,
    },
    {
      id: "groups",
      icon: <Users className="w-5 h-5" />,
      label: "我的社团",
      status: "可见",
      visible: true,
    },
    {
      id: "events",
      icon: <Calendar className="w-5 h-5" />,
      label: "我的活动",
      status: "可见",
      visible: true,
    },
    {
      id: "connections",
      icon: <Network className="w-5 h-5" />,
      label: "我的人脉",
      status: "可见",
      visible: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          设置你的隐私偏好
        </h2>
        <p className="text-sm text-slate-600">
          仅共享你同意与他人分享的数据。
        </p>
      </div>

      {/* Privacy Items List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:border-slate-200 transition-all"
          >
            {/* Left: Icon and Label */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.status}
                </p>
              </div>
            </div>

            {/* Right: Toggle Switch */}
            <button
              onClick={() => handleToggle(item.id)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                item.visible ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                  item.visible ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-6">
        <p className="text-xs text-blue-700">
          <span className="font-semibold">💡 提示:</span> 这些设置可以随时在账户隐私设置中更改。
        </p>
      </div>
    </div>
  );
};
