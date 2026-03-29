"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, Zap } from "lucide-react";
import { BlindBoxResult } from "./utils";

interface BlindBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: BlindBoxResult;
}

// Emoji map for different club categories
const CATEGORY_EMOJI_MAP: { [key: string]: string } = {
  "创意娱乐": "📷",
  "竞技体育": "🎮",
  "学术竞技": "💬",
  "技术科学": "💻",
  "创业创新": "🚀",
  "社交生活": "🌍",
};

export const BlindBoxModal: React.FC<BlindBoxModalProps> = ({
  isOpen,
  onClose,
  recommendation,
}) => {
  const [isUnboxing, setIsUnboxing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Trigger unboxing animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsRevealed(false);
      setIsUnboxing(true);
      // Reveal content after unboxing animation
      const timer = setTimeout(() => {
        setIsUnboxing(false);
        setIsRevealed(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { club, reason } = recommendation;
  const clubEmoji = CATEGORY_EMOJI_MAP[club.category] || "🎁";

  return (
    <>
      <style>{`
        @keyframes unbox {
          0% {
            transform: scale(0.8) rotateY(0deg) rotateX(0deg);
            opacity: 0;
          }
          25% {
            transform: scale(1.1) rotateY(10deg) rotateX(-10deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotateY(180deg) rotateX(5deg);
          }
          75% {
            transform: scale(1.15) rotateY(360deg) rotateX(-5deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotateY(360deg) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes boxShake {
          0%, 100% { transform: translateY(0) scaleX(1); }
          5% { transform: translateY(-10px) scaleX(0.95); }
          10% { transform: translateY(0) scaleX(1.05); }
          15% { transform: translateY(-5px) scaleX(0.98); }
          20% { transform: translateY(0) scaleX(1.02); }
          100% { transform: translateY(0) scaleX(1); }
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .unbox-animation {
          animation: unbox 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .box-shake {
          animation: boxShake 1s ease-in-out;
        }
        
        .confetti {
          position: absolute;
          height: 10px;
          width: 10px;
          pointer-events: none;
        }
        
        .confetti-1 {
          animation: confetti-fall 1.5s ease-in forwards;
          left: 20%;
          background: #FF6B6B;
        }
        
        .confetti-2 {
          animation: confetti-fall 1.5s ease-in 0.1s forwards;
          left: 40%;
          background: #FFD93D;
        }
        
        .confetti-3 {
          animation: confetti-fall 1.5s ease-in 0.2s forwards;
          left: 60%;
          background: #6BCB77;
        }
        
        .confetti-4 {
          animation: confetti-fall 1.5s ease-in 0.3s forwards;
          left: 80%;
          background: #4D96FF;
        }
        
        .reveal-content {
          animation: slideUp 0.8s ease-out 1.5s both;
        }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Unboxing Container */}
          <div className="relative bg-gradient-to-b from-purple-100 to-pink-100 pt-12 pb-8 px-6 min-h-80 flex flex-col items-center justify-center">
            {/* Confetti Animation */}
            {isUnboxing && (
              <>
                <div className="confetti confetti-1" />
                <div className="confetti confetti-2" />
                <div className="confetti confetti-3" />
                <div className="confetti confetti-4" />
              </>
            )}

            {/* Gift Box Animation */}
            {isUnboxing && (
              <div className={`text-6xl mb-4 unbox-animation ${isUnboxing ? "box-shake" : ""}`}>
                🎁
              </div>
            )}

            {/* Revealed Content */}
            {isRevealed && (
              <div className="reveal-content w-full space-y-6">
                {/* Club Logo */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-4xl">{clubEmoji}</span>
                  </div>
                </div>

                {/* Club Info */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {club.name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {club.description}
                  </p>
                </div>

                {/* Recommendation Reason */}
                <div className="bg-white bg-opacity-70 rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex gap-2 items-start">
                    <Zap className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{reason}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    下次再看
                  </button>
                  <button className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    了解详情
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Unboxing State - Loading */}
            {isUnboxing && (
              <div className="text-center space-y-3">
                <div className="text-lg font-semibold text-purple-700">
                  正在开启惊喜...
                </div>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
