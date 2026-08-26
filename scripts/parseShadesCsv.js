const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'curated_300_color_shades_all_spaces.csv');
const rawContent = fs.readFileSync(csvPath, 'utf8');
const lines = rawContent.split(/\r?\n/).filter(l => l.trim().length > 0);

const shades = [];

for (let i = 1; i < lines.length; i++) {
  const row = lines[i];
  const parts = [];
  let inQuotes = false;
  let current = '';
  for (let j = 0; j < row.length; j++) {
    const c = row[j];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      parts.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += c;
    }
  }
  parts.push(current.trim().replace(/^"|"$/g, ''));

  if (parts.length >= 7 && parts[0].startsWith('SHADE-')) {
    shades.push({
      id: parts[0],
      category: parts[1],
      subcategory: parts[2],
      name: parts[3],
      hex: parts[4].startsWith('#') ? parts[4] : `#${parts[4]}`,
      recommendedSurface: parts[5],
      moodAndDescription: parts[6],
    });
  }
}

const categories = [...new Set(shades.map(s => s.category))];
const subcategoriesByCategory = {};
categories.forEach(cat => {
  subcategoriesByCategory[cat] = [...new Set(shades.filter(s => s.category === cat).map(s => s.subcategory))];
});

const tsContent = `// Auto-generated from curated_300_color_shades_all_spaces.csv
export interface CuratedColorShade {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  hex: string;
  recommendedSurface: string;
  moodAndDescription: string;
}

export const CURATED_COLOR_CATEGORIES = ${JSON.stringify(categories, null, 2)} as const;

export const SUBCATEGORIES_BY_CATEGORY: Record<string, string[]> = ${JSON.stringify(subcategoriesByCategory, null, 2)};

export const CURATED_COLOR_SHADES: CuratedColorShade[] = ${JSON.stringify(shades, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'curatedShadesData.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log(`Generated ${shades.length} shades across ${categories.length} categories.`);
console.log('Categories:', categories);
