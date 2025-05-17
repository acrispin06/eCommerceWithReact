import type { CartItem } from '../domain/CartItem'

export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}
