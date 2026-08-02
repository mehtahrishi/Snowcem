const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function dropPriceAndStockColumns() {
  const connectionUrl = process.env.DATABASE_URL;
  if (!connectionUrl) {
    console.error('DATABASE_URL is missing in .env.local!');
    process.exit(1);
  }

  console.log('Connecting to MySQL database...');
  const connection = await mysql.createConnection(connectionUrl);

  console.log('Altering products table to drop price and stock columns...');
  try {
    await connection.query('ALTER TABLE products DROP COLUMN price, DROP COLUMN stock;');
    console.log('Successfully dropped price and stock columns from products table.');
  } catch (err) {
    if (err.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
      console.log('Columns price/stock already dropped or not present.');
    } else {
      console.error('Error dropping columns:', err);
    }
  }

  await connection.end();
}

dropPriceAndStockColumns().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
