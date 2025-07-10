export default () => ({
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    queue: process.env.RABBITMQ_QUEUE || 'notifications_queue',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'localhost',
    user: process.env.SMTP_USER || 'user',
    pass: process.env.SMTP_PASS || 'pass',
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
  },
});
