import { IDBConnect } from "../types/db_connection";

const dbConnectParameter: IDBConnect = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db: process.env.DB_NAME,
  logging: process.env.DB_LOGGING === "true" ? true : false,
  sync: process.env.DB_SYNC === "true" ? true : false,
};

export { dbConnectParameter };
