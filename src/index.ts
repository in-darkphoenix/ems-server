import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Express } from "express-serve-static-core";
import cors from "cors";

import accountRoutes from "./routes/account.routes";
import categoryRoutes from "./routes/category.routes";
import { datasource } from "./database/data-source";
import { appInfo } from "./configs/app.config";
import { dbConnectParameter } from "./configs/db.config";

const app: Express = express();

const PORT = appInfo.port;
const DB = dbConnectParameter.db;
const allowedOrigins = ["http://localhost:4200"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

app.use("/api/accounts", accountRoutes);
app.use("/api/categories", categoryRoutes);

datasource
  .initialize()
  .then(() => {
    console.log(
      `[database]: Connection with ${DB} has been established successfully!!`
    );
  })
  .catch((err: Error) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(PORT, () => {
  console.log(`[server]: server listening to http://localhost:${PORT}/`);
});
