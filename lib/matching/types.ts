/**
 * Type Definitions and Interfaces for the Two-Way Matching Engine
 * Core data structures for Student Profiles, Club Requirements, and Match Results
 */

/**
 * Represents a student's profile with interests, skills, and personality traits
 */
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  grade: string;
  major: string;

  /**
   * Student's explicit interest tags
   * Examples: "Photography", "eSports", "Debate", "Programming"
   */
  interestTags: string[];

  /**
   * Skills and proficiency levels (0-100)
   * Examples: { "Python": 85, "Video Editing": 75, "Leadership": 80 }
   */
  skillsProfile: Record<string, number>;

  /**
   * MBTI personality type (e.g., "ENFP", "ISTJ")
   */
  mbti: string;

  /**
   * User avatar for display
   */
  avatar: string;
}

/**
 * Represents a club's requirements and preferences for new members
 */
export interface ClubRequirement {
  id: string;
  clubName: string;
  category: string;
  description: string;

  /**
   * Club's category tags (what the club is about)
   * Examples: "Photography", "Innovation", "Competitive"
   */
  categoryTags: string[];

  /**
   * Required skills with minimum proficiency thresholds
   * Examples: { "Video Editing": 60, "Communication": 70 }
   */
  requiredSkills: Record<string, number>;

  /**
   * Preferred MBTI types for this club
   * Examples: ["ENFP", "ENTP"] for creative/expressive roles
   */
  preferredMBTI: string[];

  /**
   * Base activity frequency and intensity level
   * Used for personality bonus calculation
   */
  activityLevel: "casual" | "moderate" | "intensive";

  /**
   * Total members in the club
   */
  memberCount: number;
}

/**
 * Result of a two-way matching calculation
 */
export interface MatchResult {
  studentId: string;
  clubId: string;
  studentName: string;
  clubName: string;

  /**
   * Overall match score (0-100)
   */
  totalScore: number;

  /**
   * Component scores for transparency
   */
  scoreBreakdown: {
    interestFit: {
      score: number;
      weight: number; // 30%
      explanation: string;
    };
    skillFit: {
      score: number;
      weight: number; // 50%
      explanation: string;
    };
    personalityBonus: {
      score: number;
      weight: number; // 20%
      explanation: string;
    };
  };

  /**
   * AI-generated recommendation reason from collaborative filtering
   */
  recommendationReason: string;

  /**
   * Match quality rating
   */
  matchQuality: "Excellent" | "Good" | "Moderate" | "Fair" | "Poor";

  /**
   * Timestamp of calculation
   */
  calculatedAt: string;
}

/**
 * Business funnel metrics for dashboard analytics
 */
export interface FunnelMetrics {
  period: string;
  stage1_impressions: {
    count: number;
    description: string;
  };
  stage2_applications: {
    count: number;
    conversionRate: number; // from impressions
    description: string;
  };
  stage3_interviews: {
    count: number;
    conversionRate: number; // from applications
    description: string;
  };
  stage4_offers: {
    count: number;
    conversionRate: number; // from interviews
    description: string;
  };
  totalDropoff: number;
  avgTimeToHire: number; // in days
}

/**
 * Batch matching response combining multiple match results
 */
export interface BatchMatchResponse {
  studentProfile: StudentProfile;
  matches: MatchResult[];
  topMatches: MatchResult[]; // Top 3 matches
  funnelMetrics: FunnelMetrics;
  processingTimeMs: number;
}
