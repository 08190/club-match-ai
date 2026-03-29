/**
 * Mock Interview Data and Question Sets
 * Pre-configured questions for different club roles
 */

export interface InterviewQuestion {
  id: string;
  question: string;
  roleSpecific: boolean;
}

export interface RoleInterviewSet {
  roleName: string;
  clubName: string;
  openingMessage: string;
  questions: InterviewQuestion[];
  closingMessage: string;
  estimatedDuration: number; // in minutes
}

/**
 * Interview sets for different club roles
 * Each set includes 3 questions + opening/closing messages
 */
export const interviewSetsByRole: Record<string, RoleInterviewSet> = {
  media_officer: {
    roleName: "Media Department Officer",
    clubName: "摄影协会",
    openingMessage:
      "Hi there! 👋 I'm your interviewer for the 摄影协会 Media Department Officer position. Ready to start? We'll have a quick 3-question session to get to know your passion for visual storytelling. Let's begin!",
    questions: [
      {
        id: "q1",
        question:
          "Tell us about your most recent photography or video project. What was the theme, and what made it meaningful to you?",
        roleSpecific: true,
      },
      {
        id: "q2",
        question:
          "How would you stay updated with the latest trends in photography and social media content creation? Can you give us an example?",
        roleSpecific: true,
      },
      {
        id: "q3",
        question:
          "Imagine you need to promote an upcoming club event through visual content. How would you approach this, and what platforms would you prioritize?",
        roleSpecific: true,
      },
    ],
    closingMessage:
      "🎉 Excellent session! Based on your responses, we see strong potential in your creative vision and technical skills. We're impressed by your understanding of visual storytelling. You'll hear from us within 3 days. Thanks for your time!",
    estimatedDuration: 10,
  },

  backend_developer: {
    roleName: "Backend Developer",
    clubName: "编程爱好者社区",
    openingMessage:
      "Hey! 👋 I'm your interviewer for the 编程爱好者社区 Backend Developer role. Ready to dive into some technical questions? We've got 3 questions lined up. Let's see what you can do!",
    questions: [
      {
        id: "q1",
        question:
          "Describe a backend system you've built or contributed to. What programming language did you use, and what challenges did you face?",
        roleSpecific: true,
      },
      {
        id: "q2",
        question:
          "How do you approach designing a database schema for a new application? Walk us through your thought process.",
        roleSpecific: true,
      },
      {
        id: "q3",
        question:
          "Tell us about your experience with APIs. Have you designed or consumed APIs? What did you learn from that experience?",
        roleSpecific: true,
      },
    ],
    closingMessage:
      "⚡ Great technical discussion! Your problem-solving approach and depth of knowledge in backend systems impressed us. We can see you're a solid fit for our community. We'll review and get back to you soon!",
    estimatedDuration: 12,
  },

  event_coordinator: {
    roleName: "Event Coordinator",
    clubName: "学生活动委员会",
    openingMessage:
      "Welcome! 🎉 I'm your interviewer for the 学生活动委员会 Event Coordinator position. This role is all about making magic happen. We have 3 questions to learn more about your organizational and creative skills!",
    questions: [
      {
        id: "q1",
        question:
          "Share your experience organizing or coordinating an event. What was the scale, and what made it successful?",
        roleSpecific: true,
      },
      {
        id: "q2",
        question:
          "How do you handle unexpected issues during an event? Give us a specific example if you have one.",
        roleSpecific: true,
      },
      {
        id: "q3",
        question:
          "What's your approach to promoting an event and engaging participants? How do you measure success?",
        roleSpecific: true,
      },
    ],
    closingMessage:
      "🌟 Fantastic insights! Your proactive approach to problem-solving and passion for creating memorable experiences shine through. We think you'd be a wonderful addition to our team. Stay tuned!",
    estimatedDuration: 11,
  },

  ux_designer: {
    roleName: "UX/UI Designer",
    clubName: "UI/UX设计工坊",
    openingMessage:
      "Hey there! 🎨 I'm your interviewer for the UI/UX设计工坊 Designer position. We love creative minds here. Let's explore your design thinking through 3 interesting questions!",
    questions: [
      {
        id: "q1",
        question:
          "Walk us through one of your design projects. What problem were you solving, and how did you approach the design process?",
        roleSpecific: true,
      },
      {
        id: "q2",
        question:
          "How do you gather user feedback and incorporate it into your designs? Describe your process.",
        roleSpecific: true,
      },
      {
        id: "q3",
        question:
          "Tell us about a design tool or method you've mastered and why you love using it.",
        roleSpecific: true,
      },
    ],
    closingMessage:
      "💫 Wonderful conversation! Your design philosophy and user-centric approach are exactly what we're looking for. We're excited about the possibility of collaborating with you. More details coming soon!",
    estimatedDuration: 10,
  },
};

/**
 * Default interview set (if no specific role is provided)
 */
export const defaultInterviewSet: RoleInterviewSet =
  interviewSetsByRole.media_officer;

/**
 * Get interview set by role ID
 */
export function getInterviewSetByRole(roleId: string): RoleInterviewSet {
  return (
    interviewSetsByRole[roleId] ||
    interviewSetsByRole.media_officer ||
    defaultInterviewSet
  );
}

/**
 * Generate a random positive feedback message
 */
export function generateAIFeedback(): string {
  const feedbacks = [
    "Your communication was clear and thoughtful.",
    "We appreciated your authentic and detailed responses.",
    "Your passion for this field really came through.",
    "Excellent articulation of your experience.",
    "We were impressed by your problem-solving mindset.",
  ];

  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
}
