"use client";

import React from "react";
import CustomDropdown, { SimpleDropdownItem } from "./CustomDropdown";
import { CATEGORIES_DATA } from "@/data/categoriesData";
import { PRODUCTS_DATA } from "@/data/productsData";

interface ProductsMegaMenuProps {
  onClose?: () => void;
}

const PRODUCT_CATEGORIES: SimpleDropdownItem[] = CATEGORIES_DATA.map((cat) => {
  const categoryProducts = PRODUCTS_DATA.filter(
    (prod) => prod.categorySlug === cat.slug
  );

  return {
    id: cat.id,
    name: cat.name,
    href: `/products/${cat.slug}`,
    badge: cat.badge,
    subItems: categoryProducts.map((prod) => ({
      id: prod.id,
      name: prod.name,
      href: `/products/${cat.slug}/${prod.slug}`,
    })),
  };
});

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  return (
    <CustomDropdown
      items={PRODUCT_CATEGORIES}
      width="w-64"
      onClose={onClose}
    />
  );
}
