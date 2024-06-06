import express from "express";
import { Express } from "express-serve-static-core";

import accountRoutes from "./routes/account.routes";
import { datasource } from "./database/data-source";

const app: Express = express();

const PORT = 4500;
const DB = "ems_db";

app.use(express.json());

app.use("/api/accounts", accountRoutes);

datasource
  .initialize()
  .then(() => {
    console.log(
      `[database]: Connection with ${DB} has been established successfully!!`
    );

    app.listen(PORT, () => {
      console.log(`[server]: server listening to http://localhost:${PORT}/`);
    });
  })
  .catch((err: Error) => {
    console.error("Error during Data Source initialization:", err);
  });
