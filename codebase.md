# CODEBASE.MD — Project Architecture & File Inventory

## Core Components
- `src/components/HomeToolsSection.tsx`: Mobile-First Interactive Tabbed Suite featuring Smart Painting Tools:
  - **Centered Inline-Flex Tab Bar**: Centered `inline-flex` pill tab container eliminating trailing extra space after the last tab pill.
  - **Public Image Showcases**:
    - Colour Visualiser Tab: `/visual.png`
    - Paint Budget Calculator Tab: `/calculator.png`
    - Colour Catalogue Tab: `/color-shades.png`
    - Festive Digital Art Studio Tab: `/festive.png`
  - **Left Side Information & CTAs**: Title, description, key benefits checklist, and unified brand gradient button (`from-[#2a1b92] via-[#5c249c] to-[#e91e63]`).
  - **Touch-Scrollable Tab Navigation**: Horizontal touch scrollable pill tab bar for mobile devices (`Visualiser`, `Calculator`, `Catalogue`, `Festive Studio`).
- `src/app/ganpati-canvas/page.tsx`: Seasonal Festive Digital Art Studio page with flood fill, brush, eraser, multi-festival outline selector, and high-res PNG download with watermark.
- `src/app/color-catalogue/page.tsx`: Full interior and exterior shade decks with filter and search.
- `src/app/color-visualizer/page.tsx`: Interactive wall paint visualizer.
- `src/app/paint-calculator/page.tsx`: Paint volume & budget estimator.
