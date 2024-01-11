import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import PageNotFound from "./middlewares/PageNotFound.js";
import database from "./config/database.js";
import routerAdmin from "./routes/admin.js";

try {
  await database.authenticate();
  console.log("database connected");
} catch (error) {
  console.log("error connected to database");
  console.log(error);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/admin", routerAdmin);
app.use(PageNotFound);
export default app;
