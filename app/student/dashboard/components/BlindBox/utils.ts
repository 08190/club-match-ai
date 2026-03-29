// Mock data and utilities for Club Blind Box feature
import { ClubCard } from "../../lib/mockData";

export interface BlindBoxResult {
  club: ClubCard;
  reason: string;
}

// Student's current interests (from dashboard context)
const STUDENT_INTERESTS = [
  "Technology",
  "Programming",
  "AI/ML",
  "Web Development",
];

// Map clubs to their domains
const CLUB_DOMAINS: { [key: string]: string } = {
  "AI创新实验室": "Technology",
  "编程爱好者社区": "Technology",
  "UI/UX设计工坊": "Design",
  "摄影协会": "Arts",
  "学生活动委员会": "Events",
  "校园创意中心": "Creative",
};

// 根据不同俱乐部分类的推荐原因
const RECOMMENDATION_REASONS: { [key: string]: string } = {
  Arts: "尝试不同的方向！这个社团探索视觉叙事和创意表达。",
  Creative:
    "拓宽你的视野！创意思维在任何领域都很重要。",
  Design:
    "设计思维会提升你的技术项目。这是绝佳的跨领域合作机会！",
  Events:
    "社区和人脉很重要！在活动组织中发展软实力。",
  Sports:
    "平衡技术生活！运动社团能提升创意和团队合作。",
};

/**
 * Recommend a club from a completely different domain than student's main interests
 */
export function getBlindBoxRecommendation(
  allClubs: ClubCard[],
  studentInterests: string[] = STUDENT_INTERESTS,
): BlindBoxResult {
  // Student's dominant domains
  const studentDomains = new Set<string>();
  studentInterests.forEach((interest) => {
    // Map interest keywords to domains
    if (
      interest.includes("Tech") ||
      interest.includes("Program") ||
      interest.includes("AI")
    ) {
      studentDomains.add("Technology");
    }
    if (interest.includes("Design")) {
      studentDomains.add("Design");
    }
  });

  // Find clubs from opposite domains
  const oppositeDomainClubs = allClubs.filter((club) => {
    const clubDomain = CLUB_DOMAINS[club.name] || "Unknown";
    return !studentDomains.has(clubDomain);
  });

  // If no opposite domain clubs, just pick random
  if (oppositeDomainClubs.length === 0) {
    const randomClub = allClubs[Math.floor(Math.random() * allClubs.length)];
    const randomDomain = CLUB_DOMAINS[randomClub.name] || "这个";
    return {
      club: randomClub,
      reason: `发现${randomDomain}的精彩！这个社团会为你打开新的视角。`,
    };
  }

  // Pick a random club from opposite domain clubs
  const selectedClub =
    oppositeDomainClubs[Math.floor(Math.random() * oppositeDomainClubs.length)];
  const clubDomain = CLUB_DOMAINS[selectedClub.name] || "这个";

  return {
    club: selectedClub,
    reason:
      RECOMMENDATION_REASONS[clubDomain] ||
      `探索${clubDomain}的世界！你可能会发现意想不到的机会。`,
  };
}
