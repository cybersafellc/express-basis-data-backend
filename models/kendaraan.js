import { Sequelize } from "sequelize";
import database from "../config/database.js";

const { DataTypes } = Sequelize;
const kendaraan = database.define(
  "kendaraan",
  {
    no_polisi: DataTypes.STRING,
    type: DataTypes.STRING,
  },
  { freezeTableName: true, timestamps: false }
);
kendaraan.removeAttribute("id");
export default kendaraan;
