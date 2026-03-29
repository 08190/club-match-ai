"use client";

import React from "react";
import { Star, Users, Bookmark } from "lucide-react";

interface ClubCardProps {
  id: string;
  name: string;
  coverImage: string;
  tags: string[];
  rating: number;
  memberCount: number;
  category: string;
  onBookmark?: (id: string) => void;
  isBookmarked?: boolean;
}

export const ClubCard: React.FC<ClubCardProps> = ({
  id,
  name,
  coverImage,
  tags,
  rating,
  memberCount,
  category,
  onBookmark,
  isBookmarked = false,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden bg-slate-200 group rounded-t-lg">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark?.(id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-slate-50 transition-all"
        >
          <Bookmark
            className={`w-5 h-5 ${
              isBookmarked ? "fill-blue-600 text-blue-600" : "text-slate-400"
            }`}
          />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 border border-slate-100">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-slate-900">{rating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Club Name */}
        <h3 className="text-base font-bold text-slate-900 mb-2 truncate hover:text-blue-600 cursor-pointer">
          {name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Members and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 text-slate-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{memberCount} 成员</span>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors">
            详情&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
