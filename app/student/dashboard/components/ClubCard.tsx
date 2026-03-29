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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:scale-105 border border-gray-100">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden bg-gray-200 group">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark?.(id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Bookmark
            className={`w-5 h-5 ${
              isBookmarked ? "fill-blue-500 text-blue-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-md shadow-md flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Club Name */}
        <h3 className="text-base font-bold text-gray-900 mb-2 truncate hover:text-blue-600 cursor-pointer">
          {name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Members and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-600">
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
