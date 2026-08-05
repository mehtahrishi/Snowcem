import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Lazy singleton — pool is created only when first accessed,
// so serverless functions that don't use the DB won't crash on import.
let _pool: mysql.Pool | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any = null;

function getPool(): mysql.Pool {
  if (!_pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      'mysql://root:password@localhost:3306/snowcem_db';
    _pool = mysql.createPool({
      uri: connectionString,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return _pool;
}

export function getDb() {
  if (!_db) {
    _db = drizzle(getPool(), { schema, mode: 'default' });
  }
  return _db;
}

// Backwards-compatible named exports (lazy getters)
export const poolConnection = new Proxy({} as mysql.Pool, {
  get(_target, prop) {
    return (getPool() as any)[prop];
  },
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});
