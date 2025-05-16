import type {Product} from "../domain/Product.ts";

const API_URL = "https://fakestoreapi.com";

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error("Couldn't fetch products");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error to get products: " + (error as Error).message);
    }
}

export async function fetchProductById(id: number): Promise<Product> {
    try{
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error("Couldn't fetch product");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw new Error("Error to get product: " + (error as Error).message);
    }
}