"use client";

import React from "react";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

interface InterviewSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  applicantsCount: number;
  interviewer: string;
  location: string;
}

interface AutoSchedulerProps {
  slots: InterviewSlot[];
}

const DayGroup: React.FC<{
  date: string;
  slots: InterviewSlot[];
}> = ({ date, slots }) => {
  const [day, month, dayName] = (() => {
    const d = new Date(date);
    const dayNum = d.getDate();
    const monthNum = d.getMonth() + 1;
    const dayNameStr = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
    return [dayNum, monthNum, dayNameStr];
  })();

  const isSoon =
    new Date(date).getTime() - new Date().getTime() < 86400000 * 1; // less than 1 day

  return (
    <div className="mb-8">
      {/* Date Header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg font-bold ${
            isSoon
              ? "bg-red-100 border-2 border-red-500"
              : "bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-300"
          }`}
        >
          <span className="text-2xl text-gray-900">{day}</span>
          <span className="text-xs text-gray-600">{month}月</span>
          <span className={`text-xs font-semibold ${isSoon ? "text-red-600" : "text-blue-600"}`}>
            星期{dayName} {isSoon ? "🔴" : ""}
          </span>
        </div>

        {/* Timeline vertical line and count */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-2">
            {slots.map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {idx === 0 && (
                  <div className="text-xs font-semibold text-gray-600 text-right w-20">
                    {slots.length} 场面试
                  </div>
                )}
              </div>
            ))}
          </div>
          {slots.length > 0 && (
            <div className="flex flex-col items-center h-full min-h-[120px]">
              <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-300"></div>
              {slots.length > 1 && (
                <div className="flex-1 w-0.5 bg-gradient-to-b from-blue-300 to-blue-100 my-1"></div>
              )}
            </div>
          )}
        </div>

        {/* Slots for this day */}
        <div className="flex-1 space-y-3">
          {slots.map((slot, idx) => (
            <div
              key={slot.id}
              className="bg-white border-l-4 border-blue-500 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:scale-102"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-gray-900">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {idx + 1}/{slots.length}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>
                    <span className="font-semibold">{slot.applicantsCount}</span> 位应聘者
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    面试官
                  </span>
                  <span>{slot.interviewer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{slot.location}</span>
                </div>
              </div>

              <button className="mt-3 w-full px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-xs font-medium transition-colors">
                查看详情
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AutoScheduler: React.FC<AutoSchedulerProps> = ({ slots }) => {
  // Group slots by date
  const groupedByDate = slots.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    },
    {} as Record<string, InterviewSlot[]>
  );

  // Sort dates
  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-blue-600" />
          自动排期日程
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">即将进行的面试</p>
          <p className="text-2xl font-bold text-blue-600">
            {slots.length}
            <span className="text-sm text-gray-500 ml-1">场</span>
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">🤖 智能排期系统:</span> 系统根据应聘者的面试时间偏好、面试官日程和会议室可用性，自动安排了最优的面试时间。支持拖拽重新排期。
        </p>
      </div>

      {/* Timeline */}
      <div className="custom-timeline">
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => (
            <DayGroup key={date} date={date} slots={groupedByDate[date]} />
          ))
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            暂无排期的面试
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="border-t border-gray-200 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {slots.reduce((sum, s) => sum + s.applicantsCount, 0)}
          </p>
          <p className="text-xs text-gray-600 mt-1">总应聘者数</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{slots.length}</p>
          <p className="text-xs text-gray-600 mt-1">明确的时间段</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {new Set(slots.map((s) => s.interviewer)).size}
          </p>
          <p className="text-xs text-gray-600 mt-1">面试官</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">
            {new Set(slots.map((s) => s.location)).size}
          </p>
          <p className="text-xs text-gray-600 mt-1">地点/形式</p>
        </div>
      </div>
    </div>
  );
};
