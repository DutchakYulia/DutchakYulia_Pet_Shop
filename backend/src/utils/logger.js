const fs = require("fs");
const path = require("path");
const winston = require("winston");

const logsDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDir, "app.log"),
      level: "info"
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error"
    })
  ]
});

module.exports = logger;
