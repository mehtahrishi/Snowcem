const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function convertTablesToInnoDB() {
  console.log('Connecting to MySQL database...');
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  const tables = ['categories', 'products', 'orders', 'order_items', 'customers'];

  for (const table of tables) {
    console.log(`Converting ${table} table to ENGINE=InnoDB with utf8mb4_unicode_ci...`);
    await connection.query(`
      ALTER TABLE ${table} 
      ENGINE=InnoDB, 
      CONVERT TO CHARACTER SET utf8mb4 
      COLLATE utf8mb4_unicode_ci;
    `);
    console.log(`✅ Table \`${table}\` converted to InnoDB!`);
  }

  // Add Foreign Key constraints if not present
  try {
    await connection.query(`
      ALTER TABLE products 
      ADD CONSTRAINT fk_products_categories 
      FOREIGN KEY (category_id) REFERENCES categories(id) 
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    console.log('✅ Added InnoDB Foreign Key constraint between products and categories!');
  } catch (err) {
    console.log('FK on products info:', err.message);
  }

  try {
    await connection.query(`
      ALTER TABLE order_items 
      ADD CONSTRAINT fk_order_items_orders 
      FOREIGN KEY (order_id) REFERENCES orders(id) 
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    console.log('✅ Added InnoDB Foreign Key constraint between order_items and orders!');
  } catch (err) {
    console.log('FK on order_items info:', err.message);
  }

  // Check updated table status
  const [tableStatus] = await connection.query(`
    SELECT TABLE_NAME, ENGINE, TABLE_COLLATION 
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE();
  `);

  console.log('🎉 Updated Table Engines in Database:');
  console.table(tableStatus);

  await connection.end();
}

convertTablesToInnoDB().catch((err) => {
  console.error('❌ Error converting tables to InnoDB:', err);
});
