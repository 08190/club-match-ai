"use client";

import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EventCard } from "./EventCard";
import { mockCampusEvents } from "../student/dashboard/lib/eventsData";

export const UpcomingEventsSection: React.FC = () => {
  // Get first 3-4 events for landing page
  const featuredEvents = mockCampusEvents.slice(0, 4);

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                即将到来的校园活动
              </h2>
            </div>
            <p className="text-lg text-slate-600 mt-2">
              发现并注册参加校园社团组织的精彩活动
            </p>
          </div>

          {/* View All Link */}
          <Link
            href="/student/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md whitespace-nowrap"
          >
            查看所有活动
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-8">
            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold text-blue-600">
                {mockCampusEvents.length}
              </p>
              <p className="text-sm text-slate-600 mt-1">个活动本学期</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold text-purple-600">
                {mockCampusEvents.reduce((sum, e) => sum + e.attendees, 0)}
              </p>
              <p className="text-sm text-slate-600 mt-1">位学生已参加</p>
            </div>
          </div>

          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            订阅活动提醒
          </button>
        </div>
      </div>
    </div>
  );
};
