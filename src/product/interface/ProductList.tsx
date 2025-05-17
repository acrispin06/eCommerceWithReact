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
    Typography,
    Slider,
    Paper,
    Divider
} from '@mui/material'

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState<number[]>([0, 20000])
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        getAllProducts().then(setProducts)
    }, [])

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === '' || product.category === category) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating-asc':
                return (a.rating?.rate || 0) - (b.rating?.rate || 0);
            case 'rating-desc':
                return (b.rating?.rate || 0) - (a.rating?.rate || 0);
            case 'reviews-asc':
                return (a.rating?.count || 0) - (b.rating?.count || 0);
            case 'reviews-desc':
                return (b.rating?.count || 0) - (a.rating?.count || 0);
            default:
                return 0;
        }
    });


    return (
        <Box padding={4}>
            <Typography variant="h5" gutterBottom>Filter Products</Typography>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
                <Grid container spacing={2}>
                    <Grid size={{xs:12,md:4}}>
                        <TextField
                            fullWidth
                            label="Search Product"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>

                    <Grid size={{xs:12,md:4}}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                label="Category"
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

                    <Grid size={{xs:12,md:4}}>
                        <Typography gutterBottom>Price range (S/)</Typography>
                        <Slider
                            value={priceRange}
                            onChange={(_e, newValue) => setPriceRange(newValue as number[])}
                            valueLabelDisplay="auto"
                            min={0}
                            max={2000}
                            step={1}
                        />
                    </Grid>

                    <Grid size={{xs:12,md:4}}>
                        <FormControl fullWidth>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortOption}
                                label="Sort By"
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                                <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
                                <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
                                <MenuItem value="reviews-asc">Reviews: Low to High</MenuItem>
                                <MenuItem value="reviews-desc">Reviews: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" gutterBottom>Products</Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={3}>
                {sortedProducts.map((product: Product) => (
                    <Grid size={{xs:12,md:4,sm:6,lg:3}} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}