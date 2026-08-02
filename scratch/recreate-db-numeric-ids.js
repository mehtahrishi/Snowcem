const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function recreateDatabaseWithNumericIds() {
  const connectionUrl = process.env.DATABASE_URL;
  if (!connectionUrl) {
    console.error('DATABASE_URL is missing in .env.local!');
    process.exit(1);
  }

  console.log('Connecting to MySQL database...');
  const connection = await mysql.createConnection(connectionUrl);

  console.log('Dropping existing tables...');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  await connection.query('DROP TABLE IF EXISTS order_items');
  await connection.query('DROP TABLE IF EXISTS orders');
  await connection.query('DROP TABLE IF EXISTS products');
  await connection.query('DROP TABLE IF EXISTS categories');
  await connection.query('DROP TABLE IF EXISTS customers');
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log('Old tables dropped.');

  console.log('Creating tables with INT AUTO_INCREMENT Primary Keys...');

  // 1. categories
  await connection.query(`
    CREATE TABLE categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      image TEXT,
      status ENUM('Active', 'Archived') NOT NULL DEFAULT 'Active',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 2. products
  await connection.query(`
    CREATE TABLE products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      sku VARCHAR(128) NOT NULL UNIQUE,
      category_id INT NOT NULL,
      category_slug VARCHAR(255) NOT NULL,
      price DOUBLE NOT NULL DEFAULT 0,
      stock INT NOT NULL DEFAULT 0,
      status ENUM('Active', 'Draft', 'Out of Stock') NOT NULL DEFAULT 'Active',
      description TEXT,
      image TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. customers
  await connection.query(`
    CREATE TABLE customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(64),
      city VARCHAR(128),
      total_orders INT NOT NULL DEFAULT 0,
      total_spent DOUBLE NOT NULL DEFAULT 0,
      status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
      joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 4. orders
  await connection.query(`
    CREATE TABLE orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_number VARCHAR(64) NOT NULL UNIQUE,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      total_amount DOUBLE NOT NULL DEFAULT 0,
      status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
      payment_status ENUM('Paid', 'Pending', 'Refunded') NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 5. order_items
  await connection.query(`
    CREATE TABLE order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT,
      title VARCHAR(255) NOT NULL,
      category_name VARCHAR(255),
      qty INT NOT NULL DEFAULT 1,
      price DOUBLE NOT NULL DEFAULT 0,
      CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('Tables successfully created with numeric auto-increment primary keys!');

  console.log('Seeding initial categories...');
  const catResults = [];
  const categoriesList = [
    { name: 'Exterior Emulsions', slug: 'exterior-emulsions', description: 'High-durability weather-proof exterior paints.', image: '/hero1.png' },
    { name: 'Interior Emulsions', slug: 'interior-emulsions', description: 'Smooth, washable, vibrant indoor wall paints.', image: '/hero2.png' },
    { name: 'Waterproofing Solutions', slug: 'waterproofing', description: 'Advanced elastomeric waterproofing membranes.', image: '/hero3.png' },
    { name: 'Primers & Undercoats', slug: 'primers', description: 'High-penetration undercoats for superior adhesion.', image: '/image.png' },
    { name: 'Cement Paints', slug: 'cement-paints', description: 'Iconic Snowcem exterior masonry cement coating.', image: '/hero1.png' },
    { name: 'Wall Putty & Fillers', slug: 'wall-putty', description: 'White-cement based ultra-fine wall smoothing compounds.', image: '/hero2.png' },
    { name: 'Designer Textures', slug: 'designer-textures', description: 'Luxury textured finishes creating stone and metallic effects.', image: '/hero3.png' }
  ];

  for (const cat of categoriesList) {
    const [res] = await connection.query(
      'INSERT INTO categories (name, slug, description, image) VALUES (?, ?, ?, ?)',
      [cat.name, cat.slug, cat.description, cat.image]
    );
    catResults.push({ id: res.insertId, slug: cat.slug });
  }

  const getCatId = (slug) => catResults.find(c => c.slug === slug).id;

  console.log('Seeding initial products...');
  const productsList = [
    { title: 'Snowcem Plus Superior Exterior Cement Paint', sku: 'SNC-EXT-001', catSlug: 'cement-paints', price: 1850, stock: 140, image: '/hero1.png', description: 'Premium waterproof cement paint engineered for durable exterior protection.' },
    { title: 'Snowcryl XT Premium Acrylic Exterior Emulsion', sku: 'SNC-EXT-002', catSlug: 'exterior-emulsions', price: 3450, stock: 85, image: '/hero2.png', description: '100% acrylic exterior emulsion with anti-algae, anti-fungal, and UV reflect technology.' },
    { title: 'Allround Eco Waterproof Exterior Paint', sku: 'SNC-EXT-003', catSlug: 'exterior-emulsions', price: 2800, stock: 110, image: '/hero3.png', description: 'Eco-friendly exterior paint offering smooth finish and dirt pick-up resistance.' },
    { title: 'Snowcem Uni-Gloss Interior Emulsion', sku: 'SNC-INT-001', catSlug: 'interior-emulsions', price: 2200, stock: 60, image: '/image.png', description: 'High sheen washable interior emulsion paint for elegant home living rooms.' },
    { title: 'Snowcem Universal Wall Primer', sku: 'SNC-PRM-001', catSlug: 'primers', price: 1250, stock: 200, image: '/hero3.png', description: 'Water-based interior & exterior wall primer for binding masonry surface particles.' }
  ];

  for (const prod of productsList) {
    const catId = getCatId(prod.catSlug);
    await connection.query(
      'INSERT INTO products (title, sku, category_id, category_slug, price, stock, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [prod.title, prod.sku, catId, prod.catSlug, prod.price, prod.stock, prod.description, prod.image]
    );
  }

  console.log('Database successfully migrated to numeric IDs and populated!');
  await connection.end();
}

recreateDatabaseWithNumericIds().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
