export interface ValuePillar {
  id: string;
  title: string;
  image: string;
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
    image: "/life-culture/transparent-ecosystem-white.png",
  },
  {
    id: "val-2",
    title: "Integrity above all",
    image: "/life-culture/integrity-white.png",
  },
  {
    id: "val-3",
    title: "Flawless service",
    image: "/life-culture/flawless-service-white.png",
  },
  {
    id: "val-4",
    title: "Speed - Always a step ahead",
    image: "/life-culture/speed-white.png",
  },
  {
    id: "val-5",
    title: "Commitment - Deliver on promise",
    image: "/life-culture/commitment-white.png",
  },
];

export const CULTURE_MOMENTS: CultureMoment[] = [
  {
    id: "moment-2",
    title: "Team Celebrations",
    category: "Celebrations",
    description: "Moments of joy that bring us closer",
    imageAlt: "Snowcem team celebrating together at the office",
    imageUrl: "/life-culture/team.png",
  },
  {
    id: "moment-1",
    title: "Training Excellence",
    category: "Learning",
    description: "Interactive programs that build skills and confidence",
    imageAlt: "Snowcem team taking part in a training session",
    imageUrl: "/life-culture/training.png",
  },
  {
    id: "moment-3",
    title: "Fun @ Snowcem",
    category: "Teamwork",
    description: "Spontaneous moments of connection and joy",
    imageAlt: "Snowcem colleagues enjoying outdoor team games",
    imageUrl: "/life-culture/fun.png",
  },
];
