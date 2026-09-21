import { RoomSpaceData } from "./types";
import { LIVING_ROOM_THEMES_DATA } from "./livingRoom";
import { BEDROOM_THEMES_DATA } from "./bedroom";
import { KITCHEN_THEMES_DATA } from "./kitchen";
import { DINING_ROOM_THEMES_DATA } from "./diningRoom";
import { STUDY_ROOM_THEMES_DATA } from "./studyRoom";
import { WASHROOM_THEMES_DATA } from "./washroom";
import { POOJA_ROOM_THEMES_DATA } from "./poojaRoom";

export * from "./types";
export * from "./livingRoom";
export * from "./bedroom";
export * from "./kitchen";
export * from "./diningRoom";
export * from "./studyRoom";
export * from "./washroom";
export * from "./poojaRoom";

export const ALL_ROOM_THEMES_DATA: Record<string, RoomSpaceData> = {
  // Living Room
  "living-room": LIVING_ROOM_THEMES_DATA,
  living: LIVING_ROOM_THEMES_DATA,

  // Bedroom
  bedroom: BEDROOM_THEMES_DATA,
  "bed-room": BEDROOM_THEMES_DATA,

  // Kitchen
  kitchen: KITCHEN_THEMES_DATA,

  // Dining Room
  "dining-room": DINING_ROOM_THEMES_DATA,
  "dinning-room": DINING_ROOM_THEMES_DATA,
  dining: DINING_ROOM_THEMES_DATA,
  dinning: DINING_ROOM_THEMES_DATA,

  // Study Room
  "study-room": STUDY_ROOM_THEMES_DATA,
  study: STUDY_ROOM_THEMES_DATA,
  "home-office": STUDY_ROOM_THEMES_DATA,

  // Washroom
  washroom: WASHROOM_THEMES_DATA,
  "wash-room": WASHROOM_THEMES_DATA,
  bathroom: WASHROOM_THEMES_DATA,
  "bath-room": WASHROOM_THEMES_DATA,

  // Pooja Room
  "pooja-room": POOJA_ROOM_THEMES_DATA,
  "puja-room": POOJA_ROOM_THEMES_DATA,
  pooja: POOJA_ROOM_THEMES_DATA,
  puja: POOJA_ROOM_THEMES_DATA,
  mandir: POOJA_ROOM_THEMES_DATA,
};

export function getRoomThemesData(slug?: string): RoomSpaceData {
  if (!slug) return LIVING_ROOM_THEMES_DATA;
  const normalized = slug.toLowerCase().trim();
  return ALL_ROOM_THEMES_DATA[normalized] || LIVING_ROOM_THEMES_DATA;
}
