const logger = require("../utils/logger");
const { captureException } = require("../utils/sentry");

function errorHandler(error, req, res, _next) {
  const status = error.status || error.statusCode || (error.message && error.message.includes("not found") ? 404 : 400);
  const message = status >= 500 ? "Internal server error" : error.message || "Unexpected server error";
  logger.error("request_failed", {
    method: req.method,
    path: req.originalUrl,
    status,
    error: error.message || "Unexpected server error",
    stack: error.stack
  });
  captureException(error, {
    method: req.method,
    path: req.originalUrl,
    status
  });

  res.status(status).json({
    success: false,
    message
  });
}

module.exports = errorHandler;
