import database from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;
const transaksi = database.define(
  "transaksi",
  {
    no_faktur: DataTypes.STRING,
    kd_spare_part: DataTypes.STRING,
    banyak: DataTypes.INTEGER,
    harga_total: DataTypes.INTEGER,
    ongkos: DataTypes.INTEGER,
  },
  { freezeTableName: true, timestamps: false }
);
transaksi.removeAttribute("id");
export default transaksi;
