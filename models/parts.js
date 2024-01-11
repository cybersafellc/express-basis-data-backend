import database from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;
const parts = database.define(
  "parts",
  {
    kd_spare_part: DataTypes.STRING,
    spare_parts: DataTypes.STRING,
    harga: DataTypes.INTEGER,
  },
  { timestamps: false, freezeTableName: true }
);
parts.removeAttribute("id");
export default parts;
