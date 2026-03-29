"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SkillRadarData {
  name: string;
  value: number;
}

interface SkillsRadarChartProps {
  data: SkillRadarData[];
}

export const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <PolarRadiusAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            angle={90}
            domain={[0, 100]}
          />
          <Radar
            name="技能值"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
            isAnimationActive={true}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            formatter={(value) => [`${value}分`, "技能值"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
