import express from "express";
import { cart } from "../data/cart";
import { Item } from "../types/items.types";
import { v4 as uuidv4 } from "uuid";

export const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    if (req.query.maxPrice && !req.query.prefix && !req.query.pageSize) {
        const maxPrice = Number(req.query.maxPrice);
        res.json(cart.filter(item => item.price <= maxPrice));        
    } else if (req.query.maxPrice && req.query.prefix && !req.query.pageSize) {
        const maxPrice = Number(req.query.maxPrice);
        const prefix = String(req.query.prefix);
        const newCart = cart.filter(item => item.product.startsWith(prefix));
        res.json(newCart.filter(item => item.price <= maxPrice));
    } else if (req.query.maxPrice && req.query.pageSize && !req.query.prefix) {
        const maxPrice = Number(req.query.maxPrice);
        const pageSize = Number(req.query.pageSize);
        const newCart = cart.filter(item => item.price <= maxPrice);
        res.json(newCart.slice(0, pageSize));
    } else if (req.query.prefix && !req.query.maxPrice && !req.query.pageSize) {
        const prefix = String(req.query.prefix);
        res.json(cart.filter(item => item.product.startsWith(prefix)));        
    } else if (req.query.prefix && req.query.pageSize && !req.query.maxPrice) {
        const prefix = String(req.query.prefix);
        const pageSize = Number(req.query.pageSize);
        const newCart = cart.filter(item => item.product.startsWith(prefix));
        res.json(newCart.slice(0, pageSize));
    } else if (req.query.pageSize && !req.query.prefix && !req.query.maxPrice) {
        const pageSize = Number(req.query.pageSize);
        res.json(cart.slice(0, pageSize));
    } else if (req.query.pageSize && req.query.prefix && req.query.pageSize) {
        const maxPrice = Number(req.query.maxPrice);
        const prefix = String(req.query.prefix);
        const pageSize = Number(req.query.pageSize);

        const newCart = cart.filter(item => item.product.startsWith(prefix));
        const newerCart = newCart.filter(item => item.price <= maxPrice);
        res.json(newerCart.slice(0, pageSize));
    }
    res.json(cart);
});

cartRouter.get('/:id', (req, res) => {
    const item = cart.find(items => items.id === req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send(`ID Not Found`);
    };
});

cartRouter.post('/', (req, res) => {
    const newItem: Item = {id: uuidv4(), ...req.body};
    cart.push(newItem);
    res.sendStatus(201);
    res.json(newItem);
});

cartRouter.put('/:id', (req, res) => {
    const item = cart.find(items => items.id === req.params.id);
    const itemIndex = cart.findIndex(items => items.id === req.params.id);

    const updatedItem = {...item, ...req.body};

    cart.splice(itemIndex, 1, updatedItem);

    res.json(updatedItem);
});

cartRouter.delete('/:id', (req, res) => {
    const item = cart.find(items => items.id === req.params.id);
    const itemIndex = cart.findIndex(items => items.id === req.params.id);

    cart.splice(itemIndex, 1);

    res.sendStatus(204);
});