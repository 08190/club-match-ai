"use client";

import React from "react";
import { Eye, FileText, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: "blue" | "green" | "purple";
}

const iconMap = {
  eye: Eye,
  "file-text": FileText,
  "trending-up": TrendingUp,
};

const colorClasses = {
  blue: "bg-blue-50 border-blue-200",
  green: "bg-green-50 border-green-200",
  purple: "bg-blue-100 border-blue-200",
};

const iconColorClasses = {
  blue: "text-blue-600 bg-blue-100",
  green: "text-green-600 bg-green-100",
  purple: "text-blue-600 bg-blue-100",
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const bgClass = colorClasses[color];
  const iconClass = iconColorClasses[color];
  const isPositive = change >= 0;

  return (
    <div
      className={`${bgClass} border rounded-xl p-6 hover:shadow-md transition-shadow shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          <div className="flex items-center gap-1 mt-3">
            {isPositive ? (
              <ArrowUp className={`w-4 h-4 text-green-600`} />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {Math.abs(change)}% {isPositive ? "增长" : "下降"}
            </span>
          </div>
        </div>
        {Icon && (
          <div className={`w-14 h-14 rounded-lg ${iconClass} flex items-center justify-center`}>
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
};
