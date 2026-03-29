"use client";

import React from "react";
import { Mail, Phone, Calendar, Zap } from "lucide-react";

interface ApplicantCardProps {
  id: string;
  name: string;
  jobRole: string;
  appliedDate: string;
  avatar: string;
  resumeScore: number;
  matchScore: number;
  skills: string[];
  email: string;
  phone: string;
}

// Circular progress component
const CircularProgress: React.FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 80,
}) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percentage: number) => {
    if (percentage >= 85) return "#10b981"; // green
    if (percentage >= 75) return "#3b82f6"; // blue
    if (percentage >= 60) return "#f59e0b"; // amber
    return "#ef4444"; // red
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(percentage)}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-gray-900">{percentage}%</span>
        <span className="text-xs text-gray-500">匹配度</span>
      </div>
    </div>
  );
};

export const ApplicantCard: React.FC<ApplicantCardProps> = ({
  id,
  name,
  jobRole,
  appliedDate,
  avatar,
  resumeScore,
  matchScore,
  skills,
  email,
  phone,
}) => {
  const appliedDaysAgo = Math.floor(
    (new Date().getTime() - new Date(appliedDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 space-y-4">
      {/* Header with Avatar and Apply Date */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm">{name}</h3>
            <p className="text-xs text-gray-500">{jobRole}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap px-2 py-1 bg-gray-100 rounded">
          {appliedDaysAgo === 0 ? "今天" : `${appliedDaysAgo}天前`}
        </span>
      </div>

      {/* Match Score Circular Progress */}
      <div className="flex justify-center py-2">
        <CircularProgress percentage={matchScore} size={80} />
      </div>

      {/* Skills Badges with AI Parsing Label */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 mb-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <p className="text-xs font-semibold text-gray-700">AI解析技能</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume Score Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-700">简历评分</span>
          <span className="text-xs font-bold text-gray-900">{resumeScore}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            style={{ width: `${resumeScore}%` }}
          ></div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Mail className="w-3 h-3" />
          {email}
        </a>
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Phone className="w-3 h-3" />
          {phone}
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
          查看简历
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors">
          评论
        </button>
      </div>
    </div>
  );
};
