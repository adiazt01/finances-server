import { Router } from "express";

import {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
} from "../controllers/sale.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

const salesRouter = Router();

salesRouter.get("/", verifyToken, getSales);
salesRouter.get("/:id", verifyToken, getSale);
salesRouter.post("/", verifyToken, createSale);
salesRouter.put("/:id", verifyToken, updateSale);
salesRouter.delete("/:id", verifyToken, deleteSale);
