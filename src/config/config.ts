import dotenv from "dotenv";

dotenv.config();

interface IMongoOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
  socketTimeoutMS: number;
  keepAlive: boolean;
  autoIndex: boolean;
  retryWrites: boolean;
}

const MONGO_OPTIONS: IMongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.DB_USER || "s2c_dev";
const MONGO_PASSWORD = process.env.DB_PASSWORD || "s2c_dev";
const MONGO_HOST = process.env.DB_HOST || `mongodb`;
const MONGO_PORT = process.env.DB_DOCKER_PORT || 27017;
const MONGO_DB_NAME = process.env.DB_NAME || `s2c_dev`;

let MONGO: {
  host: string;
  password: string;
  username: string;
  options: IMongoOptions;
  url: string;
};

if ((process.env.DB_URL_OVERRIDE || "false") === "true") {
  MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
  };
} else {
  MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?directConnection=true&authSource=admin`,
  };
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const WHITELIST = process.env.SERVER_WHITELIST || ["localhost"];
const UPLOAD_DIR = process.env.UPLOAD_DIR || `/files/uploads`;
const COGNITO_AUTH = process.env.COGNITO_AUTH || false;
const ENV = process.env.NODE_ENV || "dev";
const DOMAIN_NAME = process.env.DOMAIN_NAME || "loacalhost";
const S2C_BACKEND_BASE_URL =
  process.env.S2C_BACKEND_BASE_URL || "http://172.17.0.1:9995";

const PRIVATE_KEY =
  process.env.SERVER_PRIVATE_KEY || `${__dirname}/../keys/gsurvey`;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "thisIsTheJwtSecretKey";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  whiteList: WHITELIST,
  uploadDir: UPLOAD_DIR,
  cognitoAuth: COGNITO_AUTH,
  privateKey: PRIVATE_KEY,
  domainName: DOMAIN_NAME,
  env: ENV,
  s2c_backend_url: S2C_BACKEND_BASE_URL,
};

const LOG = {
  debug: (process.env.DEBUG || "true") === "true",
  level: process.env.LOG_LEVEL || "debug",
  path: `${__dirname}/../../../logs`,
  file: "ticketing-backend-service",
};

const config = {
  mongo: MONGO,
  server: SERVER,
  log: LOG,
  JWT_SECRET_KEY,
};

export default config;
