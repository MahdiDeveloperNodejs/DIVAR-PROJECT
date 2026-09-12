const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;
const colors = require("colors");

async function ConfigMongodb() {
  await mongoose
    .connect(URL)
    .then(() => console.log(colors.green("Mongodb Connected")))
    .catch((err) => {
      console.log(err?.message ?? "Failed Db connect");
    });
}

ConfigMongodb();

module.exports = ConfigMongodb;