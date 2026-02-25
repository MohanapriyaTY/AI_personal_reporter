import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { SCHEMA_SQL } from "./schema";

const DB_PATH = path.join(process.cwd(), "data", "reporter.db");

let db: Database.Database | null = null;
let initialized = false;

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
  }
  if (!initialized) {
    db.exec(SCHEMA_SQL);
    initialized = true;
  }
  return db;
}

export function initializeDatabase(): void {
  getDb();
}
