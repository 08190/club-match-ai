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

// Recommendation reasons based on domain
const RECOMMENDATION_REASONS: { [key: string]: string } = {
  Arts: "Try something different! This club explores the visual storytelling side of events.",
  Creative:
    "Expand your horizon! Creative thinking skills transfer across all disciplines.",
  Design:
    "Design thinking will enhance your technical projects. Great collaboration opportunity!",
  Events:
    "Community and networking matter! Build soft skills while making memories.",
  Sports:
    "Balance your tech life! Active communities boost creativity and teamwork.",
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
    const randomDomain = CLUB_DOMAINS[randomClub.name] || "This Club";
    return {
      club: randomClub,
      reason: `Discover ${randomDomain}! This club brings a fresh perspective to your journey.`,
    };
  }

  // Pick a random club from opposite domain clubs
  const selectedClub =
    oppositeDomainClubs[Math.floor(Math.random() * oppositeDomainClubs.length)];
  const clubDomain = CLUB_DOMAINS[selectedClub.name] || "This Club";

  return {
    club: selectedClub,
    reason:
      RECOMMENDATION_REASONS[clubDomain] ||
      `Explore ${clubDomain}! You might discover something unexpected.`,
  };
}
