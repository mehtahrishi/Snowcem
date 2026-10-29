import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const globalForDb = globalThis as unknown as {
  connPool: mysql.Pool | undefined;
  poolUrl: string | undefined;
  databaseReady: Promise<void> | undefined;
};

// TiDB Cloud Serverless clusters reject any connection that is not encrypted.
const TLS_OPTIONS = {};

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
    globalForDb.connPool = mysql.createPool({ uri: currentUrl, ssl: TLS_OPTIONS });
    globalForDb.poolUrl = currentUrl;
  }
  return globalForDb.connPool;
}

export const pool = getPool();

export const db = drizzle(pool, { schema, mode: "default" });

async function createDatabaseIfMissing(): Promise<void> {
  const parsed = new URL(getDbUrl());
  const database = decodeURIComponent(parsed.pathname.replace(/^\//, ""));
  if (!/^[A-Za-z0-9_]+$/.test(database)) return;

  parsed.pathname = "/";
  const connection = await mysql.createConnection({
    uri: parsed.toString(),
    ssl: TLS_OPTIONS,
  });
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  } finally {
    await connection.end();
  }
}

function ensureDatabaseExists(): Promise<void> {
  if (!globalForDb.databaseReady) {
    globalForDb.databaseReady = createDatabaseIfMissing().catch((err) => {
      globalForDb.databaseReady = undefined;
      throw err;
    });
  }
  return globalForDb.databaseReady;
}

// Columns added to the schema after the tables were first bootstrapped in a database.
const EXPECTED_COLUMNS: Record<string, Array<[string, string]>> = {
  dealers: [["customer_code", "VARCHAR(100) AFTER id"]],
  painters: [["pincode", "VARCHAR(20) AFTER state"]],
};

// Optional fields carry no default: an unknown rating or experience must stay empty
// instead of being filled in with a made-up value.
const NULLABLE_COLUMNS: Record<string, Array<[string, string]>> = {
  dealers: [["rating", "DECIMAL(3,1) NULL"]],
  painters: [
    ["experience_years", "INT NULL"],
    ["specialization", "VARCHAR(150) NULL"],
    ["rating", "DECIMAL(3,1) NULL"],
  ],
};

async function addMissingColumns(connection: mysql.PoolConnection): Promise<void> {
  for (const [table, columns] of Object.entries(EXPECTED_COLUMNS)) {
    const [rows] = await connection.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
      [table]
    );
    const present = new Set(
      (rows as Array<{ COLUMN_NAME: string }>).map((row) => row.COLUMN_NAME)
    );
    for (const [column, definition] of columns) {
      if (!present.has(column)) {
        await connection.query(
          `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`
        );
      }
    }
  }
}

async function dropStaleDefaults(connection: mysql.PoolConnection): Promise<void> {
  for (const [table, columns] of Object.entries(NULLABLE_COLUMNS)) {
    const [rows] = await connection.query(
      "SELECT COLUMN_NAME, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
      [table]
    );
    const defaults = new Map(
      (rows as Array<{ COLUMN_NAME: string; COLUMN_DEFAULT: string | null }>).map((row) => [
        row.COLUMN_NAME,
        row.COLUMN_DEFAULT,
      ])
    );
    for (const [column, definition] of columns) {
      if (defaults.get(column) != null) {
        await connection.query(
          `ALTER TABLE \`${table}\` MODIFY COLUMN \`${column}\` ${definition}`
        );
      }
    }
  }
}

/**
 * Creates the database and the dealers / painters / colors tables if they are
 * missing, then repairs columns added to the schema after first bootstrap.
 */
export async function ensureTablesExist(): Promise<{ success: boolean; error?: string }> {
  try {
    await ensureDatabaseExists();

    const activePool = getPool();
    const connection = await activePool.getConnection();
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS dealers (
          id VARCHAR(36) PRIMARY KEY,
          customer_code VARCHAR(100),
          name VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          pincode VARCHAR(20),
          landmark VARCHAR(255),
          rating DECIMAL(3,1),
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
          experience_years INT,
          specialization VARCHAR(150),
          rating DECIMAL(3,1),
          status VARCHAR(50) DEFAULT 'active',
          verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uq_painter_phone (phone)
        );
      `);

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

      await addMissingColumns(connection);
      await dropStaleDefaults(connection);

      return { success: true };
    } finally {
      connection.release();
    }
  } catch (err: any) {
    console.error("Database connection / table setup error:", err?.message || err);
    return { success: false, error: err?.message || "Failed to connect to the database" };
  }
}
