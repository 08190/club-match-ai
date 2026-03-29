"use client";

import React, { useState } from "react";
import { ClubCard } from "./ClubCard";
import { Sparkles, Filter } from "lucide-react";

interface Club {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tags: string[];
  rating: number;
  memberCount: number;
  category: string;
}

interface DiscoveryFeedProps {
  clubs: Club[];
}

export const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ clubs }) => {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleBookmark = (clubId: string) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(clubId)) {
      newBookmarks.delete(clubId);
    } else {
      newBookmarks.add(clubId);
    }
    setBookmarks(newBookmarks);
  };

  const categories = ["all", ...new Set(clubs.map((club) => club.category))];

  const filteredClubs =
    selectedFilter === "all"
      ? clubs
      : clubs.filter((club) => club.category === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            发现你的次元
          </h1>
          <p className="text-gray-600">
            基于你的兴趣为你推荐优质社团，找到志同道合的伙伴
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                selectedFilter === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "全部分类" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {filteredClubs.map((club, index) => (
          <div
            key={club.id}
            className={`${
              index % 3 === 1 ? "sm:translate-y-12 lg:translate-y-16" : ""
            }`}
          >
            <ClubCard
              {...club}
              onBookmark={handleBookmark}
              isBookmarked={bookmarks.has(club.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClubs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Filter className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">未找到相关社团</p>
          <p className="text-sm">尝试其他分类或搜索关键词</p>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center border border-blue-100">
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-bold text-gray-900">{filteredClubs.length}</span>
          {" 个社团来自 "}
          <span className="font-bold text-gray-900">{categories.length - 1}</span>
          {" 个分类"}
        </p>
        <p className="text-xs text-gray-500">
          💡 小提示：通过书签功能保存感兴趣的社团，稍后可以快速查看
        </p>
      </div>
    </div>
  );
};
