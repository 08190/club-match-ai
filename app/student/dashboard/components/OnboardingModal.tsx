"use client";

import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, Upload, Check } from "lucide-react";
import { PrivacyPreferences } from "./PrivacyPreferences";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    avatar: "/default-avatar.jpg",
    hobbies: [] as string[],
    bio: "",
  });

  const hobbyOptions = [
    "摄影",
    "编程",
    "设计",
    "音乐",
    "运动",
    "旅游",
    "阅读",
    "游戏",
    "电影",
    "烹饪",
    "美术",
    "写作",
  ];

  const handleHobbyToggle = (hobby: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter((h) => h !== hobby)
        : [...prev.hobbies, hobby],
    }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save onboarding data (would go to backend)
    console.log("Onboarding complete", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentStep === 1 ? "完成你的个人资料" : "隐私偏好设置"}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                第 {currentStep} / 2
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 min-h-96">
            {currentStep === 1 ? (
              <div className="space-y-6">
                {/* Avatar Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    上传头像（可选）
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                      <img
                        src={formData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium">
                      <Upload className="w-4 h-4" />
                      选择头像
                    </button>
                  </div>
                </div>

                {/* Hobbies Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    选择你的兴趣爱好（可选）
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {hobbyOptions.map((hobby) => (
                      <button
                        key={hobby}
                        onClick={() => handleHobbyToggle(hobby)}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                          formData.hobbies.includes(hobby)
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {hobby}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    个人简介（可选）
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    placeholder="告诉我们关于你的一些事情..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {formData.bio.length}/200
                  </p>
                </div>
              </div>
            ) : (
              <PrivacyPreferences />
            )}
          </div>

          {/* Footer / Actions */}
          <div className="border-t border-slate-100 px-6 sm:px-8 py-4 bg-slate-50 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 font-medium hover:bg-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i + 1 <= currentStep ? "bg-blue-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              {currentStep === 2 ? (
                <>
                  <Check className="w-4 h-4" />
                  完成设置
                </>
              ) : (
                <>
                  下一步
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Skip Option */}
          <div className="px-6 sm:px-8 py-3 border-t border-slate-100 text-center">
            <button
              onClick={onClose}
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              稍后设置
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
