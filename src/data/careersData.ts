export interface JobOpening {
  id: string;
  title: string;
  location: string;
  experience: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface CulturePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const CULTURE_PILLARS: CulturePillar[] = [
  {
    id: "culture-1",
    title: "Learning & Growth",
    subtitle: "at Every Step",
    description: "Empowering our people with continuous skill development, leadership mentorship, and career acceleration pathways across India.",
    iconName: "TrendingUp",
  },
  {
    id: "culture-2",
    title: "Truly Inclusive",
    subtitle: "Workplace",
    description: "Fostering an open, equitable culture where diverse perspectives drive breakthrough innovations in eco-friendly paint tech.",
    iconName: "Users",
  },
  {
    id: "culture-3",
    title: "Recognition &",
    subtitle: "Appreciation",
    description: "Celebrating every milestone with transparent meritocracy, performance incentives, and employee wellness initiatives.",
    iconName: "Award",
  },
];

export const JOB_OPENINGS: JobOpening[] = [];
