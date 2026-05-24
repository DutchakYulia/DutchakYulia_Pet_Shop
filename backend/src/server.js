const createApp = require("./app");
const logger = require("./utils/logger");
const { captureMessage } = require("./utils/sentry");

const port = process.env.PORT || 4000;

createApp().listen(port, () => {
  logger.info("server_started", { url: `http://localhost:${port}` });
  captureMessage("PetShop backend started", { port });
});
