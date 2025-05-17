import type { Cart } from '../domain/Cart'

export function getCartByUser(carts: Cart[], userId: number): Cart | undefined {
    return carts.find(cart => cart.userId === userId)
}
