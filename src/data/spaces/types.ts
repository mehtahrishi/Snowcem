export interface ColorItem {
  name: string;
  hex: string;
  role?: string; // e.g. "Primary Wall", "Secondary / Trim", "Accent"
}

export interface ColorCombo {
  id: string;
  title: string; // e.g. "Terracotta + Cream + Olive"
  colors: ColorItem[];
  imagePath: string; // e.g. "/spaces/bedroom/7.png"
  description: string;
  moodTag: string;
  bestFor: string;
}

export interface RoomTheme {
  id: string;
  name: string; // e.g. "Modern Minimalist", "Boho", "French", "Italian Style"
  tagline: string;
  description: string;
  combos: ColorCombo[];
}

export interface RoomSpaceData {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  themes: RoomTheme[];
}
