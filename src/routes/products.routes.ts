import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers";
import { verifyToken } from "../middlewares/auth.middleware";

export const productsRouter = Router();

productsRouter.get("/", verifyToken, getProducts);
productsRouter.get("/:id", verifyToken, getProduct);
productsRouter.post("/", verifyToken, createProduct);
productsRouter.put("/:id", verifyToken, updateProduct);
productsRouter.delete("/:id", verifyToken, deleteProduct);
