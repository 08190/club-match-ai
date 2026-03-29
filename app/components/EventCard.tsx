"use client";

import React from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CampusEvent } from "../student/dashboard/lib/eventsData";

interface EventCardProps {
  event: CampusEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-sm">
          <p className="text-xs font-bold text-blue-600">{formattedDate}</p>
          <p className="text-xs text-slate-600 font-medium">{event.time}</p>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 line-clamp-2">
              {event.location}
            </p>
          </div>

          {/* Attendees */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-xs text-slate-600">{event.attendees} 人参加</p>
          </div>
        </div>

        {/* Club Info + CTA */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">主办社团</p>
              <p className="font-semibold text-slate-900">{event.hostingClub}</p>
            </div>
            <Link
              href={`/student/club/${event.clubId}`}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
            >
              注册加入
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
