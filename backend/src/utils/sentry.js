const Sentry = require("@sentry/node");
const logger = require("./logger");

function initSentry(app) {
  if (!process.env.SENTRY_DSN) {
    logger.warn("sentry_disabled", { reason: "SENTRY_DSN is not configured" });
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0)
  });

  logger.info("sentry_initialized");
}

function attachSentryErrorHandler(app) {
  if (!process.env.SENTRY_DSN || typeof Sentry.setupExpressErrorHandler !== "function") {
    return;
  }

  Sentry.setupExpressErrorHandler(app);
}

function captureException(error, context = {}) {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.withScope((scope) => {
    Object.entries(context).forEach(([key, value]) => {
      scope.setExtra(key, value);
    });
    Sentry.captureException(error);
  });
}

function captureMessage(message, context = {}) {
  if (!process.env.SENTRY_DSN) {
    return;
  }

  Sentry.withScope((scope) => {
    Object.entries(context).forEach(([key, value]) => {
      scope.setExtra(key, value);
    });
    Sentry.captureMessage(message);
  });
}

module.exports = {
  initSentry,
  attachSentryErrorHandler,
  captureException,
  captureMessage
};
