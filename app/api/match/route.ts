/**
 * API Route: POST /api/match
 * 
 * Two-Way Matching Engine Endpoint
 * 
 * Handles:
 * 1. Student-to-Club matching with weighted scoring
 * 2. Batch matching calculations
 * 3. Funnel metrics retrieval
 * 4. Recommendation generation with collaborative filtering insights
 */

import { NextRequest, NextResponse } from "next/server";
import {
  calculateMatchScore,
  batchCalculateMatches,
  getTopMatches,
} from "@/lib/matching/engine";
import {
  mockStudents,
  mockClubs,
  getFunnelMetrics,
  getDetailedFunnelMetrics,
} from "@/lib/matching/mockData";
import {
  StudentProfile,
  ClubRequirement,
  BatchMatchResponse,
  MatchResult,
} from "@/lib/matching/types";

/**
 * Request body interface for POST /api/match
 */
interface MatchRequest {
  action: "calculate" | "batch" | "metrics" | "status";
  studentId?: string;
  clubId?: string;
  useDefaults?: boolean; // Use mock data if true
}

/**
 * Health check endpoint for matching engine
 */
function getEngineStatus() {
  return {
    status: "operational",
    version: "1.0.0",
    algorithm: {
      name: "Bilateral Matching Engine",
      weights: {
        interestFit: "30%",
        skillFit: "50%",
        personalityBonus: "20%",
      },
      components: ["Jaccard Similarity", "Skills Coverage", "MBTI Alignment"],
    },
    mockDataAvailable: {
      students: mockStudents.length,
      clubs: mockClubs.length,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Calculate match score between a specific student and club
 */
async function calculateSingleMatch(
  studentId: string,
  clubId: string
): Promise<MatchResult | { error: string }> {
  try {
    const student = mockStudents.find((s) => s.id === studentId);
    const club = mockClubs.find((c) => c.id === clubId);

    if (!student) {
      return { error: `Student with ID ${studentId} not found` };
    }
    if (!club) {
      return { error: `Club with ID ${clubId} not found` };
    }

    const result = calculateMatchScore(student, club);
    return result;
  } catch (error) {
    return {
      error: `Failed to calculate match: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Calculate matches for a student against all clubs
 */
async function calculateBatchMatches(
  studentId: string
): Promise<BatchMatchResponse | { error: string }> {
  try {
    const startTime = Date.now();
    const student = mockStudents.find((s) => s.id === studentId);

    if (!student) {
      return { error: `Student with ID ${studentId} not found` };
    }

    // Calculate match scores for all clubs
    const allMatches = batchCalculateMatches(student, mockClubs);

    // Get top 3 matches
    const topMatches = getTopMatches(allMatches, 3);

    // Get funnel metrics
    const funnelMetrics = getFunnelMetrics();

    const processingTimeMs = Date.now() - startTime;

    const response: BatchMatchResponse = {
      studentProfile: student,
      matches: allMatches.sort((a, b) => b.totalScore - a.totalScore),
      topMatches,
      funnelMetrics,
      processingTimeMs,
    };

    return response;
  } catch (error) {
    return {
      error: `Failed to calculate batch matches: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Generate detailed analytics and funnel metrics
 */
async function getMetrics(categoryFilter?: string) {
  try {
    const baseFunnel = getFunnelMetrics();

    // If category filter provided, get detailed metrics
    if (categoryFilter) {
      const detailedMetrics = getDetailedFunnelMetrics(categoryFilter);
      return {
        baseFunnel,
        detailedMetrics,
        allClubCategories: [...new Set(mockClubs.map((c) => c.category))],
        timestamp: new Date().toISOString(),
      };
    }

    return {
      baseFunnel,
      allClubCategories: [...new Set(mockClubs.map((c) => c.category))],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      error: `Failed to retrieve metrics: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * POST Handler
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = (await request.json()) as MatchRequest;
    const { action, studentId, clubId, useDefaults } = body;

    // Validate action
    if (!action) {
      return NextResponse.json(
        {
          error: "Missing required field: action",
          validActions: ["calculate", "batch", "metrics", "status"],
        },
        { status: 400 }
      );
    }

    let result: unknown;

    switch (action) {
      case "calculate": {
        // Calculate match between specific student and club
        if (!studentId || !clubId) {
          return NextResponse.json(
            {
              error: "calculateMatching requires studentId and clubId",
              example: {
                action: "calculate",
                studentId: "student_001",
                clubId: "club_001",
              },
            },
            { status: 400 }
          );
        }
        result = await calculateSingleMatch(studentId, clubId);
        break;
      }

      case "batch": {
        // Calculate matches for a student against all clubs
        if (!studentId) {
          return NextResponse.json(
            {
              error: "batch action requires studentId",
              availableStudents: mockStudents.map((s) => ({
                id: s.id,
                name: s.name,
                major: s.major,
              })),
              example: {
                action: "batch",
                studentId: "student_001",
              },
            },
            { status: 400 }
          );
        }
        result = await calculateBatchMatches(studentId);
        break;
      }

      case "metrics": {
        // Get funnel metrics
        result = await getMetrics();
        break;
      }

      case "status": {
        // Get engine status and health info
        result = getEngineStatus();
        break;
      }

      default:
        return NextResponse.json(
          {
            error: `Unknown action: ${action}`,
            validActions: ["calculate", "batch", "metrics", "status"],
          },
          { status: 400 }
        );
    }

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        action,
        data: result,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
          message: error.message,
        },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * GET Handler - Informational endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const studentId = request.nextUrl.searchParams.get("studentId");
    const clubId = request.nextUrl.searchParams.get("clubId");
    const category = request.nextUrl.searchParams.get("category");

    // Default to status if no parameters
    if (!studentId && !clubId && !category) {
      return NextResponse.json(
        {
          message:
            "Matching Engine API - Use POST with action parameter",
          availableActions: {
            calculate:
              "Match a specific student with a specific club",
            batch: "Match a student with all clubs",
            metrics: "Get recruitment funnel analytics",
            status: "Get engine health and configuration",
          },
          examples: {
            calculate: {
              method: "POST",
              body: {
                action: "calculate",
                studentId: "student_001",
                clubId: "club_001",
              },
            },
            batch: {
              method: "POST",
              body: {
                action: "batch",
                studentId: "student_001",
              },
            },
            metrics: {
              method: "POST",
              body: {
                action: "metrics",
              },
            },
            status: {
              method: "POST",
              body: {
                action: "status",
              },
            },
          },
          availableData: {
            students: mockStudents.map((s) => ({
              id: s.id,
              name: s.name,
              major: s.major,
            })),
            clubs: mockClubs.map((c) => ({
              id: c.id,
              clubName: c.clubName,
              category: c.category,
            })),
          },
        },
        { status: 200 }
      );
    }

    // Handle query-based lookups (for convenience)
    if (studentId && clubId) {
      const result = await calculateSingleMatch(studentId, clubId);
      return NextResponse.json(
        { success: true, data: result, timestamp: new Date().toISOString() },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        error:
          "For lookups, use both studentId and clubId query parameters",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to process GET request",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
