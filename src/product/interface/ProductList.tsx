import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../application/fetchProducts'
import type { Product } from '../domain/Product'
import { ProductCard } from './ProductCard'
import {
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material'

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [minPrice, setMinPrice] = useState(0)

    useEffect(() => {
        getAllProducts().then(setProducts)
    }, [])

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || product.category === category) &&
        product.price >= minPrice
    )

    return (
        <Box padding={4}>
            <Typography variant="h5" gutterBottom>List of Products</Typography>

            {/* Filtros */}
            <Grid container spacing={2} marginBottom={3}>
                <Grid size={{ xs: 12, md: 4}}>
                    <TextField
                        fullWidth
                        label="Search Product"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category Name"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="men's clothing">Men's clothing</MenuItem>
                            <MenuItem value="women's clothing">Women's clothing</MenuItem>
                            <MenuItem value="jewelery">Jewelery</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4}}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Minimum Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3} padding={4}>
                {filteredProducts.map((product: Product) => (
                    <Grid size={{ xs: 12, md: 4, sm:6, lg:3}} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}