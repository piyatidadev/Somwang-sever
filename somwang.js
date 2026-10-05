const express = require("express"),
  app = express(),
  APP_CONFIG = require("./configs/app");

require("./configs/express")(app);
require("./routes")(app);

// On Vercel the app runs as a serverless function, so it must be exported instead of listening on a port
if (!process.env.VERCEL) {
  app.listen(APP_CONFIG.port, () => {
    console.log(`Server is running on port ${APP_CONFIG.port}.`);
  });
}

module.exports = app;
