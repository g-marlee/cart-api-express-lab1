import { v4 as uuidv4 } from 'uuid';
import { Item } from '../types/items.types';


export const cart: Item[] = [
    {id: uuidv4(), product: "Bananas", price: 2.99, quantity: 6},
    {id: uuidv4(), product: "Flour", price: 4.99, quantity: 1},
    {id: uuidv4(), product: "Eggs", price: 3.29, quantity: 1},
    {id: uuidv4(), product: "Ground beef", price: 7.89, quantity: 2},
]