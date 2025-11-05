import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import db from './database.js';
import { generateToken, authMiddleware } from './auth.js';
import { mapUserRow, mapSettingsRow, toDbBool } from './utils.js';
import { PORT, APP_ORIGIN } from './config.js';
import { setupBot } from './telegram.js';

const app = express();
app.use(cors({ origin: APP_ORIGIN === '*' ? '*' : [APP_ORIGIN], credentials: false }));
app.use(express.json({ limit: '5mb' }));

const bot = setupBot(db);

app.post('/api/register', async (req, res) => {
  const { username, password, telegramId, profileImage } = req.body;

  if (!username || !password || !profileImage) {
    return res.status(400).json({ message: 'جميع الحقول مطلوبة.' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ message: 'تم التسجيل مسبقاً، الرجاء تسجيل الدخول.' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = db
    .prepare(
      `INSERT INTO users (username, password, telegram_id, profile_image) VALUES (?, ?, ?, ?)`
    )
    .run(username, hashed, telegramId || null, profileImage);

  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  const token = generateToken(userRow.id);
  res.json({ token, user: mapUserRow(userRow), settings: mapSettingsRow(userRow) });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'بيانات الدخول مطلوبة.' });
  }

  const userRow = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!userRow) {
    return res.status(404).json({ message: 'الحساب غير موجود.' });
  }

  const match = await bcrypt.compare(password, userRow.password);
  if (!match) {
    return res.status(401).json({ message: 'بيانات الدخول غير صحيحة.' });
  }

  const token = generateToken(userRow.id);
  res.json({ token, user: mapUserRow(userRow), settings: mapSettingsRow(userRow) });
});

app.get('/api/account', authMiddleware, (req, res) => {
  res.json({ user: req.user.profile, settings: req.user.settings });
});

app.put('/api/account/profile', authMiddleware, (req, res) => {
  const { profileImage } = req.body;
  db.prepare('UPDATE users SET profile_image = ? WHERE id = ?').run(profileImage, req.user.id);
  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json({ user: mapUserRow(userRow) });
});

app.put('/api/account/settings', authMiddleware, (req, res) => {
  const settings = req.body;
  db.prepare(
    `UPDATE users SET
      language = ?,
      theme = ?,
      notify_new_services = ?,
      notify_payment_confirmations = ?,
      notify_promotions = ?,
      share_data_with_partners = ?,
      public_profile = ?,
      account_security = ?
    WHERE id = ?`
  ).run(
    settings.language,
    settings.theme,
    toDbBool(settings.notifyNewServices),
    toDbBool(settings.notifyPaymentConfirmations),
    toDbBool(settings.notifyPromotions),
    toDbBool(settings.shareDataWithPartners),
    toDbBool(settings.publicProfile),
    settings.accountSecurity,
    req.user.id
  );

  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json({ settings: mapSettingsRow(userRow) });
});

app.get('/api/payments', authMiddleware, (req, res) => {
  const payments = db
    .prepare(
      `SELECT payments.*, orders.service, orders.package_duration, orders.price_egp, orders.price_usd
       FROM payments
       JOIN orders ON orders.id = payments.order_id
       WHERE orders.user_id = ?
       ORDER BY payments.created_at DESC`
    )
    .all(req.user.id)
    .map((row) => ({
      id: row.id,
      status: row.status,
      transactionId: row.transaction_id,
      proofUrl: row.proof_url,
      method: row.method,
      service: row.service,
      packageDuration: row.package_duration,
      priceEgp: row.price_egp,
      priceUsd: row.price_usd,
      createdAt: row.created_at
    }));

  res.json({ payments });
});

app.post('/api/payments', authMiddleware, (req, res) => {
  const { serviceId, packageDuration, priceEgp, priceUsd, paymentMethod, transactionId, proofUrl, telegramId } = req.body;

  if (!serviceId || !packageDuration || !priceEgp || !priceUsd || !paymentMethod || !proofUrl) {
    return res.status(400).json({ message: 'الرجاء تعبئة كل الحقول المطلوبة.' });
  }

  const orderResult = db
    .prepare(
      `INSERT INTO orders (user_id, service, package_duration, price_egp, price_usd, payment_method)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(req.user.id, serviceId, packageDuration, priceEgp, priceUsd, paymentMethod);

  const paymentResult = db
    .prepare(
      `INSERT INTO payments (order_id, transaction_id, proof_url, method) VALUES (?, ?, ?, ?)`
    )
    .run(orderResult.lastInsertRowid, transactionId, proofUrl, paymentMethod);

  if (telegramId && !req.user.profile.telegramId) {
    db.prepare('UPDATE users SET telegram_id = ? WHERE id = ?').run(telegramId, req.user.id);
  }

  bot.notifyNewPayment(paymentResult.lastInsertRowid);

  res.status(201).json({ message: 'تم إرسال طلب الدفع بنجاح.' });
});

app.listen(PORT, () => {
  console.log(`Shop Ton backend running on port ${PORT}`);
});
