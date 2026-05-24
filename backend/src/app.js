require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const createContainer = require("./config/appContainer");
const createRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");

function createApp() {
  const app = express();
  const container = createContainer();

  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
  app.use(express.json());
  app.use(morgan("combined", {
    stream: {
      write: (message) => logger.info("http_request", { request: message.trim() })
    }
  }));
  app.use("/api", createRoutes(container));
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
