"use client";

import React from "react";
import { Play, Calendar, Users } from "lucide-react";
import Link from "next/link";

export const QuickActionCards: React.FC = () => {
  const actions = [
    {
      id: "video",
      icon: Play,
      title: "新用户视频教程",
      description: "了解平台基础功能和如何开始",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "#",
    },
    {
      id: "events",
      icon: Calendar,
      title: "校园活动",
      description: "发现并注册感兴趣的校园活动",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/student/events",
    },
    {
      id: "groups",
      icon: Users,
      title: "社团群聊",
      description: "与社团成员在线交流，找到你的社区",
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      href: "/student/groups",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.id}
            href={action.href}
            className="group relative"
          >
            <div className={`${action.bgColor} rounded-xl p-6 border border-slate-100 hover:border-slate-200 transition-all hover:shadow-md cursor-pointer`}>
              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-slate-900 text-base mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {action.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-3 pt-3 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className={`text-sm font-medium ${action.textColor}`}>
                  立即查看 →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
