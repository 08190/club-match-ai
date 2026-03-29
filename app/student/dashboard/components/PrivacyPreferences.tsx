"use client";

import React, { useState } from "react";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  Network,
} from "lucide-react";

interface PrivacyItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  status: string;
  visible: boolean;
}

export const PrivacyPreferences: React.FC = () => {
  const [items, setItems] = useState<PrivacyItem[]>([
    {
      id: "graduate",
      icon: <User className="w-5 h-5" />,
      label: "Graduate",
      status: "Visible",
      visible: true,
    },
    {
      id: "biography",
      icon: <FileText className="w-5 h-5" />,
      label: "Biography",
      status: "Not set",
      visible: true,
    },
    {
      id: "company",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Company",
      status: "Not set",
      visible: true,
    },
    {
      id: "school",
      icon: <GraduationCap className="w-5 h-5" />,
      label: "School/Program",
      status: "Faculty of Science",
      visible: true,
    },
    {
      id: "groups",
      icon: <Users className="w-5 h-5" />,
      label: "My groups",
      status: "Visible",
      visible: true,
    },
    {
      id: "events",
      icon: <Calendar className="w-5 h-5" />,
      label: "My events",
      status: "Visible",
      visible: true,
    },
    {
      id: "connections",
      icon: <Network className="w-5 h-5" />,
      label: "My connections",
      status: "Visible",
      visible: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Set your privacy preferences
        </h2>
        <p className="text-sm text-slate-600">
          Only share the data that you are okay to share with others.
        </p>
      </div>

      {/* Privacy Items List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:border-slate-200 transition-all"
          >
            {/* Left: Icon and Label */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 text-sm">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.status}
                </p>
              </div>
            </div>

            {/* Right: Toggle Switch */}
            <button
              onClick={() => handleToggle(item.id)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                item.visible ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                  item.visible ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mt-6">
        <p className="text-xs text-blue-700">
          <span className="font-semibold">💡 Tip:</span> These settings can be changed anytime in your account privacy settings.
        </p>
      </div>
    </div>
  );
};
