"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export default function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <img
        src="/image.png"
        alt="Snowcem Paints Logo"
        className={`w-auto object-contain ${
          compact ? "h-8" : "h-11"
        }`}
      />
    </Link>
  );
}

