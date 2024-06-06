import express, { Express } from "express";

import userRoutes from "./routes/user";

const app: Express = express();

const PORT = 4500;

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`[server]: server listening to http://localhost:${PORT}/`);
});
