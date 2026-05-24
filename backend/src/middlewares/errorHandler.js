const logger = require("../utils/logger");

function errorHandler(error, req, res, _next) {
  const status = error.message && error.message.includes("not found") ? 404 : 400;
  logger.error("request_failed", {
    method: req.method,
    path: req.originalUrl,
    status,
    error: error.message || "Unexpected server error"
  });

  res.status(status).json({
    success: false,
    message: error.message || "Unexpected server error"
  });
}

module.exports = errorHandler;
