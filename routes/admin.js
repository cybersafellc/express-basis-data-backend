import express, { Router } from "express";
import {
  Logins,
  addKenadaraan,
  addPart,
  addPelanggan,
  invoiceCreate,
  invoicePrint,
  riwayatTransaksi,
  tokenVerify,
  viewAll,
  viewKendaraan,
  viewPart,
  viewPartId,
  viewPelanggan,
} from "../controllers/admin.controller.js";
import adminJwtVerify from "../middlewares/adminJwtVerify.js";

const router = express.Router();
router.post("/login", Logins);
router.use(adminJwtVerify);
router.post("/token/verify", tokenVerify);
router.post("/add/parts", addPart);
router.post("/view/parts", viewPart);
router.post("/view/pelanggan", viewPelanggan);
router.post("/add/pelanggan", addPelanggan);
router.post("/view/kendaraan", viewKendaraan);
router.post("/add/kendaraan", addKenadaraan);
router.post("/view/parts/:id", viewPartId);
router.post("/view", viewAll);
router.post("/invoice/create", invoiceCreate);
router.post("/invoice/print/:id", invoicePrint);
router.post("/riwayat-transaksi", riwayatTransaksi);

export default router;
