import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../application/fetchProducts'
import type {Product} from "../domain/Product.ts";

interface Props {
    onSelectProduct: (product: Product) => void
}

export const ProductList: React.FC<Props> = ({ onSelectProduct }) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        getAllProducts().then(setProducts)
    }, [])

    return (
        <div style={styles.grid}>
            {products.map(product => (
                <div
                    key={product.id}
                    style={styles.card}
                    onClick={() => onSelectProduct(product)}
                >
                    <img src={product.image} alt={product.title} style={styles.image} />
                    <h3 style={styles.title}>{product.title}</h3>
                    <p style={styles.price}>S/ {product.price.toFixed(2)}</p>
                </div>
            ))}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        padding: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s'
    },
    image: {
        height: '140px',
        width: '80%',
        objectFit: 'contain',
        marginBottom: '12px'
    },
    title: {
        fontSize: '16px',
        height: '40px',
        overflow: 'hidden',
        padding: '12px',
        color: '#000000',
    },
    price: {
        fontWeight: 'bold',
        color: '#2c3e50'
    },
}
