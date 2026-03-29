"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Kanban,
  Calendar,
  Palette,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = "dashboard" }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    {
      id: "dashboard",
      label: "仪表盘",
      icon: BarChart3,
      href: "#dashboard",
    },
    {
      id: "kanban",
      label: "申请者Kanban",
      icon: Kanban,
      href: "#kanban",
    },
    {
      id: "scheduler",
      label: "自动排期",
      icon: Calendar,
      href: "#scheduler",
    },
    {
      id: "branding",
      label: "社团品牌",
      icon: Palette,
      href: "#branding",
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 hover:bg-slate-200 rounded-lg"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-900" />
        ) : (
          <Menu className="w-6 h-6 text-slate-900" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-lg z-30 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CM</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Club Match</h1>
                <p className="text-xs text-slate-400">管理工作区</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    // Navigation logic would go here
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Club Info Section */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-slate-700 rounded-lg p-4 mb-4">
              <p className="text-xs text-slate-300 mb-2">当前社团</p>
              <p className="font-semibold">摄影协会</p>
              <p className="text-xs text-slate-400 mt-1">245 位成员</p>
            </div>

            {/* Logout Button */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium">
              <LogOut className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
