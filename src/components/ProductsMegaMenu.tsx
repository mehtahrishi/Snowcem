"use client";

import React from "react";
import CustomDropdown, { SimpleDropdownItem } from "./CustomDropdown";

interface ProductsMegaMenuProps {
  onClose?: () => void;
}

const PRODUCT_CATEGORIES: SimpleDropdownItem[] = [
  {
    id: "exterior",
    name: "Exterior Emulsion Paints",
    href: "#",
  },
  {
    id: "interior",
    name: "Interior Emulsion Paints",
    href: "#",
  },
  {
    id: "waterproofing",
    name: "Waterproofing Paints",
    href: "#",
  },
  {
    id: "primers",
    name: "Primers & Undercoats",
    href: "#",
  },
  {
    id: "cement",
    name: "Cement Paints",
    href: "#",
  },
  {
    id: "putty",
    name: "Wall Putty & Care",
    href: "#",
  },
  {
    id: "textures",
    name: "Designer Textures",
    href: "#",
  },
];

export default function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  return (
    <CustomDropdown
      items={PRODUCT_CATEGORIES}
      width="w-64"
      onClose={onClose}
    />
  );
}
