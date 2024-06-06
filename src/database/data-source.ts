import { DataSource } from "typeorm";

export const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "cat123",
  database: "ems_db",
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});
