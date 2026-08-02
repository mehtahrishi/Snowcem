const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function pushSchemaAndSeed() {
  console.log('Connecting to MySQL database...');
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  console.log('✅ Connected to MySQL!');

  // Create categories table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      image TEXT,
      status ENUM('Active', 'Archived') DEFAULT 'Active' NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);
  console.log('✅ Created `categories` table.');

  // Create products table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      sku VARCHAR(128) NOT NULL UNIQUE,
      category_id VARCHAR(64) NOT NULL,
      category_slug VARCHAR(255) NOT NULL,
      price DOUBLE DEFAULT 0 NOT NULL,
      stock INT DEFAULT 0 NOT NULL,
      status ENUM('Active', 'Draft', 'Out of Stock') DEFAULT 'Active' NOT NULL,
      description TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );
  `);
  console.log('✅ Created `products` table.');

  // Create orders table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(64) PRIMARY KEY,
      order_number VARCHAR(64) NOT NULL UNIQUE,
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      total_amount DOUBLE DEFAULT 0 NOT NULL,
      status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending' NOT NULL,
      payment_status ENUM('Paid', 'Pending', 'Refunded') DEFAULT 'Pending' NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);
  console.log('✅ Created `orders` table.');

  // Create order_items table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id VARCHAR(64) PRIMARY KEY,
      order_id VARCHAR(64) NOT NULL,
      product_id VARCHAR(64),
      title VARCHAR(255) NOT NULL,
      category_name VARCHAR(255),
      qty INT DEFAULT 1 NOT NULL,
      price DOUBLE DEFAULT 0 NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
  `);
  console.log('✅ Created `order_items` table.');

  // Create customers table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(64),
      city VARCHAR(128),
      total_orders INT DEFAULT 0 NOT NULL,
      total_spent DOUBLE DEFAULT 0 NOT NULL,
      status ENUM('Active', 'Inactive') DEFAULT 'Active' NOT NULL,
      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);
  console.log('✅ Created `customers` table.');

  // Check table list
  const [tables] = await connection.query('SHOW TABLES;');
  console.log('🎉 Current tables in cPanel MySQL Database:', tables);

  await connection.end();
}

pushSchemaAndSeed().catch((err) => {
  console.error('❌ Error pushing schema:', err);
});
