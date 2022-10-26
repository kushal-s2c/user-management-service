// import express from "express";

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hi World");
// });

// app.listen(port, () => {
//   console.log(`Successfully connected on port ${port}`);
// });

import "dotenv/config";
import { Application } from "express";
import server from "./server";
import db from "./db";
import logger from "./core-shared-service/utils/logger";

// /** Connect to Mongo */

db.connect()
  .then(() => {
    console.log("Connected");
    logger.info("Connected to mongoDB!");
  })
  .catch((err) => {
    console.log("ERR", err);
    logger.error("Error connecting to mongoDB!", err.message, err);
  });

const app: Application = server();
const port: number = parseInt(<string>process.env.NODE_PORT, 10) || 8088;

app.listen(port, () => {
  console.log("Server running", port);
  logger.info(`Server is running at port ${port}`);
});

export default app;
