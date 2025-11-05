export const toBoolean = (value) => value === 1 || value === true;

export const mapUserRow = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    profileImage: row.profile_image,
    telegramId: row.telegram_id,
    joinDate: row.join_date
  };
};

export const mapSettingsRow = (row) => {
  if (!row) return null;
  return {
    language: row.language,
    theme: row.theme,
    notifyNewServices: toBoolean(row.notify_new_services),
    notifyPaymentConfirmations: toBoolean(row.notify_payment_confirmations),
    notifyPromotions: toBoolean(row.notify_promotions),
    shareDataWithPartners: toBoolean(row.share_data_with_partners),
    publicProfile: toBoolean(row.public_profile),
    accountSecurity: row.account_security
  };
};

export const toDbBool = (value) => (value ? 1 : 0);
