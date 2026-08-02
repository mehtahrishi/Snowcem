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
    name: "Colour Catalogue PDF",
    href: "#",
  },
  {
    id: "colour-visualiser",
    name: "Colour Visualiser",
    href: "#",
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
