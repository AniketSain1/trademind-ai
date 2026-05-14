import express from "express";
import { fetchStock, getHistory } from "../controllers/stock.controller.js";

const router = express.Router();

router.get("/history", getHistory);
router.get("/:symbol", fetchStock);

export default router; // ✅ MUST EXIST