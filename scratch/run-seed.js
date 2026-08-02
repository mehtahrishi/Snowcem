const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function seedData() {
  console.log('Connecting to seed MySQL database...');
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  // Seed Categories
  const categories = [
    ['cat_ext_emulsions', 'Exterior Emulsions', 'exterior-emulsions', 'High-durability weather-proof exterior paints designed for harsh climates.', '/hero1.png', 'Active'],
    ['cat_int_emulsions', 'Interior Emulsions', 'interior-emulsions', 'Smooth, washable, and vibrant indoor wall paints with stain resistance.', '/hero2.png', 'Active'],
    ['cat_waterproofing', 'Waterproofing Solutions', 'waterproofing', 'Advanced elastomeric and liquid waterproofing membranes for roofs & walls.', '/hero3.png', 'Active'],
    ['cat_primers', 'Primers & Undercoats', 'primers', 'High-penetration undercoats ensuring superior topcoat adhesion.', '/image.png', 'Active'],
    ['cat_cement_paints', 'Cement Paints', 'cement-paints', 'Iconic Snowcem exterior masonry cement coating formula since 1959.', '/hero1.png', 'Active'],
    ['cat_wall_putty', 'Wall Putty & Fillers', 'wall-putty', 'White-cement based ultra-fine wall smoothing compounds.', '/hero2.png', 'Active'],
    ['cat_designer_textures', 'Designer Textures', 'designer-textures', 'Luxury textured finishes creating stone, metallic, and rustic effects.', '/hero3.png', 'Active']
  ];

  for (const cat of categories) {
    await connection.query(
      `INSERT INTO categories (id, name, slug, description, image, status) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name);`,
      cat
    );
  }
  console.log('✅ Seeded 7 categories.');

  // Seed Products
  const products = [
    ['prod_1', 'Snowcem Plus Superior Exterior Cement Paint', 'SNC-EXT-001', 'cat_cement_paints', 'cement-paints', 1850, 140, 'Active', 'Premium waterproof cement paint engineered for durable exterior protection against heavy rains.', '/hero1.png'],
    ['prod_2', 'Snowcryl XT Premium Acrylic Exterior Emulsion', 'SNC-EXT-002', 'cat_ext_emulsions', 'exterior-emulsions', 3450, 85, 'Active', '100% acrylic exterior emulsion with anti-algae, anti-fungal, and UV reflect technology.', '/hero2.png'],
    ['prod_3', 'Allround Eco Waterproof Exterior Paint', 'SNC-EXT-003', 'cat_ext_emulsions', 'exterior-emulsions', 2800, 110, 'Active', 'Eco-friendly exterior paint offering smooth finish and dirt pick-up resistance.', '/hero3.png'],
    ['prod_4', 'Snowcem Uni-Gloss Interior Emulsion', 'SNC-INT-001', 'cat_int_emulsions', 'interior-emulsions', 2200, 60, 'Active', 'High sheen washable interior emulsion paint for elegant home living rooms.', '/image.png'],
    ['prod_5', 'Snowcem Universal Wall Primer', 'SNC-PRM-001', 'cat_primers', 'primers', 1250, 200, 'Active', 'Water-based interior & exterior wall primer for binding masonry surface particles.', '/hero3.png']
  ];

  for (const prod of products) {
    await connection.query(
      `INSERT INTO products (id, title, sku, category_id, category_slug, price, stock, status, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title);`,
      prod
    );
  }
  console.log('✅ Seeded 5 products.');

  // Seed Orders
  await connection.query(
    `INSERT INTO orders (id, order_number, customer_name, customer_email, total_amount, status, payment_status) VALUES
    ('ord_101', 'ORD-2026-101', 'Rajesh Sharma', 'rajesh.sharma@example.com', 8150, 'Delivered', 'Paid'),
    ('ord_102', 'ORD-2026-102', 'Priya Patel', 'priya.p@example.com', 7400, 'Shipped', 'Paid')
    ON DUPLICATE KEY UPDATE status=VALUES(status);`
  );
  console.log('✅ Seeded sample orders.');

  // Seed Customers
  await connection.query(
    `INSERT INTO customers (id, name, email, phone, city, total_orders, total_spent, status) VALUES
    ('cust_1', 'Rajesh Sharma', 'rajesh.sharma@example.com', '+91 98765 43210', 'Mumbai', 3, 24500, 'Active'),
    ('cust_2', 'Priya Patel', 'priya.p@example.com', '+91 98200 11223', 'Ahmedabad', 2, 16800, 'Active')
    ON DUPLICATE KEY UPDATE name=VALUES(name);`
  );
  console.log('✅ Seeded sample customers.');

  await connection.end();
  console.log('🎉 Database seeding finished!');
}

seedData().catch((err) => {
  console.error('❌ Error seeding data:', err);
});
