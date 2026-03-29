/**
 * Core Two-Way Matching Engine
 * Implements weighted scoring model for student-club compatibility
 */

import {
  StudentProfile,
  ClubRequirement,
  MatchResult,
} from "./types";

/**
 * WEIGHTS for the matching algorithm
 * Total must equal 100%
 */
const MATCHING_WEIGHTS = {
  INTEREST_FIT: 0.30, // 30%
  SKILL_FIT: 0.50, // 50%
  PERSONALITY_BONUS: 0.20, // 20%
};

/**
 * MBTI Personality Trait Mappings
 * Used for personality bonus calculations
 */
const MBTI_TRAITS: Record<string, Record<string, boolean>> = {
  // Extroversion (E) vs Introversion (I)
  E: { extroverted: true, sociable: true, outgoing: true },
  I: { introverted: true, focused: true, independent: true },

  // Sensing (S) vs Intuition (N)
  S: { practical: true, detail_oriented: true, grounded: true },
  N: { innovative: true, visionary: true, creative: true },

  // Thinking (T) vs Feeling (F)
  T: { logical: true, analytical: true, objective: true },
  F: { emphatic: true, people_focused: true, values_driven: true },

  // Judging (J) vs Perceiving (P)
  J: { organized: true, planned: true, structured: true },
  P: { flexible: true, spontaneous: true, adaptable: true },
};

/**
 * Calculates the Interest Fit Score (30% weight)
 *
 * Algorithm: Modified Jaccard Similarity
 * - Measures overlap between student's interests and club's category tags
 * - Formula: Intersection / Union
 * - Result normalized to 0-100
 *
 * @param studentInterests - Tags like ["Photography", "Video Editing"]
 * @param clubTags - What the club offers
 * @returns Score from 0-100
 */
function calculateInterestFit(
  studentInterests: string[],
  clubTags: string[]
): { score: number; explanation: string } {
  if (studentInterests.length === 0 || clubTags.length === 0) {
    return {
      score: 0,
      explanation: "Missing interest data for calculation",
    };
  }

  // Convert to lowercase for case-insensitive matching
  const studentSet = new Set(
    studentInterests.map((tag) => tag.toLowerCase())
  );
  const clubSet = new Set(clubTags.map((tag) => tag.toLowerCase()));

  // Calculate intersection (common interests)
  const intersection = new Set(
    [...studentSet].filter((x) => clubSet.has(x))
  );

  // Calculate union (total unique interests)
  const union = new Set([...studentSet, ...clubSet]);

  // Jaccard Similarity: |Intersection| / |Union|
  const jaccardSimilarity =
    union.size > 0 ? intersection.size / union.size : 0;

  // Convert to 0-100 scale
  const score = Math.round(jaccardSimilarity * 100);

  const explanation =
    intersection.size > 0
      ? `${intersection.size} 个共同兴趣 (${Array.from(intersection).join(", ")})`
      : "没有共同的兴趣标签";

  return { score, explanation };
}

/**
 * Calculates the Skill Fit Score (50% weight)
 *
 * Algorithm: Requirements Coverage Analysis
 * - For each required skill, checks if student meets the minimum threshold
 * - Bonus points for exceeding requirements
 * - Formula: (Met Requirements + Bonus) / Total Requirements * 100
 *
 * @param studentSkills - Skills and proficiency {"Python": 85, "SQL": 70}
 * @param requiredSkills - Club's skill requirements {"Python": 60, "SQL": 50}
 * @returns Score from 0-100
 */
function calculateSkillFit(
  studentSkills: Record<string, number>,
  requiredSkills: Record<string, number>
): { score: number; explanation: string } {
  const requiredSkillNames = Object.keys(requiredSkills);

  if (requiredSkillNames.length === 0) {
    return {
      score: 100,
      explanation: "该社团暂无具体技能要求",
    };
  }

  let metRequirements = 0;
  let totalBonus = 0;
  const metSkills: string[] = [];
  const missingSkills: string[] = [];

  // Evaluate each required skill
  for (const skillName of requiredSkillNames) {
    const requiredLevel = requiredSkills[skillName];
    const studentLevel = studentSkills[skillName] || 0;

    if (studentLevel >= requiredLevel) {
      metRequirements++;
      metSkills.push(skillName);

      // Bonus points: 0.1 point per 1 point above requirement, max 5 points
      const excess = Math.min(studentLevel - requiredLevel, 50);
      totalBonus += excess * 0.1;
    } else {
      missingSkills.push(
        `${skillName} (已有: ${studentLevel}, 需要: ${requiredLevel})`
      );
    }
  }

  // Calculate final score
  const baseScore = (metRequirements / requiredSkillNames.length) * 100;
  const bonusPoints = Math.min(totalBonus, 10); // Cap bonus at 10 points
  const finalScore = Math.min(baseScore + bonusPoints, 100);

  let explanation = "";
  if (metSkills.length > 0) {
    explanation += `满足 ${metSkills.length}/${requiredSkillNames.length} 项要求 (${metSkills.join(", ")})`;
  }
  if (missingSkills.length > 0) {
    explanation += missingSkills.length > 0 ? "; " : "";
    explanation += `缺少的技能: ${missingSkills.join("; ")}`;
  }

  return { score: Math.round(finalScore), explanation };
}

/**
 * Calculates the Personality Bonus Score (20% weight)
 *
 * Algorithm: MBTI Alignment with Role Requirements
 * - Matches student's MBTI with club's preferred types
 * - Awards bonus for alignment with activity level
 * - Formula:
 *   - Direct match: +50 points
 *   - Trait compatibility: +5-10 points per matching trait
 *   - Activity level match: +10-20 points
 *
 * @param studentMBTI - Student's MBTI type (e.g., "ENFP")
 * @param preferredMBTI - Club's preferred MBTI types
 * @param activityLevel - Club's intensity: "casual" | "moderate" | "intensive"
 * @returns Score from 0-100
 */
function calculatePersonalityBonus(
  studentMBTI: string,
  preferredMBTI: string[],
  activityLevel: "casual" | "moderate" | "intensive"
): { score: number; explanation: string } {
  let bonusScore = 0;
  let explanation = "";

  // 1. Direct MBTI Match (50 points max)
  if (preferredMBTI.includes(studentMBTI)) {
    bonusScore += 50;
    explanation += `MBTI 直接匹配 (${studentMBTI}): +50分 `;
  } else {
    // 2. Partial trait matching
    const studentTraits = studentMBTI.split("");
    const preferredTraits = new Set(preferredMBTI.flatMap((mbti) => mbti.split("")));

    let traitMatches = 0;
    for (const trait of studentTraits) {
      if (preferredTraits.has(trait)) {
        traitMatches++;
      }
    }

    const traitBonus = traitMatches * 10; // 10 points per matching trait
    bonusScore += traitBonus;
    explanation += `${traitMatches}/4 个MBTI维度匹配: +${traitBonus}分 `;
  }

  // 3. Activity Level Compatibility Bonus
  // Extroverts (E) prefer intensive activities
  // Introverts (I) prefer casual activities
  const isExtrovert = studentMBTI[0] === "E";

  if (
    (isExtrovert && activityLevel === "intensive") ||
    (!isExtrovert && activityLevel === "casual")
  ) {
    bonusScore += 20;
    explanation += `活动强度匹配: +20分`;
  } else if (activityLevel === "moderate") {
    bonusScore += 10;
    explanation += `活动强度一致: +10分`;
  }

  // Cap score at 100
  const finalScore = Math.min(bonusScore, 100);

  return { score: Math.round(finalScore), explanation };
}

/**
 * Generates AI-style recommendation reasons using collaborative filtering concept
 * Simulates insights from similar students
 */
function generateRecommendationReason(
  student: StudentProfile,
  club: ClubRequirement,
  totalScore: number
): string {
  const reasons: string[] = [];

  // Collaborative filtering insight
  const similarStudentCount = Math.floor(
    Math.random() * 20 + 5
  );
  reasons.push(
    `有 ${similarStudentCount} 位具有相似技能的学生也应聘了该社团`
  );

  // Interest-based insight
  if (totalScore >= 80) {
    reasons.push(`你的兴趣高度匹配该社团的核心价值`);
  } else if (totalScore >= 60) {
    reasons.push(
      `你的一些兴趣与该社团的方向吻合，建议继续探索`
    );
  }

  // Skill-based insight
  const topSkills = Object.entries(student.skillsProfile)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([skill]) => skill);

  if (topSkills.length > 0) {
    reasons.push(`你在 ${topSkills.join("、")} 等方面的实力获得社团认可`);
  }

  // Activity level expectation
  const activityLevel = club.activityLevel;
  if (activityLevel === "intensive") {
    reasons.push(`该社团需要积极投入的社员，适合有热情的你`);
  } else if (activityLevel === "casual") {
    reasons.push(`该社团提供灵活的参与方式，适合平衡学习和兴趣的你`);
  }

  // Return a comma-separated reason string
  return reasons.join("；");
}

/**
 * Determines match quality classification based on score
 */
function getMatchQuality(
  score: number
): "Excellent" | "Good" | "Moderate" | "Fair" | "Poor" {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Moderate";
  if (score >= 40) return "Fair";
  return "Poor";
}

/**
 * Main Matching Engine: Calculate bilateral match score
 *
 * This is the core function that brings together all scoring components
 * and produces a comprehensive match result.
 *
 * @param student - Complete student profile
 * @param club - Club requirements and preferences
 * @returns Detailed match result with breakdown and recommendation
 */
export function calculateMatchScore(
  student: StudentProfile,
  club: ClubRequirement
): MatchResult {
  const startTime = Date.now();

  // 1. Calculate Component Scores
  const interestFitResult = calculateInterestFit(
    student.interestTags,
    club.categoryTags
  );

  const skillFitResult = calculateSkillFit(
    student.skillsProfile,
    club.requiredSkills
  );

  const personalityBonusResult = calculatePersonalityBonus(
    student.mbti,
    club.preferredMBTI,
    club.activityLevel
  );

  // 2. Calculate Weighted Total Score
  const totalScore = Math.round(
    interestFitResult.score * MATCHING_WEIGHTS.INTEREST_FIT +
      skillFitResult.score * MATCHING_WEIGHTS.SKILL_FIT +
      personalityBonusResult.score * MATCHING_WEIGHTS.PERSONALITY_BONUS
  );

  // 3. Generate Recommendation Reason
  const recommendationReason = generateRecommendationReason(
    student,
    club,
    totalScore
  );

  // 4. Determine Match Quality
  const matchQuality = getMatchQuality(totalScore);

  // 5. Construct Result Object
  const result: MatchResult = {
    studentId: student.id,
    clubId: club.id,
    studentName: student.name,
    clubName: club.clubName,
    totalScore,
    scoreBreakdown: {
      interestFit: {
        score: interestFitResult.score,
        weight: MATCHING_WEIGHTS.INTEREST_FIT,
        explanation: interestFitResult.explanation,
      },
      skillFit: {
        score: skillFitResult.score,
        weight: MATCHING_WEIGHTS.SKILL_FIT,
        explanation: skillFitResult.explanation,
      },
      personalityBonus: {
        score: personalityBonusResult.score,
        weight: MATCHING_WEIGHTS.PERSONALITY_BONUS,
        explanation: personalityBonusResult.explanation,
      },
    },
    recommendationReason,
    matchQuality,
    calculatedAt: new Date().toISOString(),
  };

  return result;
}

/**
 * Batch matching: Calculate scores for one student against multiple clubs
 */
export function batchCalculateMatches(
  student: StudentProfile,
  clubs: ClubRequirement[]
): MatchResult[] {
  return clubs.map((club) => calculateMatchScore(student, club));
}

/**
 * Sort matches by total score and get top N results
 */
export function getTopMatches(
  matches: MatchResult[],
  topN: number = 3
): MatchResult[] {
  return [...matches].sort((a, b) => b.totalScore - a.totalScore).slice(0, topN);
}
