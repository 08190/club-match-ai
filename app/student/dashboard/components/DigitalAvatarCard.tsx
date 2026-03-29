"use client";

import React from "react";
import { SkillsRadarChart } from "./SkillsRadarChart";
import { Edit2, Download } from "lucide-react";

interface StudentProfile {
  name: string;
  grade: string;
  major: string;
  avatar: string;
  interests: string[];
  skills: Array<{ name: string; value: number }>;
}

interface DigitalAvatarCardProps {
  profile: StudentProfile;
}

export const DigitalAvatarCard: React.FC<DigitalAvatarCardProps> = ({
  profile,
}) => {
  return (
    <div className="sticky top-20 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
            />
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            {profile.grade} · {profile.major}
          </p>
          <p className="text-xs text-gray-500">高质量匹配度: 98%</p>
        </div>

        {/* Download Profile Button */}
        <button className="w-full mb-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all">
          <Download className="w-4 h-4" />
          导出个人档案
        </button>

        {/* Interests Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            我的兴趣标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* MBTI Info */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-600 mb-1">人格类型</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ENFP
          </p>
          <p className="text-xs text-gray-600 mt-1">热情的倡导者</p>
        </div>
      </div>

      {/* Skills Radar Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          技能 & 个性雷达
        </h3>
        <SkillsRadarChart data={profile.skills} />
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {profile.skills.map((skill) => (
            <div key={skill.name} className="px-2 py-2">
              <p className="text-xs text-gray-600 mb-1">{skill.name}</p>
              <p className="text-lg font-bold text-blue-600">{skill.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
