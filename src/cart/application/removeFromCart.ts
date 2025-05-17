import type { CartItem } from '../domain/CartItem'

export function removeFromCart(cart: CartItem[], productId: number): CartItem[] {
    return cart.filter(item => item.id !== productId)
}
