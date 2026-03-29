/**
 * Mock Data for Testing and Development
 * Includes sample students, clubs, and historical data
 */

import {
  StudentProfile,
  ClubRequirement,
  FunnelMetrics,
} from "./types";

/**
 * Mock Student Profiles
 */
export const mockStudents: StudentProfile[] = [
  {
    id: "student_001",
    name: "李明",
    email: "liming@university.edu",
    grade: "大二",
    major: "计算机科学与技术",
    interestTags: [
      "摄影",
      "视频编辑",
      "动画",
      "创意设计",
      "社交媒体",
    ],
    skillsProfile: {
      "视频编辑": 85,
      摄影: 78,
      "After Effects": 82,
      Premiere: 80,
      "创意策划": 75,
      沟通: 88,
      "社媒运营": 72,
    },
    mbti: "ENFP",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: "student_002",
    name: "王欣",
    email: "wangxin@university.edu",
    grade: "大一",
    major: "软件工程",
    interestTags: [
      "编程",
      "算法",
      "后端开发",
      "数据库",
      "开源",
    ],
    skillsProfile: {
      Python: 88,
      Java: 85,
      "SQL数据库": 82,
      "API设计": 80,
      "系统设计": 75,
      Git: 85,
      Docker: 72,
    },
    mbti: "ISTJ",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: "student_003",
    name: "张玉",
    email: "zhangyu@university.edu",
    grade: "大三",
    major: "工商管理",
    interestTags: [
      "活动策划",
      "团队协调",
      "市场营销",
      "品牌建设",
      "沟通",
    ],
    skillsProfile: {
      "活动策划": 90,
      "团队管理": 85,
      "市场营销": 78,
      "文案撰写": 82,
      演讲: 88,
      "需求分析": 75,
      "项目管理": 80,
    },
    mbti: "ENFJ",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "student_004",
    name: "赵杰",
    email: "zhaojie@university.edu",
    grade: "大二",
    major: "产品设计",
    interestTags: [
      "UI设计",
      "交互设计",
      "产品思维",
      "用户研究",
      "创意",
    ],
    skillsProfile: {
      "UI设计": 87,
      "交互设计": 84,
      Figma: 85,
      "用户研究": 78,
      "原型设计": 82,
      HTML: 65,
      CSS: 62,
    },
    mbti: "INFP",
    avatar:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=100&h=100&fit=crop",
  },
];

/**
 * Mock Club Requirements
 */
export const mockClubs: ClubRequirement[] = [
  {
    id: "club_001",
    clubName: "摄影协会",
    category: "创意娱乐",
    description: "专业摄影爱好者组织",
    categoryTags: ["摄影", "视觉艺术", "创意", "社交"],
    requiredSkills: {
      摄影: 50,
      "视觉审美": 60,
      沟通: 55,
    },
    preferredMBTI: ["ENFP", "ENFJ", "INFP"],
    activityLevel: "moderate",
    memberCount: 245,
  },
  {
    id: "club_002",
    clubName: "编程爱好者社区",
    category: "技术科学",
    description: "算法竞赛与项目开发",
    categoryTags: ["编程", "算法", "开源", "技术"],
    requiredSkills: {
      Python: 60,
      Java: 50,
      "SQL数据库": 55,
      "系统设计": 60,
    },
    preferredMBTI: ["ISTJ", "INTJ", "ISTP"],
    activityLevel: "intensive",
    memberCount: 198,
  },
  {
    id: "club_003",
    clubName: "学生活动委员会",
    category: "学生组织",
    description: "校园活动策划与执行",
    categoryTags: ["活动策划", "团队合作", "领导力", "沟通"],
    requiredSkills: {
      "活动策划": 50,
      "团队管理": 60,
      "文案撰写": 55,
      演讲: 60,
    },
    preferredMBTI: ["ENFJ", "ESFJ", "ENTP"],
    activityLevel: "intensive",
    memberCount: 45,
  },
  {
    id: "club_004",
    clubName: "UI/UX设计工坊",
    category: "设计艺术",
    description: "用户界面与体验设计",
    categoryTags: ["UI设计", "用户体验", "创意", "产品"],
    requiredSkills: {
      "UI设计": 55,
      "交互设计": 50,
      Figma: 60,
      "用户研究": 45,
    },
    preferredMBTI: ["INFP", "INFJ", "ENFP"],
    activityLevel: "moderate",
    memberCount: 87,
  },
  {
    id: "club_005",
    clubName: "视频创意工作室",
    category: "创意娱乐",
    description: "视频内容制作与分享",
    categoryTags: ["视频制作", "编辑", "创意", "社交媒体"],
    requiredSkills: {
      "视频编辑": 60,
      摄影: 50,
      "After Effects": 55,
      "创意策划": 65,
    },
    preferredMBTI: ["ENFP", "ESFP", "INFP"],
    activityLevel: "moderate",
    memberCount: 156,
  },
];

/**
 * Funnel Metrics Calculation
 * Simulates realistic B2B recruitment funnel data
 *
 * Typical conversion rates:
 * - Impression to Application: 3-5%
 * - Application to Interview: 10-20%
 * - Interview to Offer: 30-50%
 */
export function getFunnelMetrics(): FunnelMetrics {
  // Base numbers
  const impressions = 2847;
  const applications = Math.round(impressions * 0.042); // 4.2% conversion
  const interviews = Math.round(applications * 0.185); // 18.5% conversion
  const offers = Math.round(interviews * 0.38); // 38% conversion

  // Calculate conversion rates
  const appConversion = parseFloat(
    ((applications / impressions) * 100).toFixed(2)
  );
  const interviewConversion = parseFloat(
    ((interviews / applications) * 100).toFixed(2)
  );
  const offerConversion = parseFloat(
    ((offers / interviews) * 100).toFixed(2)
  );

  // Calculate total dropoff (opposite of final conversion)
  const totalConversion = (offers / impressions) * 100;
  const totalDropoff = 100 - totalConversion;

  // Average time to hire (in days)
  // Typical: 2 weeks for application, 1 week for interview, 3 days for decision
  const avgTimeToHire = 21;

  return {
    period: "2026年3月",
    stage1_impressions: {
      count: impressions,
      description: "社团页面总浏览次数",
    },
    stage2_applications: {
      count: applications,
      conversionRate: appConversion,
      description: "提交申请的学生数",
    },
    stage3_interviews: {
      count: interviews,
      conversionRate: interviewConversion,
      description: "进入面试环节的申请数",
    },
    stage4_offers: {
      count: offers,
      conversionRate: offerConversion,
      description: "最终获得offer的学生数",
    },
    totalDropoff,
    avgTimeToHire,
  };
}

/**
 * Advanced Funnel Analysis
 * Provides detailed insights by club category
 */
export interface DetailedFunnelMetrics extends FunnelMetrics {
  clubCategory: string;
  targetDemographic: string;
  conversionTrend: "improving" | "stable" | "declining";
}

export function getDetailedFunnelMetrics(
  clubCategory: string
): DetailedFunnelMetrics {
  const baseFunnel = getFunnelMetrics();

  // Category-specific adjustments
  const categoryMultipliers: Record<string, number> = {
    "创意娱乐": 1.1, // 10% higher conversion
    "技术科学": 0.9, // 10% lower (more selective)
    设计艺术: 1.15, // 15% higher
    学生组织: 1.05, // 5% higher
  };

  const multiplier = categoryMultipliers[clubCategory] || 1.0;

  return {
    ...baseFunnel,
    clubCategory,
    targetDemographic: `${clubCategory}相关专业学生`,
    conversionTrend: multiplier > 1.0 ? "improving" : "declining",
  };
}
