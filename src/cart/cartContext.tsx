import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CartItem } from './domain/CartItem'

interface CartContextType {
    cartItems: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (productId: number) => void
    clearCart: () => void
    getTotal: () => number
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
        setCartItems(prev => {
            const found = prev.find(p => p.id === item.id)
            if (found) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeItem = (productId: number) => {
        setCartItems(prev => prev.filter(p => p.id !== productId))
    }

    const clearCart = () => setCartItems([])

    const getTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, getTotal }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}