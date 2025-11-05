import TelegramBot from 'node-telegram-bot-api';
import { ADMIN_TELEGRAM_ID, TELEGRAM_BOT_TOKEN } from './config.js';
const adminStates = new Map();

const formatPaymentMessage = (entry) =>
  `💰 *طلب دفع جديد*

👤 المستخدم: ${entry.username}
🆔 رقم الطلب: #${entry.order_id}
💵 المبلغ: ${entry.price_egp} EGP (${entry.price_usd} USD)
💳 الطريقة: ${entry.method}
🔢 رقم العملية: ${entry.transaction_id || 'غير متوفر'}
📅 التاريخ: ${entry.order_created_at}
🕒 الحالة: ${entry.payment_status}`;

export const setupBot = (db) => {
  const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

  const sendAdminMenu = async (chatId) => {
    const keyboard = {
      inline_keyboard: [
        [
          { text: '📦 الطلبات الجديدة', callback_data: 'menu:pending' },
          { text: '💰 الطلبات المؤكدة', callback_data: 'menu:confirmed' }
        ],
        [
          { text: '🚫 المرفوضة', callback_data: 'menu:rejected' },
          { text: '📊 الإحصائيات', callback_data: 'menu:stats' }
        ],
        [{ text: '📢 إرسال إشعار عام', callback_data: 'menu:broadcast' }]
      ]
    };

    await bot.sendMessage(chatId, '👑 لوحة التحكم الرئيسية', {
      reply_markup: keyboard
    });
  };

  const listOrders = (chatId, status) => {
    const rows = db
      .prepare(
        `SELECT
            payments.id AS payment_id,
            payments.status AS payment_status,
            payments.proof_url,
            payments.created_at AS payment_created_at,
            payments.method,
            payments.transaction_id,
            orders.id AS order_id,
            orders.service,
            orders.package_duration,
            orders.price_egp,
            orders.price_usd,
            orders.status AS order_status,
            orders.created_at AS order_created_at,
            users.username,
            users.telegram_id
         FROM payments
         JOIN orders ON orders.id = payments.order_id
         JOIN users ON users.id = orders.user_id
         WHERE payments.status = ?
         ORDER BY payments.created_at DESC`
      )
      .all(status);

    if (rows.length === 0) {
      bot.sendMessage(chatId, 'لا توجد طلبات في هذه القائمة حالياً.');
      return;
    }

    rows.forEach((row) => {
      const text = `#ID${row.order_id}
👤 @${row.username}
💵 ${row.price_egp} EGP (${row.price_usd} USD)
📦 ${row.service} – ${row.package_duration}
🕒 الحالة: ${row.payment_status}`;
      const buttons = [];
      if (status === 'awaiting_confirmation') {
        buttons.push(
          { text: '✅ تأكيد الدفع', callback_data: `payment:accept:${row.payment_id}` },
          { text: '❌ رفض', callback_data: `payment:reject:${row.payment_id}` }
        );
      } else if (status === 'user_waiting') {
        buttons.push({ text: '✅ تم التنفيذ', callback_data: `order:complete:${row.order_id}` });
      }

      bot.sendMessage(chatId, text, {
        reply_markup: {
          inline_keyboard: buttons.length ? [buttons] : []
        }
      });
    });
  };

  const sendStats = (chatId) => {
    const stats = db
      .prepare(
        `SELECT
          (SELECT COUNT(*) FROM orders) AS total_orders,
          (SELECT COUNT(*) FROM orders WHERE status = 'awaiting_confirmation') AS pending_orders,
          (SELECT COUNT(*) FROM orders WHERE status = 'user_waiting') AS waiting_orders,
          (SELECT COUNT(*) FROM orders WHERE status = 'completed') AS completed_orders,
          (SELECT COUNT(*) FROM orders WHERE status = 'rejected') AS rejected_orders,
          (SELECT IFNULL(SUM(price_egp), 0) FROM orders WHERE status = 'completed') AS total_egp,
          (SELECT IFNULL(SUM(price_usd), 0) FROM orders WHERE status = 'completed') AS total_usd`
      )
      .get();

    bot.sendMessage(
      chatId,
      `📊 *إحصائيات سريعة*

عدد الطلبات الكلي: ${stats.total_orders}
الطلبات قيد الانتظار: ${stats.pending_orders}
الطلبات المؤكدة: ${stats.waiting_orders}
المكتملة: ${stats.completed_orders}
المرفوضة: ${stats.rejected_orders}
إجمالي الأرباح: ${stats.total_egp} جنيه – ${stats.total_usd} دولار`,
      { parse_mode: 'Markdown' }
    );
  };

  const notifyNewPayment = (paymentId) => {
    const row = db
      .prepare(
        `SELECT
            payments.id AS payment_id,
            payments.status AS payment_status,
            payments.proof_url,
            payments.method,
            payments.transaction_id,
            orders.id AS order_id,
            orders.service,
            orders.package_duration,
            orders.price_egp,
            orders.price_usd,
            orders.status AS order_status,
            orders.created_at AS order_created_at,
            users.username,
            users.telegram_id
         FROM payments
         JOIN orders ON orders.id = payments.order_id
         JOIN users ON users.id = orders.user_id
         WHERE payments.id = ?`
      )
      .get(paymentId);

    if (!row) return;

    bot.sendMessage(ADMIN_TELEGRAM_ID, formatPaymentMessage(row), {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ قبول', callback_data: `payment:accept:${row.payment_id}` },
            { text: '❌ رفض', callback_data: `payment:reject:${row.payment_id}` }
          ],
          [
            {
              text: '📎 عرض الإثبات',
              url: row.proof_url || 'https://shopton.com'
            }
          ]
        ]
      }
    });
  };

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    if (chatId === ADMIN_TELEGRAM_ID) {
      sendAdminMenu(chatId);
    } else {
      bot.sendMessage(
        chatId,
        'أهلاً بك في Shop Ton! لربط حسابك بالموقع أرسل الأمر:\n/link اسم_المستخدم في الموقع.'
      );
    }
  });

  bot.onText(/\/link (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const username = match?.[1]?.trim();

    if (!username) {
      bot.sendMessage(chatId, 'يرجى كتابة اسم المستخدم بعد الأمر /link');
      return;
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
      bot.sendMessage(chatId, 'لم يتم العثور على حساب بهذا الاسم.');
      return;
    }

    db.prepare('UPDATE users SET telegram_id = ? WHERE id = ?').run(chatId, user.id);
    bot.sendMessage(chatId, 'تم الربط بنجاح! ستتلقى إشعارات طلباتك هنا.');
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (chatId === ADMIN_TELEGRAM_ID && adminStates.has(chatId)) {
      const state = adminStates.get(chatId);
      if (state.type === 'broadcast' && text) {
        adminStates.delete(chatId);
        const users = db.prepare('SELECT telegram_id FROM users WHERE telegram_id IS NOT NULL').all();
        users.forEach((user) => {
          bot.sendMessage(user.telegram_id, `💎 إشعار جديد: ${text}`);
        });
        bot.sendMessage(chatId, 'تم إرسال الإشعار إلى جميع المستخدمين.');
        return;
      }
      if (state.type === 'reject' && text) {
        adminStates.delete(chatId);
        const payment = db.prepare('SELECT * FROM payments WHERE id = ?').get(state.paymentId);
        if (!payment) return;
        db.prepare("UPDATE payments SET status = 'rejected' WHERE id = ?").run(payment.id);
        db.prepare("UPDATE orders SET status = 'rejected' WHERE id = ?").run(payment.order_id);
        bot.sendMessage(chatId, 'تم رفض الطلب وإبلاغ المستخدم.');
        const orderRow = db
          .prepare('SELECT users.telegram_id FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = ?')
          .get(payment.order_id);
        if (orderRow?.telegram_id) {
          bot.sendMessage(orderRow.telegram_id, `تم رفض عملية الدفع. السبب: ${text}`);
        }
        return;
      }
    }

    if (chatId !== ADMIN_TELEGRAM_ID && text && !text.startsWith('/')) {
      const user = db.prepare('SELECT * FROM users WHERE telegram_id = ?').get(chatId);
      if (!user) return;
      const pendingOrder = db
        .prepare("SELECT * FROM orders WHERE user_id = ? AND status = 'user_waiting' ORDER BY created_at DESC LIMIT 1")
        .get(user.id);
      if (!pendingOrder) return;
      db.prepare("UPDATE orders SET status = 'processing' WHERE id = ?").run(pendingOrder.id);
      bot.sendMessage(ADMIN_TELEGRAM_ID, `📨 تم استلام بيانات من المستخدم @${user.username} بخصوص الطلب #${pendingOrder.id}:\n${text}`);
      bot.sendMessage(chatId, 'تم استلام البيانات، سنباشر تنفيذ خدمتك.');
    }
  });

  bot.on('callback_query', (query) => {
    const { data, message } = query;
    if (!data || !message) return;
    const chatId = message.chat.id;
    const [scope, action, id] = data.split(':');

    if (chatId !== ADMIN_TELEGRAM_ID) return;

    if (scope === 'menu') {
      if (action === 'pending') {
        listOrders(chatId, 'awaiting_confirmation');
      } else if (action === 'confirmed') {
        listOrders(chatId, 'user_waiting');
      } else if (action === 'rejected') {
        listOrders(chatId, 'rejected');
      } else if (action === 'stats') {
        sendStats(chatId);
      } else if (action === 'broadcast') {
        adminStates.set(chatId, { type: 'broadcast' });
        bot.sendMessage(chatId, 'أرسل الرسالة التي ترغب في بثها لجميع المستخدمين.');
      }
      return;
    }

    if (scope === 'payment') {
      const paymentId = Number(id);
      if (action === 'accept') {
        db.prepare("UPDATE payments SET status = 'user_waiting' WHERE id = ?").run(paymentId);
        const orderRow = db
          .prepare(
            `SELECT orders.id, users.telegram_id
             FROM payments
             JOIN orders ON orders.id = payments.order_id
             JOIN users ON users.id = orders.user_id
             WHERE payments.id = ?`
          )
          .get(paymentId);
        if (orderRow) {
          db.prepare("UPDATE orders SET status = 'user_waiting' WHERE id = ?").run(orderRow.id);
          if (orderRow.telegram_id) {
            bot.sendMessage(
              orderRow.telegram_id,
              'تم تأكيد الدفع ✅\nالرجاء كتابة يوزر القناة / الحساب المطلوب تنفيذ الخدمة عليه.'
            );
          }
        }
        bot.sendMessage(chatId, 'تم تأكيد الدفع.');
      } else if (action === 'reject') {
        adminStates.set(chatId, { type: 'reject', paymentId });
        bot.sendMessage(chatId, 'أرسل سبب الرفض ليتم إعلام المستخدم.');
      }
      return;
    }

    if (scope === 'order' && action === 'complete') {
      const orderId = Number(id);
      db.prepare("UPDATE orders SET status = 'completed' WHERE id = ?").run(orderId);
      db.prepare("UPDATE payments SET status = 'completed' WHERE order_id = ?").run(orderId);
      bot.sendMessage(chatId, 'تم تحديد الطلب كمكتمل.');
      const userRow = db
        .prepare('SELECT users.telegram_id, users.username FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = ?')
        .get(orderId);
      if (userRow?.telegram_id) {
        bot.sendMessage(userRow.telegram_id, 'تم تنفيذ الطلب بنجاح ✅ شكرًا لاختيارك Shop Ton.');
      }
    }
  });

  return {
    bot,
    notifyNewPayment
  };
};
