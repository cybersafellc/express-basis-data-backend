import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();
const server = http.createServer(app);
server.listen(process.env.APP_PORT, () => {
  console.log("server running on port : " + process.env.APP_PORT);
});
