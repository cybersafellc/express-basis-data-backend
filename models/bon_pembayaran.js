import database from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize;
const bon_pembayaran = database.define(
  "bon_pembayaran",
  {
    no_faktur: DataTypes.STRING,
    kd_pelanggan: DataTypes.STRING,
    no_polisi: DataTypes.STRING,
    alamat: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
  },
  { timestamps: false, freezeTableName: true }
);
bon_pembayaran.removeAttribute("id");
export default bon_pembayaran;
