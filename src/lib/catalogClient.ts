export interface DbCategory {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  badge: string | null;
  banner: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface DbProduct {
  id: string;
  categoryId: string;
  subcategoryId: string | null;
  categorySlug: string;
  categoryName: string;
  range: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  features: string[] | null;
  highlightImages: string[] | null;
  warranty: string | null;
  image: string | null;
  detailImages: string[] | null;
  bgImage: string | null;
  pdf: string | null;
  faqs: { question: string; answer: string }[] | null;
  isActive: boolean;
}

let categoriesPromise: Promise<DbCategory[]> | null = null;
let productsPromise: Promise<DbProduct[]> | null = null;

export function fetchCategories(): Promise<DbCategory[]> {
  if (!categoriesPromise) {
    categoriesPromise = fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => (Array.isArray(data?.categories) ? data.categories : []))
      .catch(() => []);
  }
  return categoriesPromise;
}

export function fetchProducts(): Promise<DbProduct[]> {
  if (!productsPromise) {
    productsPromise = fetch("/api/products")
      .then((res) => res.json())
      .then((data) => (Array.isArray(data?.products) ? data.products : []))
      .catch(() => []);
  }
  return productsPromise;
}

