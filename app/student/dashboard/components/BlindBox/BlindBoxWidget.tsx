"use client";

import React, { useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { BlindBoxModal } from "./BlindBoxModal";
import { ClubCard } from "../../lib/mockData";
import { getBlindBoxRecommendation } from "./utils";

interface BlindBoxWidgetProps {
  clubs: ClubCard[];
}

export const BlindBoxWidget: React.FC<BlindBoxWidgetProps> = ({ clubs }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendation, setRecommendation] = useState(() =>
    getBlindBoxRecommendation(clubs),
  );

  const handleShake = () => {
    setIsShaking(true);
    // Trigger modal after shake animation completes
    setTimeout(() => {
      setIsShaking(false);
      setIsModalOpen(true);
      // Generate new recommendation when modal opens
      setRecommendation(getBlindBoxRecommendation(clubs));
    }, 800);
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-5px) rotate(-2deg); }
          20% { transform: translateX(5px) rotate(2deg); }
          30% { transform: translateX(-5px) rotate(-2deg); }
          40% { transform: translateX(5px) rotate(2deg); }
          50% { transform: translateX(-5px) rotate(-2deg); }
          60% { transform: translateX(5px) rotate(2deg); }
          70% { transform: translateX(-5px) rotate(-2deg); }
          80% { transform: translateX(5px) rotate(2deg); }
          90% { transform: translateX(-5px) rotate(-2deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .blind-box-shake {
          animation: shake 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .blind-box-float:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      {/* Blind Box Widget */}
      <div className="mb-6">
        <button
          onClick={handleShake}
          disabled={isShaking}
          className="group relative w-full"
        >
          {/* Main Card */}
          <div
            className={`w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-300 overflow-hidden ${
              isShaking ? "blind-box-shake" : "blind-box-float"
            } ${!isShaking ? "cursor-pointer hover:scale-105" : "cursor-not-allowed opacity-75"}`}
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl animate-bounce" style={{ animationDelay: "0s" }}>
                  🎁
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white">社团盲盒</h3>
                  <p className="text-sm text-purple-100">
                    发现意想不到的惊喜
                  </p>
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            🎲 不知道选哪个？摇一摇吧！
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        </button>
      </div>

      {/* Blind Box Modal */}
      <BlindBoxModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recommendation={recommendation}
      />
    </>
  );
};
