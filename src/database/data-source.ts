import { DataSource } from "typeorm";
import { dbConnectParameter } from "../configs/db.config";

const { host, db, port, user, password, logging, sync } = dbConnectParameter;

const datasource = new DataSource({
  type: "postgres",
  host: host,
  port: port,
  username: user,
  password: password,
  database: db,
  entities: ["src/models/*.ts"],
  logging: logging,
  synchronize: sync,
});

export { datasource };
