const express = require("express");
const colors = require("colors");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const cookieParser = require("cookie-parser");
const NotFoundHandler = require("./src/common/expansion/nutFund-handller");
const AllExpansionHandler = require("./src/common/expansion/all-expansion.handller");
require("dotenv").config();

async function main() {
  const app = express();
  const PORT = process.env.PORT;
  require("./src/config/mongodb.config");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KAY))
  app.use(mainRouter);
  swaggerConfig(app);
  NotFoundHandler(app);
  AllExpansionHandler(app);
  app.listen(PORT, () => {
    console.log(`server run: http://localhost:${PORT}`.blue);
  });
}
main();
