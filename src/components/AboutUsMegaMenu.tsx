"use client";

import React from "react";
import CustomDropdown, { SimpleDropdownItem } from "./CustomDropdown";

interface AboutUsMegaMenuProps {
  onClose: () => void;
}

const ABOUT_ITEMS: SimpleDropdownItem[] = [
  {
    id: "snowcem-story",
    name: "The Snowcem Story",
    href: "#",
  },
  {
    id: "true-colors",
    name: "True Colours of Life",
    href: "#",
  },
  {
    id: "mehta-group",
    name: "About Mehta Group",
    href: "#",
  },
];

export default function AboutUsMegaMenu({ onClose }: AboutUsMegaMenuProps) {
  return (
    <CustomDropdown
      items={ABOUT_ITEMS}
      width="w-56"
      onClose={onClose}
    />
  );
}
