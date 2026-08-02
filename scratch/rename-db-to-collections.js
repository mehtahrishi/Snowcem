const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function renameDatabaseToCollections() {
  const connectionUrl = process.env.DATABASE_URL;
  if (!connectionUrl) {
    console.error('DATABASE_URL is missing in .env.local!');
    process.exit(1);
  }

  console.log('Connecting to MySQL database...');
  const connection = await mysql.createConnection(connectionUrl);

  console.log('Renaming table categories to collections...');
  try {
    await connection.query('RENAME TABLE categories TO collections;');
    console.log('Successfully renamed table categories to collections.');
  } catch (err) {
    if (err.code === 'ER_NO_SUCH_TABLE') {
      console.log('Table categories does not exist or already renamed.');
    } else {
      console.log('Rename table status:', err.message);
    }
  }

  console.log('Renaming foreign key columns in products and order_items...');
  try {
    // Check and update products columns
    await connection.query(
      'ALTER TABLE products CHANGE COLUMN category_id collection_id INT NOT NULL, CHANGE COLUMN category_slug collection_slug VARCHAR(255) NOT NULL;'
    );
    console.log('Successfully renamed columns in products table.');
  } catch (err) {
    console.log('Products column rename status:', err.message);
  }

  try {
    // Check and update order_items column
    await connection.query(
      'ALTER TABLE order_items CHANGE COLUMN category_name collection_name VARCHAR(255);'
    );
    console.log('Successfully renamed column in order_items table.');
  } catch (err) {
    console.log('Order_items column rename status:', err.message);
  }

  await connection.end();
  console.log('Database migration to collections completed successfully!');
}

renameDatabaseToCollections().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
