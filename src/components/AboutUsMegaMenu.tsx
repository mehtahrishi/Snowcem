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
    href: "/about-us/the-snowcem-story",
  },
  {
    id: "true-colors",
    name: "True Colours of Life",
    href: "/about-us/true-colours-of-life",
  },
  {
    id: "mehta-group",
    name: "About Mehta Group",
    href: "/about-us/about-mehta-group",
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
