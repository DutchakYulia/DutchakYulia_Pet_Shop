class NotificationService {
  constructor(notificationSenderFactory) {
    this.notificationSenderFactory = notificationSenderFactory;
  }

  async send(channel, user, message) {
    const sender = this.notificationSenderFactory.create(channel);
    return sender.send(user, message);
  }
}

module.exports = NotificationService;
