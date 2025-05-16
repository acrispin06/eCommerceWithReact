import {fetchAllProducts} from "../infraestructure/productAPI.ts";
import type {Product} from "../domain/Product.ts";

export async function getAllProducts(): Promise<Product[]> {
    return fetchAllProducts()
}