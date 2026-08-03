export interface ValuePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  gradient: string;
}

export interface EmployeeVoice {
  id: string;
  name: string;
  role: string;
  experience: string;
  quote: string;
  location: string;
}

export interface CultureMoment {
  id: string;
  title: string;
  category: "Learning" | "Celebrations" | "Teamwork" | "Recognition";
  description: string;
  imageAlt: string;
  imageUrl: string;
}

export const SNOWCEM_VALUES: ValuePillar[] = [
  {
    id: "val-1",
    title: "Transparent Ecosystem",
    subtitle: "Openness & Trust",
    description: "Clear communication, open doors, and shared goals across every level of our organization.",
    iconName: "Eye",
    gradient: "from-blue-500/10 to-indigo-500/10 text-indigo-700 border-indigo-200",
  },
  {
    id: "val-2",
    title: "Integrity Above All",
    subtitle: "Ethical Standards",
    description: "Uncompromised moral principles in every decision, product formulation, and customer interaction.",
    iconName: "ShieldCheck",
    gradient: "from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-200",
  },
  {
    id: "val-3",
    title: "Flawless Service",
    subtitle: "Excellence Driven",
    description: "Delivering perfection in technical support, order fulfillment, and paint performance.",
    iconName: "Award",
    gradient: "from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-200",
  },
  {
    id: "val-4",
    title: "Speed - Always a Step Ahead",
    subtitle: "Agile Innovation",
    description: "Fast decision-making, rapid market response, and continuous innovation in eco-friendly paints.",
    iconName: "Zap",
    gradient: "from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-200",
  },
  {
    id: "val-5",
    title: "Commitment - Deliver on Promise",
    subtitle: "Reliable Accountability",
    description: "Honoring our word to employees, stockists, painters, and homeowners across India.",
    iconName: "CheckCircle2",
    gradient: "from-red-500/10 to-orange-500/10 text-snowcem-orange border-orange-200",
  },
];

export const EMPLOYEE_VOICES: EmployeeVoice[] = [
  {
    id: "voice-1",
    name: "Rajesh Sharma",
    role: "Senior Regional Sales Manager",
    experience: "7+ Years at Snowcem",
    location: "Mumbai",
    quote: "Snowcem's focus on continuous learning and frontline empowerment helped me transition from a territory officer to leading multi-state operations. The leadership truly listens and invests in our growth.",
  },
  {
    id: "voice-2",
    name: "Priya Venkatesh",
    role: "Lead Color & R&D Specialist",
    experience: "4 Years at Snowcem",
    location: "Pune Tech Center",
    quote: "Working on eco-friendly, zero-VOC exterior paints gives my daily work true purpose. The culture here values fresh ideas and encourages us to experiment without fear of failure.",
  },
  {
    id: "voice-3",
    name: "Amitabh Sen",
    role: "Territory Business Officer",
    experience: "5 Years at Snowcem",
    location: "Kolkata",
    quote: "What stands out at Snowcem is the transparent culture and genuine work-life balance. We celebrate every milestone as a family, and high performance is recognized immediately.",
  },
];

export const CULTURE_MOMENTS: CultureMoment[] = [
  {
    id: "moment-1",
    title: "Continuous Training & Skill Empowerment",
    category: "Learning",
    description: "Empowering our frontline sales officers and technical teams with regular skill development workshops.",
    imageAlt: "Snowcem Team Training Session",
    imageUrl: "/life-culture/training.png",
  },
  {
    id: "moment-2",
    title: "Strong Core Team & Collaborative Culture",
    category: "Teamwork",
    description: "Fostering unity, mutual respect, and cross-functional team collaboration across regional hubs.",
    imageAlt: "Snowcem Team Collaboration",
    imageUrl: "/life-culture/team.png",
  },
  {
    id: "moment-3",
    title: "Celebrations & Work-Life Balance",
    category: "Celebrations",
    description: "Celebrating shared wins, cultural festivals, and building a community where work is joyful.",
    imageAlt: "Snowcem Fun & Cultural Celebrations",
    imageUrl: "/life-culture/fun.png",
  },
];
