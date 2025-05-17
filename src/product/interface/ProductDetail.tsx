import React from 'react'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Box,
    Rating
} from '@mui/material'
import type {Product} from "../domain/Product.ts";
import { useCart } from '../../cart/cartContext.tsx'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../application/fetchProducts.ts";

interface Props {
    product: Product
    onBack: () => void
}

export const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
    const { addItem } = useCart()

    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllProducts().then(all => {
            const related = all.filter(
                p => p.category === product.category && p.id !== product.id
            )
            setRelatedProducts(related)
        })
    }, [product])

    return (
        <Box padding={4}>
            <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
                Go back
            </Button>

            <Typography variant="h4" gutterBottom>
                Product Details
            </Typography>

            <Card sx={{ padding: 2 }}>
                <Grid container spacing={3}>
                    {/* Image */}
                    <Grid size={{ xs: 12, md: 5}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={product.image}
                            alt={product.title}
                            sx={{ objectFit: 'contain', padding: 2 }}
                        />
                    </Grid>

                    {/* Details */}
                    <Grid size={{ xs: 12, md: 7}}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {product.title}
                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Categoría: {product.category}
                            </Typography>

                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
                                S/ {product.price.toFixed(2)}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <Rating
                                    name="read-only"
                                    value={product.rating?.rate || 0}
                                    precision={0.1}
                                    readOnly
                                />
                                <Typography variant="body2" color="text.secondary">
                                    ({product.rating?.count ?? 0} valoraciones)
                                </Typography>
                            </Box>

                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addItem({ ...product, quantity: 1 })}
                            >
                                Add to shopping cart
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

            {relatedProducts.length > 0 && (
                <Box mt={5}>
                    <Typography variant="h6" gutterBottom>
                        Related products
                    </Typography>

                    <Grid container spacing={2}>
                        {relatedProducts.map(rp => (
                            <Grid size={{ xs: 12, md:4, sm:6, lg:3 }} key={rp.id}>
                                <Card
                                    onClick={() => navigate(`/products/${rp.id}`)}
                                    sx={{ cursor: 'pointer', height: '100%' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={rp.image}
                                        alt={rp.title}
                                        sx={{ objectFit: 'contain', p: 2 }}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle1" noWrap>
                                            {rp.title}
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold">
                                            S/ {rp.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

        </Box>
    )
}
