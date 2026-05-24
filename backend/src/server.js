const createApp = require("./app");

const port = process.env.PORT || 4000;

createApp().listen(port, () => {
  console.log(`PetShop API listening on http://localhost:${port}`);
});
