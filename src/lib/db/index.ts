import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const globalForDb = globalThis as unknown as {
  connPool: mysql.Pool | undefined;
  poolUrl: string | undefined;
};

function getDbUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL environment variable is missing. Please define it in your .env or server environment."
    );
  }
  return url;
}

function getPool(): mysql.Pool {
  const currentUrl = getDbUrl();
  if (!globalForDb.connPool || globalForDb.poolUrl !== currentUrl) {
    if (globalForDb.connPool) {
      try {
        globalForDb.connPool.end();
      } catch (e) {
        // ignore cleanup error
      }
    }
    globalForDb.connPool = mysql.createPool(currentUrl);
    globalForDb.poolUrl = currentUrl;
  }
  return globalForDb.connPool;
}

export const pool = getPool();

export const db = drizzle(pool, { schema, mode: "default" });

/**
 * Initializes and ensures database tables exist in MariaDB.
 */
export async function ensureTablesExist(): Promise<{ success: boolean; error?: string }> {
  try {
    const activePool = getPool();
    const connection = await activePool.getConnection();
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS dealers (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          pincode VARCHAR(20),
          landmark VARCHAR(255),
          rating DECIMAL(3,1) DEFAULT 4.8,
          featured BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `);

      await connection.query(`
        CREATE TABLE IF NOT EXISTS painters (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          pincode VARCHAR(20),
          experience_years INT DEFAULT 3,
          specialization VARCHAR(150) DEFAULT 'Exterior Textures & Emulsions',
          rating DECIMAL(3,1) DEFAULT 4.8,
          status VARCHAR(50) DEFAULT 'active',
          verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uq_painter_phone (phone)
        );
      `);

      // Ensure pincode column exists if table was created previously without it
      try {
        await connection.query(`
          ALTER TABLE painters ADD COLUMN IF NOT EXISTS pincode VARCHAR(20) AFTER state;
        `);
      } catch (e) {
        // column may already exist
      }

      await connection.query(`
        CREATE TABLE IF NOT EXISTS colors (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          code VARCHAR(50) NOT NULL,
          hex VARCHAR(10) NOT NULL,
          category VARCHAR(100) NOT NULL DEFAULT 'Uni-glosss',
          finish VARCHAR(50) DEFAULT 'Gloss',
          popular BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `);

      return { success: true };
    } finally {
      connection.release();
    }
  } catch (err: any) {
    console.error("Database connection / table setup error:", err?.message || err);
    return { success: false, error: err?.message || "Failed to connect to MariaDB database" };
  }
}
