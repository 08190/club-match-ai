export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  major: string;
  avatar: string;
  interests: string[];
  skills: SkillRadarData[];
}

export interface SkillRadarData {
  name: string;
  value: number;
}

export interface ClubCard {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tags: string[];
  rating: number;
  memberCount: number;
  category: string;
}

// Mock student profile data
export const mockStudentProfile: StudentProfile = {
  id: "student_001",
  name: "李明",
  grade: "大二",
  major: "计算机科学与技术",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  interests: [
    "摄影",
    "电竞",
    "辩论",
    "编程",
    "产品设计",
    "创业",
    "社交",
    "旅游",
  ],
  skills: [
    { name: "技术", value: 85 },
    { name: "创意", value: 72 },
    { name: "领导力", value: 68 },
    { name: "沟通", value: 78 },
    { name: "学习力", value: 88 },
    { name: "执行力", value: 75 },
  ],
};

// Mock club discovery feed
export const mockClubs: ClubCard[] = [
  {
    id: "club_001",
    name: "摄影协会",
    description: "专业摄影爱好者组织",
    coverImage:
      "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400&h=300&fit=crop",
    tags: ["高频活动", "硬核输出"],
    rating: 4.8,
    memberCount: 245,
    category: "创意娱乐",
  },
  {
    id: "club_002",
    name: "电竞联盟",
    description: "校园电竞赛事组织中心",
    coverImage:
      "https://images.unsplash.com/photo-1538481143235-b6c1499bad46?w=400&h=300&fit=crop",
    tags: ["竞争性", "高频活动"],
    rating: 4.6,
    memberCount: 342,
    category: "竞技体育",
  },
  {
    id: "club_003",
    name: "辩论队",
    description: "校园辩论赛冠军队伍",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    tags: ["精英选拔", "高输出"],
    rating: 4.9,
    memberCount: 58,
    category: "学术竞技",
  },
  {
    id: "club_004",
    name: "编程爱好者社区",
    description: "算法竞赛与项目开发",
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    tags: ["技术输出", "高学习"],
    rating: 4.7,
    memberCount: 198,
    category: "技术科学",
  },
  {
    id: "club_005",
    name: "创意工坊",
    description: "产品设计与创新创业孵化",
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    tags: ["创业导向", "实践机会"],
    rating: 4.5,
    memberCount: 127,
    category: "创业创新",
  },
  {
    id: "club_006",
    name: "旅游兴趣小组",
    description: "探索校园与城市的冒险者们",
    coverImage:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    tags: ["社交属性", "定期活动"],
    rating: 4.4,
    memberCount: 89,
    category: "生活娱乐",
  },
];
