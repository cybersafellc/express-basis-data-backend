import { Sequelize } from "sequelize";
import database from "../config/database.js";

const { DataTypes } = Sequelize;
const user = database.define(
  "user",
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { freezeTableName: true }
);
export default user;
