import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../application/fetchProducts'
import type { Product } from '../domain/Product.ts'
import { ProductCard } from './ProductCard'
import { Grid } from '@mui/material'

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        getAllProducts().then(setProducts)
    }, [])

    return (
        <Grid container spacing={3} padding={4}>
            {products.map((product: Product) => (
                <Grid  size={{ xs: 12, md: 4, sm: 6, lg:3 }} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}
