import type {CartItem} from "./CartItem.ts";

export interface Cart {
    id: number
    userId: number
    products: CartItem[]
}