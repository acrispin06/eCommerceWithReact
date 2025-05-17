import type { CartItem } from '../domain/CartItem'

export function addToCart(cart: CartItem[], item: CartItem): CartItem[] {
    const existing = cart.find(p => p.id === item.id)
    if (existing) {
        return cart.map(p =>
            p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        )
    }
    return [...cart, item]
}