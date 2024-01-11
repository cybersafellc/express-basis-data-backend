import response from "../responses/response.js";
import user from "../models/user.js";
import Jwt from "jsonwebtoken";
import parts from "../models/parts.js";
import pelanggan from "../models/pelanggan.js";
import kendaraan from "../models/kendaraan.js";
import bon_pembayaran from "../models/bon_pembayaran.js";
import transaksi from "../models/transaksi.js";
import date from "date-and-time";

export const Logins = async (req, res) => {
  try {
    const { username, password } = await req.body;
    if (username && password) {
      const Datausername = await user.findAll({
        where: { username: username },
      });
      if (Datausername[0].username) {
        if (
          Datausername[0].username === username &&
          Datausername[0].password === password
        ) {
          const token = await Jwt.sign(
            { username: username },
            process.env.ADMIN_SECRET
          );
          return response(200, "login success", { token }, res);
        } else {
          return response(401, "password incorect", false, res);
        }
      } else {
        return response(401, "username not register", false, res);
      }
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const tokenVerify = async (req, res) => {
  try {
    return response(
      200,
      "accept access",
      { username: await req.username },
      res
    );
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const viewPart = async (req, res) => {
  try {
    const partsData = await parts.findAll();
    return response(200, "successfuly request", partsData, res);
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const addPart = async (req, res) => {
  try {
    const { sparePart, harga } = await req.body;
    if (sparePart && harga) {
      const dataPart = await parts.findAll();
      const number = (await dataPart.length) + 1;
      const kdSparePart = `SP${number}`;
      await parts.create({
        kd_spare_part: kdSparePart,
        spare_parts: sparePart,
        harga: harga,
      });
      return response(200, "successfuly created", true, res);
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const viewPelanggan = async (req, res) => {
  try {
    const dataPelanggan = await pelanggan.findAll();
    return response(200, "successfuly request", dataPelanggan, res);
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const addPelanggan = async (req, res) => {
  try {
    const { namaPelanggan } = await req.body;
    if (namaPelanggan) {
      const dataPelanggan = await pelanggan.findAll();
      const kodePelanggan = dataPelanggan.length + 1;
      await pelanggan.create({
        kd_pelanggan: `PG${kodePelanggan}`,
        nama_pelanggan: namaPelanggan,
      });
      return response(200, "successfuly cretated", true, res);
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const viewKendaraan = async (req, res) => {
  try {
    const dataKendaraan = await kendaraan.findAll();
    return response(200, "successfuly request", dataKendaraan, res);
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const addKenadaraan = async (req, res) => {
  try {
    const { noPolisi, type } = await req.body;
    if (noPolisi && type) {
      await kendaraan.create({ no_polisi: noPolisi, type: type });
      return response(200, "successfuly created", true, res);
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const viewPartId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const dataPartsId = await parts.findAll({ where: { kd_spare_part: id } });
      return response(200, "successfuly request", dataPartsId, res);
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const viewAll = async (req, res) => {
  try {
    const dataPelanggan = await pelanggan.findAll();
    const dataKendaraan = await kendaraan.findAll();
    const dataPart = await parts.findAll();
    return response(
      200,
      "successfuly request",
      {
        dataPelanggan,
        dataKendaraan,
        dataPart,
      },
      res
    );
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const invoiceCreate = async (req, res) => {
  try {
    const { pelanggan, kendaraan, alamat, ongkos, dataItem } = await req.body;
    const now = new Date();
    if (pelanggan && kendaraan && alamat && ongkos && dataItem) {
      const dataBonPembayaran = await bon_pembayaran.findAll();
      const noFaktur = await `NO-${dataBonPembayaran.length + 1}`;
      let totalPembayaran = 0;
      for (let i = 0; i < dataItem.length; i++) {
        await transaksi.create({
          no_faktur: noFaktur,
          kd_spare_part: dataItem[i].kd_spare_part,
          banyak: dataItem[i].qty,
          harga_total: dataItem[i].qty * dataItem[i].harga_satuan,
          ongkos: ongkos,
        });
        totalPembayaran += dataItem[i].qty * dataItem[i].harga_satuan;
      }
      await bon_pembayaran.create({
        no_faktur: noFaktur,
        kd_pelanggan: pelanggan,
        no_polisi: kendaraan,
        alamat: alamat,
        jumlah: totalPembayaran + ongkos,
        tanggal: date.format(now, "YYYY/MM/DD HH:mm:ss"),
      });
      return response(200, "successfuly created", { noFaktur }, res);
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const invoicePrint = async (req, res) => {
  try {
    const { id } = await req.params;
    if (id) {
      const dataBonPembayaran = await bon_pembayaran.findAll({
        where: { no_faktur: id },
      });
      //data pelanggan
      const dataPelanggan = await pelanggan.findAll({
        where: { kd_pelanggan: dataBonPembayaran[0].kd_pelanggan },
      });
      //data kendaraan
      const dataKendaraan = await kendaraan.findAll({
        where: { no_polisi: dataBonPembayaran[0].no_polisi },
      });
      // remap data transaksi
      const dataTransaksi = await transaksi.findAll({
        where: { no_faktur: dataBonPembayaran[0].no_faktur },
      });
      let dataProduk = [];
      for (let i = 0; i < dataTransaksi.length; i++) {
        const dataPart = await parts.findAll({
          where: { kd_spare_part: dataTransaksi[i].kd_spare_part },
        });
        const dataRemap = await {
          spare_part: dataPart[0].spare_parts,
          harga_satuan: dataPart[0].harga,
          jumlah: dataTransaksi[i].banyak,
          harga_total: dataTransaksi[i].harga_total,
        };
        dataProduk = await [...dataProduk, dataRemap];
      }
      //kirim response
      return response(
        200,
        "successfuly requtest",
        {
          no_faktur: dataBonPembayaran[0].no_faktur,
          tanggal: dataBonPembayaran[0].tanggal,
          alamat: dataBonPembayaran[0].alamat,
          pelanggan: dataPelanggan[0],
          kendaraan: dataKendaraan,
          produk: dataProduk,
          pay: {
            ongkos: dataTransaksi[0].ongkos,
            total_pembayaran: dataBonPembayaran[0].jumlah,
          },
        },
        res
      );
    } else {
      return response(401, "data required", false, res);
    }
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};

export const riwayatTransaksi = async (req, res) => {
  try {
    const data = await bon_pembayaran.findAll();
    return response(200, "successfuly request", data, res);
  } catch (error) {
    console.log(error);
    return response(500, "server error", null, res);
  }
};
