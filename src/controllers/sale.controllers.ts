import { Request, Response } from "express";
import { Sale } from "../models/Sell";
import { Product } from "../models/Product";

export const createSale = async (req: Request, res: Response) => {
  const { userId } = req;
  const { productId, quantity } = req.body;
  try {
    const foundProduct = await Product.findOne({ where: { id: productId } });
    if (!foundProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    const newSale = await Sale.create({
      productId,
      quantity,
      total: foundProduct.price * quantity,
      userId,
    });
    res.json({ message: "Sale created", sale: newSale });
  } catch (error) {}
};

export const getSales = async (req: Request, res: Response) => {
  const { userId } = req;
  try {
    const salesFound = await Sale.findAll({ where: { userId } });
    res.json({ sales: salesFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const saleFound = await Sale.findOne({ where: { id, userId } });
    res.json({ sale: saleFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const { userId } = req;
  try {
    const saleFound = await Sale.findOne({ where: { id, userId } });
    if (saleFound) {
      const foundProduct = await Product.findOne({
        where: { id: saleFound.productId },
      });
      if (!foundProduct) {
        res.status(404).json({ message: "Product not found" });
      }
      await saleFound.update({
        quantity,
        total: foundProduct.price * quantity,
      });
      res.json({ message: "Sale updated", sale: saleFound });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const saleFound = await Sale.findOne({ where: { id, userId } });
    if (saleFound) {
      await saleFound.destroy();
      res.json({ message: "Sale deleted" });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Coming soon 🥵👌
export const getSalesByDate = async (req: Request, res: Response) => {};

export const getSalesByProduct = async (req: Request, res: Response) => {};

export const getSalesByUser = async (req: Request, res: Response) => {};

export const getSalesByCategory = async (req: Request, res: Response) => {};

export const getSalesByProductAndDate = async (
  req: Request,
  res: Response
) => {};

export const getSalesByCategoryAndDate = async (
  req: Request,
  res: Response
) => {};

export const getSalesByUserAndDate = async (req: Request, res: Response) => {};
