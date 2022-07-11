import express from "express";
import { cart } from "../data/cart";
import { Item } from "../types/items.types";
import { v4 as uuidv4 } from "uuid";

export const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    res.json(cart);
});