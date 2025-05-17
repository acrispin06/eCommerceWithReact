import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CartItem } from './domain/CartItem'
import { addToCart } from './application/addToCart'
import { removeFromCart } from './application/removeFromCart'
import { getCartTotal } from './application/getCartTotal'

interface CartContextType {
    cartItems: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (productId: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
    decreaseItemQuantity: (productId: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

const CART_STORAGE_KEY = 'cart_items'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const saved = localStorage.getItem(CART_STORAGE_KEY)
        if (saved) setCartItems(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }, [cartItems])

    const addItem = (item: CartItem) => {
        setCartItems(prev => addToCart(prev, item))
    }

    const removeItem = (productId: number) => {
        setCartItems(prev => removeFromCart(prev, productId))
    }

    const decreaseItemQuantity = (productId: number) => {
        setCartItems(prev => {
            return prev.flatMap(item => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        return [{ ...item, quantity: item.quantity - 1 }]
                    } else {
                        // Si es 1, lo eliminamos del carrito
                        return []
                    }
                }
                return [item]
            })
        })
    }


    const clearCart = () => setCartItems([])

    const getTotal = () => getCartTotal(cartItems)

    const getItemCount = () => cartItems.reduce((acc, item) => acc + item.quantity, 0)


    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, getTotal, getItemCount, decreaseItemQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}