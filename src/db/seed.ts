import { db } from './index';
import { collections } from './schema';

export async function seedDatabase() {
  console.log('Seeding initial Snowcem Paints database records with numeric IDs...');

  const initialCollections = [
    {
      name: 'Exterior Emulsions',
      slug: 'exterior-emulsions',
      description: 'High-durability weather-proof exterior paints designed for harsh climates.',
      image: '/hero1.png',
      status: 'Active' as const,
    },
    {
      name: 'Interior Emulsions',
      slug: 'interior-emulsions',
      description: 'Smooth, washable, and vibrant indoor wall paints with stain resistance.',
      image: '/hero2.png',
      status: 'Active' as const,
    },
    {
      name: 'Waterproofing Solutions',
      slug: 'waterproofing',
      description: 'Advanced elastomeric and liquid waterproofing membranes for roofs & walls.',
      image: '/hero3.png',
      status: 'Active' as const,
    },
    {
      name: 'Primers & Undercoats',
      slug: 'primers',
      description: 'High-penetration undercoats ensuring superior topcoat adhesion.',
      image: '/image.png',
      status: 'Active' as const,
    },
    {
      name: 'Cement Paints',
      slug: 'cement-paints',
      description: 'Iconic Snowcem exterior masonry cement coating formula since 1959.',
      image: '/hero1.png',
      status: 'Active' as const,
    },
    {
      name: 'Wall Putty & Fillers',
      slug: 'wall-putty',
      description: 'White-cement based ultra-fine wall smoothing compounds.',
      image: '/hero2.png',
      status: 'Active' as const,
    },
    {
      name: 'Designer Textures',
      slug: 'designer-textures',
      description: 'Luxury textured finishes creating stone, metallic, and rustic effects.',
      image: '/hero3.png',
      status: 'Active' as const,
    },
  ];

  for (const col of initialCollections) {
    await db.insert(collections).values(col).onDuplicateKeyUpdate({ set: { name: col.name } });
  }

  console.log('Database seeding completed successfully!');
}
