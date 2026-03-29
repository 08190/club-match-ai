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
        <RadarChart data={data} margin={{ top: 0, right: 30, bottom: 0, left: 30 }}>
          <PolarGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <PolarRadiusAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            angle={90}
            domain={[0, 100]}
          />
          <Radar
            name="技能值"
            dataKey="value"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.6}
            isAnimationActive={true}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
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
