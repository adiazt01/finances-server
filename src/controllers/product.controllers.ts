import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const productFound = await Product.findOne({ where: { id, userId } });
    res.json({ product: productFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const { userId } = req;
  try {
    const productsFound = await Product.findAll({ where: { userId } });
    res.json({ products: productsFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description = "", price, category = "" } = req.body;
  const { userId } = req;
  console.log(userId);
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      userId,
    });
    res.json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description = "", price, category = "" } = req.body;
  const { userId } = req;
  try {
    const productFound = await Product.findOne({ where: { id, userId } });
    if (productFound) {
      await productFound.update({
        name,
        description,
        price,
        category,
      });
      res.json({ message: "Product updated", product: productFound });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/**
 * Deletes a product with the given id and userId.
 * @param req - The request object containing the id and userId.
 * @param res - The response object to send the result.
 * @returns A JSON response indicating success or failure.
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const productFound = await Product.findOne({ where: { id, userId } });
    if (productFound) {
      await productFound.destroy();
      res.json({ message: "Product deleted", product: productFound });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/**
 * Retrieves all products from a specific category for a given user.
 * @async
 * @function getProductsByCategory
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>} - The Promise object representing the completion of the operation.
 */
export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const { userId } = req;
  try {
    const productsFound = await Product.findAll({
      where: { category, userId },
    });
    res.json({ products: productsFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/**
 * Retrieves all products with a given price and belonging to a specific user.
 * @param req - The request object containing the price parameter and user ID.
 * @param res - The response object to send the retrieved products.
 * @returns A JSON object containing the retrieved products.
 */
export const getProductsByPrice = async (req: Request, res: Response) => {
  const { price } = req.params;
  const { userId } = req;
  try {
    const productsFound = await Product.findAll({ where: { price, userId } });
    res.json({ products: productsFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
