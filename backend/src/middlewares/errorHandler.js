function errorHandler(error, req, res, _next) {
  const status = error.message && error.message.includes("not found") ? 404 : 400;
  res.status(status).json({
    success: false,
    message: error.message || "Unexpected server error"
  });
}

module.exports = errorHandler;
