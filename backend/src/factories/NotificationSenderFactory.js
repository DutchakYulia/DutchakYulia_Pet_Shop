const {
  EmailNotificationSender,
  SmsNotificationSender,
  TelegramNotificationSender
} = require("../notifications/NotificationSenders");

class NotificationSenderFactory {
  static create(channel) {
    const senders = {
      email: new EmailNotificationSender(),
      sms: new SmsNotificationSender(),
      telegram: new TelegramNotificationSender()
    };
    if (!senders[channel]) {
      throw new Error(`Unsupported notification channel: ${channel}`);
    }
    return senders[channel];
  }
}

module.exports = NotificationSenderFactory;
