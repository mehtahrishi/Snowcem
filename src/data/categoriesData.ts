export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  badge?: string;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id: "exterior-emulsion-paints",
    name: "Exterior Emulsion Paints",
    slug: "exterior-emulsion-paints",
    description: "Our range of exterior emulsion paints is developed to ensure strong protection for your exterior walls even under extreme weather conditions, with the freedom to choose from an extensive palette of shades that match your needs. So, you get a superior finish combined with longer durability.",
    badge: "Popular",
  },
  {
    id: "interior-emulsion-paints",
    name: "Interior Emulsion Paints",
    slug: "interior-emulsion-paints",
    description: "Rich matte and sheen interior wall paints offering high stain resistance and smooth elegant walls.",
  },
  {
    id: "waterproofing-paints",
    name: "Waterproofing Paints",
    slug: "waterproofing-paints",
    description: "Advanced elastomeric and liquid waterproofing coatings that safeguard roofs and exterior walls.",
    badge: "Best Seller",
  },
  {
    id: "primers",
    name: "Primers",
    slug: "primers",
    description: "Superior adhesion primers engineered to seal substrate porosity and enhance topcoat durability.",
  },
  {
    id: "cement-paints",
    name: "Cement Paints",
    slug: "cement-paints",
    description: "India's original trusted cement-based paints providing economical, long-lasting exterior protection.",
  },
  {
    id: "putty",
    name: "Putty",
    slug: "putty",
    description: "White cement and acrylic wall putties ensuring a glass-smooth foundation for interior and exterior walls.",
  },
  {
    id: "snowcare-range",
    name: "Snowcare Range",
    slug: "snowcare-range",
    description: "Specialized wall maintenance, cleaning, and surface care products.",
  },
  {
    id: "distemper",
    name: "Distemper",
    slug: "distemper",
    description: "Economical interior wall coatings offering smooth matte finishes and shade brightness.",
  },
  {
    id: "textures",
    name: "Textures",
    slug: "textures",
    description: "Decorative rustic and heritage architectural texture finishes for landmark accent walls.",
  },
];
