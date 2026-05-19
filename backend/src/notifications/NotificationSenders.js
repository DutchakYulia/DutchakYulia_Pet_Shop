class EmailNotificationSender {
  async send(user, message) {
    return `Email sent to ${user.email}: ${message}`;
  }
}

class SmsNotificationSender {
  async send(user, message) {
    return `SMS sent to ${user.phone}: ${message}`;
  }
}

class TelegramNotificationSender {
  async send(user, message) {
    return `Telegram sent to ${user.telegramId || user.email}: ${message}`;
  }
}

module.exports = {
  EmailNotificationSender,
  SmsNotificationSender,
  TelegramNotificationSender
};
