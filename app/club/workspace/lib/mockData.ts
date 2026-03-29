export interface Applicant {
  id: string;
  name: string;
  jobRole: string;
  appliedDate: string;
  avatar: string;
  resumeScore: number;
  matchScore: number;
  skills: string[];
  status: "new" | "screening" | "interviewing" | "offered" | "rejected";
  stage: string;
  email: string;
  phone: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  status: "active" | "closed";
  postedDate: string;
  applicantCount: number;
  viewsCount: number;
}

export interface InterviewSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  applicantsCount: number;
  interviewer: string;
  location: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

// Mock Job Postings
export const mockJobPostings: JobPosting[] = [
  {
    id: "job_001",
    title: "内容创作者",
    department: "宣传推广部",
    status: "active",
    postedDate: "2026-03-20",
    applicantCount: 12,
    viewsCount: 285,
  },
  {
    id: "job_002",
    title: "后端工程师",
    department: "技术部",
    status: "active",
    postedDate: "2026-03-15",
    applicantCount: 8,
    viewsCount: 156,
  },
  {
    id: "job_003",
    title: "UI/UX设计师",
    department: "设计部",
    status: "closed",
    postedDate: "2026-02-28",
    applicantCount: 5,
    viewsCount: 89,
  },
  {
    id: "job_004",
    title: "活动协调员",
    department: "运营部",
    status: "active",
    postedDate: "2026-03-22",
    applicantCount: 15,
    viewsCount: 324,
  },
];

// Mock Applicants for Kanban Board
export const mockApplicants: Applicant[] = [
  {
    id: "app_001",
    name: "张三",
    jobRole: "内容创作者",
    appliedDate: "2026-03-27",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    resumeScore: 78,
    matchScore: 82,
    skills: ["视频编辑", "文案撰写", "社媒运营", "创意策划"],
    status: "new",
    stage: "新申请",
    email: "zhangsan@example.com",
    phone: "138-1234-5678",
  },
  {
    id: "app_002",
    name: "李四",
    jobRole: "内容创作者",
    appliedDate: "2026-03-26",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    resumeScore: 85,
    matchScore: 88,
    skills: ["摄影", "视频制作", "后期处理", "创意"],
    status: "new",
    stage: "新申请",
    email: "lisi@example.com",
    phone: "138-9999-8888",
  },
  {
    id: "app_003",
    name: "王五",
    jobRole: "后端工程师",
    appliedDate: "2026-03-25",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    resumeScore: 92,
    matchScore: 91,
    skills: ["Python", "Java", "数据库设计", "API开发"],
    status: "new",
    stage: "新申请",
    email: "wangwu@example.com",
    phone: "138-7777-6666",
  },
  {
    id: "app_004",
    name: "赵六",
    jobRole: "内容创作者",
    appliedDate: "2026-03-24",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    resumeScore: 76,
    matchScore: 79,
    skills: ["文案", "社媒运营", "活动策划"],
    status: "screening",
    stage: "简历筛选中",
    email: "zhaoliu@example.com",
    phone: "138-5555-4444",
  },
  {
    id: "app_005",
    name: "孙七",
    jobRole: "后端工程师",
    appliedDate: "2026-03-23",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    resumeScore: 88,
    matchScore: 85,
    skills: ["Go", "Rust", "微服务", "容器化"],
    status: "screening",
    stage: "简历筛选中",
    email: "sunqi@example.com",
    phone: "138-3333-2222",
  },
  {
    id: "app_006",
    name: "周八",
    jobRole: "UI/UX设计师",
    appliedDate: "2026-03-22",
    avatar:
      "https://images.unsplash.com/photo-1519394537287-41cebad4833d?w=100&h=100&fit=crop",
    resumeScore: 87,
    matchScore: 89,
    skills: ["UI设计", "交互设计", "原型设计", "设计系统"],
    status: "interviewing",
    stage: "面试中",
    email: "zhouba@example.com",
    phone: "138-1111-9999",
  },
  {
    id: "app_007",
    name: "吴九",
    jobRole: "活动协调员",
    appliedDate: "2026-03-21",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    resumeScore: 81,
    matchScore: 84,
    skills: ["活动策划", "团队协调", "时间管理", "沟通能力"],
    status: "interviewing",
    stage: "面试中",
    email: "wujiu@example.com",
    phone: "138-8888-7777",
  },
  {
    id: "app_008",
    name: "郑十",
    jobRole: "内容创作者",
    appliedDate: "2026-03-20",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    resumeScore: 94,
    matchScore: 96,
    skills: ["视频编辑", "动画制作", "效果设计", "创意"],
    status: "offered",
    stage: "已获得offer",
    email: "zhengshi@example.com",
    phone: "138-6666-5555",
  },
  {
    id: "app_009",
    name: "陈十一",
    jobRole: "后端工程师",
    appliedDate: "2026-03-19",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    resumeScore: 72,
    matchScore: 68,
    skills: ["JavaScript", "Node.js", "基础数据库"],
    status: "rejected",
    stage: "已拒绝",
    email: "chenshi@example.com",
    phone: "138-4444-3333",
  },
];

// Mock Interview Slots
export const mockInterviewSlots: InterviewSlot[] = [
  {
    id: "slot_001",
    date: "2026-03-29",
    startTime: "14:00",
    endTime: "16:00",
    applicantsCount: 3,
    interviewer: "Marketing Manager - 张部长",
    location: "三楼会议室",
  },
  {
    id: "slot_002",
    date: "2026-03-29",
    startTime: "16:00",
    endTime: "18:00",
    applicantsCount: 2,
    interviewer: "Tech Lead - 李工程师",
    location: "技术中心大厅",
  },
  {
    id: "slot_003",
    date: "2026-03-30",
    startTime: "10:00",
    endTime: "12:00",
    applicantsCount: 4,
    interviewer: "HR Director - 王主任",
    location: "一楼接待室",
  },
  {
    id: "slot_004",
    date: "2026-03-30",
    startTime: "14:00",
    endTime: "16:30",
    applicantsCount: 2,
    interviewer: "Design Lead - 陈设计师",
    location: "设计工作室",
  },
  {
    id: "slot_005",
    date: "2026-04-01",
    startTime: "09:00",
    endTime: "11:00",
    applicantsCount: 5,
    interviewer: "Operations Manager - 赵经理",
    location: "线上Zoom会议",
  },
];

// Statistics Cards Data
export const mockStatistics: StatCard[] = [
  {
    title: "总浏览次数",
    value: "2,847",
    change: 12.5,
    icon: "eye",
    color: "blue",
  },
  {
    title: "收到简历数",
    value: "123",
    change: 8.2,
    icon: "file-text",
    color: "green",
  },
  {
    title: "面试转化率",
    value: "38.5%",
    change: 3.1,
    icon: "trending-up",
    color: "purple",
  },
];
