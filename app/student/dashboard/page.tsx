"use client";

import React from "react";
import { Navbar } from "./components/Navbar";
import { DigitalAvatarCard } from "./components/DigitalAvatarCard";
import { DiscoveryFeed } from "./components/DiscoveryFeed";
import { BlindBoxWidget } from "./components/BlindBox/BlindBoxWidget";
import { mockStudentProfile, mockClubs } from "./lib/mockData";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar userAvatar={mockStudentProfile.avatar} userName={mockStudentProfile.name} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Digital Avatar (1/3) */}
          <div className="lg:col-span-1">
            <DigitalAvatarCard profile={mockStudentProfile} />
          </div>

          {/* Right Column: Discovery Feed (2/3) */}
          <div className="lg:col-span-2">
            {/* Blind Box Feature - Serendipity Matcher */}
            <BlindBoxWidget clubs={mockClubs} />
            
            {/* Club Discovery Feed */}
            <DiscoveryFeed clubs={mockClubs} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                关于我们
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    平台介绍
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    核心价值
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                帮助中心
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    使用指南
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    常见问题
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                联系方式
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    意见反馈
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    联系支持
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                法律
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    隐私政策
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    条款协议
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-600 text-sm">
              &copy; 2026 Club Match AI. 所有权利保留。
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">微博</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.29 20a11.99 11.99 0 0 1-5.82-1.11A12 12 0 0 1 .44 12.1a12 12 0 0 1 1.62-6.42 12 12 0 0 1 5.28-4.64A12 12 0 0 1 20 10.6a12 12 0 0 1-1.87 6.59 12 12 0 0 1-5.35 4.5A11.97 11.97 0 0 1 8.29 20Z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">微信</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
