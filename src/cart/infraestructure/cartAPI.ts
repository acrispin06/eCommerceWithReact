import type { Cart } from '../domain/Cart'

const BASE_URL = 'https://fakestoreapi.com/carts'

export async function fetchAllCarts(): Promise<Cart[]> {
    const res = await fetch(BASE_URL)
    if (!res.ok) throw new Error('Error al obtener los carritos')
    return await res.json()
}

export async function fetchCartById(id: number): Promise<Cart> {
    const res = await fetch(`${BASE_URL}/${id}`)
    if (!res.ok) throw new Error(`Error al obtener el carrito ${id}`)
    return await res.json()
}

export async function createCart(cart: Omit<Cart, 'id'>): Promise<Cart> {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
    })
    if (!res.ok) throw new Error('Error al crear el carrito')
    return await res.json()
}

export async function updateCart(id: number, cart: Omit<Cart, 'id'>): Promise<Cart> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
    })
    if (!res.ok) throw new Error('Error al actualizar el carrito')
    return await res.json()
}

export async function deleteCart(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Error al eliminar el carrito')
}
