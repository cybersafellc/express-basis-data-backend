import { Sequelize } from "sequelize";
import database from "../config/database.js";

const { DataTypes } = Sequelize;

const pelanggan = database.define(
  "pelanggan",
  {
    kd_pelanggan: DataTypes.STRING,
    nama_pelanggan: DataTypes.STRING,
  },
  { freezeTableName: true, timestamps: false }
);
pelanggan.removeAttribute("id");
export default pelanggan;
