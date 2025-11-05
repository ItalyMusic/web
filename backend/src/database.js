import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'backend', 'data');
const dbFile = path.join(dbPath, 'shop-ton.db');

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

const db = new Database(dbFile);

db.pragma('journal_mode = WAL');

const init = () => {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_id TEXT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      profile_image TEXT,
      join_date TEXT DEFAULT CURRENT_TIMESTAMP,
      language TEXT DEFAULT 'ar',
      theme TEXT DEFAULT 'dark',
      notify_new_services INTEGER DEFAULT 1,
      notify_payment_confirmations INTEGER DEFAULT 1,
      notify_promotions INTEGER DEFAULT 0,
      share_data_with_partners INTEGER DEFAULT 1,
      public_profile INTEGER DEFAULT 1,
      account_security TEXT DEFAULT 'high'
    )`
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      service TEXT NOT NULL,
      package_duration TEXT NOT NULL,
      price_egp REAL NOT NULL,
      price_usd REAL NOT NULL,
      payment_method TEXT,
      status TEXT DEFAULT 'awaiting_confirmation',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      transaction_id TEXT,
      proof_url TEXT,
      method TEXT,
      status TEXT DEFAULT 'awaiting_confirmation',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(order_id) REFERENCES orders(id)
    )`
  ).run();
};

init();

export default db;
