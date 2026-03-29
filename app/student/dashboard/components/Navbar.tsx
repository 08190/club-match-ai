"use client";

import React from "react";
import { Search, Bell, Settings } from "lucide-react";

interface NavbarProps {
  userAvatar?: string;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  userAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  userName = "李明",
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CM</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Club Match
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索社团、活动..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-gray-900">
                  {userName}
                </span>
                <span className="text-xs text-gray-500">大二 · 计算机</span>
              </div>
              <img
                src={userAvatar}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 hover:border-purple-500 transition-colors cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
