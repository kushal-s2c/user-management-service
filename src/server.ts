import expres, { Application } from "express";
// import cookieParser from "cookie-parser";

import bodyParser from "body-parser";
// import routes from "./api/v1/routes/index";

export default function server() {
  const app: Application = expres();

  /** Parse the body of the request */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  //   app.use(cookieParser());

  /** Rules of our API */
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes go here */
  //   app.use("/v1", routes);

  app.get("/", async (req, res) => {
    res.status(200).send("Server is healthy!");
  });

  return app;
}
