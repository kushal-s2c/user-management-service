import mongoose from "mongoose";
import config from "./config/config";

const mongoURL = config.mongo.url;

function connect() {
  console.log("heya", process.env.DB_URL_OVERRIDE);
  return new Promise((resolve, reject) => {
    console.log("MONGOURL", mongoURL);
    mongoose
      .connect(mongoURL, config.mongo.options)
      .then((res) => {
        console.log("ress", res);
        resolve(res);
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
}

async function close() {
  return mongoose.disconnect();
}

export default {
  connect,
  close,
};
