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

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-1",
    title: "State Head",
    location: "Tamil Nadu / Pune / Mumbai & Maharashtra",
    experience: "12 to 15 years in Sales",
    department: "Decorative Paint Sales & Regional Operations",
    description: "Lead regional sales strategy, dealer network expansion, revenue targets, and multi-state team leadership for Snowcem Paints.",
    responsibilities: [
      "Define state-level sales strategies and distribution growth targets.",
      "Expand authorized dealer networks across key urban and semi-urban markets.",
      "Lead and mentor regional Area Sales Managers and Territory Leads.",
      "Analyze market trends, competitor pricing, and demand forecasting.",
    ],
    requirements: [
      "12-15 years of proven sales leadership in Paints, FMCG, or Building Materials.",
      "Strong relationship network with paint stockists and distributors.",
      "Exceptional team management and P&L accountability skills.",
    ],
  },
  {
    id: "job-2",
    title: "Area Sales Manager",
    location: "Mumbai",
    experience: "8-10 Years",
    department: "Retail & Dealer Network",
    description: "Drive commercial growth, retail secondary sales, contractor programs, and stockist relationships in Mumbai metro territory.",
    responsibilities: [
      "Manage and scale dealer accounts across assigned Mumbai sub-territories.",
      "Implement painter & contractor loyalty initiatives to boost secondary sales.",
      "Achieve monthly and quarterly sales revenue and collection targets.",
      "Conduct dealer training sessions on new Snowcem interior & exterior product lines.",
    ],
    requirements: [
      "8-10 years experience in decorative paint sales or building products.",
      "In-depth knowledge of Mumbai paint trade channels and contractor networks.",
      "Strong communication, negotiation, and field sales execution skills.",
    ],
  },
  {
    id: "job-3",
    title: "Territory Sales Manager",
    location: "Gulbarga / Salem / Chennai / Bengaluru / Kochi",
    experience: "Minimum 5 years in sales with at least 2 years in Decorative Paint",
    department: "Field Sales & Channel Development",
    description: "Execute ground sales initiatives, visit dealer counters, drive product placement, and expand brand presence in key Southern centers.",
    responsibilities: [
      "Regular counter visits to authorized dealers for order generation and stock health.",
      "Identify new potential paint stockist locations and onboard new retail partners.",
      "Coordinate with technical applicators for project sales and site demonstrations.",
      "Monitor stock movement and maintain credit control discipline.",
    ],
    requirements: [
      "Minimum 5 years overall sales experience with 2+ years specifically in Decorative Paint.",
      "Strong local language proficiency and geographic familiarity.",
      "Self-driven mindset with willingness for regular field travel.",
    ],
  },
];
