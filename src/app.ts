import express from "express";
import { usersRouter } from "./routes/users.routes";
import { productsRouter } from "./routes/products.routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', usersRouter)
app.use('/api/products', productsRouter)