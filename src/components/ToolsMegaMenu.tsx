"use client";

import React from "react";
import CustomDropdown, { SimpleDropdownItem } from "./CustomDropdown";

interface ToolsMegaMenuProps {
  onClose: () => void;
}

const TOOLS_ITEMS: SimpleDropdownItem[] = [
  {
    id: "budget-calculator",
    name: "Paint Budget Calculator",
    href: "#",
  },
  {
    id: "colour-catalogue",
    name: "Colour Catalogue & Shade Card",
    href: "/color-catalogue",
  },
  {
    id: "colour-visualiser",
    name: "Colour Visualiser",
    href: "#",
  },
  {
    id: "ganpati-canvas",
    name: "Ganpati Canvas",
    href: "/ganpati-canvas",
  },
];

export default function ToolsMegaMenu({ onClose }: ToolsMegaMenuProps) {
  return (
    <CustomDropdown
      items={TOOLS_ITEMS}
      width="w-60"
      onClose={onClose}
    />
  );
}
