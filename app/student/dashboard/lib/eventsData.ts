// Mock events data for landing page and events section
export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  hostingClub: string;
  clubId: string;
  attendees: number;
  category: string;
}

export const mockCampusEvents: CampusEvent[] = [
  {
    id: "event_001",
    title: "年度摄影展览",
    description: "展示校园内最佳摄影作品的一年一度的展览",
    image:
      "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?auto=format&fit=crop&w=800&q=80",
    date: "2026-04-15",
    time: "14:00-18:00",
    location: "文化中心一楼",
    hostingClub: "摄影协会",
    clubId: "club_001",
    attendees: 156,
    category: "创意娱乐",
  },
  {
    id: "event_002",
    title: "校园电竞大赛总决赛",
    description: "参加校园最大的电竞赛事，赢取奖金和荣誉",
    image:
      "https://images.unsplash.com/photo-1538481143235-b6c1499bad46?auto=format&fit=crop&w=800&q=80",
    date: "2026-04-20",
    time: "18:00-22:00",
    location: "学生活动中心",
    hostingClub: "电竞联盟",
    clubId: "club_002",
    attendees: 342,
    category: "竞技体育",
  },
  {
    id: "event_003",
    title: "编程马拉松 2026",
    description: "24小时编程竞赛，展示你的编码技能",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-10",
    time: "09:00 (24小时)",
    location: "技术中心",
    hostingClub: "编程爱好者社区",
    clubId: "club_004",
    attendees: 89,
    category: "技术科学",
  },
  {
    id: "event_004",
    title: "创意工坊创业路演",
    description: "新一代企业家展示他们的创业想法和项目",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    date: "2026-04-25",
    time: "16:00-19:00",
    location: "创新中心",
    hostingClub: "创意工坊",
    clubId: "club_005",
    attendees: 203,
    category: "创业创新",
  },
];
