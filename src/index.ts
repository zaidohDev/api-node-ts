import "express-async-errors";
import express from "express";
import { AppDataSource } from "./data-source";
import "dotenv";
import routes from "./routes";
import { errorMiddleWare } from "./middlewares/erros";

const port = process.env.SERVER_PORT as number | 8000 | undefined;
AppDataSource.initialize().then(() => {
  console.log("DataBase has been connected");
  const app = express();

  app.use(express.json());

  app.use(routes);

  app.use(errorMiddleWare);

  app.listen(port, () => {
    console.log("Server Running...");
  });
});
