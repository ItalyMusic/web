import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';
import db from './database.js';
import { mapUserRow, mapSettingsRow } from './utils.js';

export const generateToken = (userId) =>
  jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d'
  });

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.userId);
    if (!userRow) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = {
      id: userRow.id,
      row: userRow,
      profile: mapUserRow(userRow),
      settings: mapSettingsRow(userRow)
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
