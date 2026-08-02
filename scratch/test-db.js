const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing connection with DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Successfully connected to MySQL database!');
    const [rows] = await connection.query('SHOW TABLES;');
    console.log('Tables in database:', rows);
    await connection.end();
  } catch (err) {
    console.error('❌ Connection Error Code:', err.code);
    console.error('❌ Connection Error Message:', err.message);
  }
}

testConnection();
