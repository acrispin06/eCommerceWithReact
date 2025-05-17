import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Rating,
    Typography,
    IconButton
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { useCart } from '../../cart/cartContext'
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '../application/fetchProducts'
import type { Product } from '../domain/Product'

interface Props {
    product: Product
    onBack: () => void
}

export const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
    const { addItem } = useCart()
    const [quantity, setQuantity] = useState(1)
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

    const increaseQty = () => setQuantity(prev => prev + 1)
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

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
                    <Grid size={{ xs: 12, md: 5}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={product.image}
                            alt={product.title}
                            sx={{ objectFit: 'contain', padding: 2 }}
                        />
                    </Grid>

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

                            {/* Quantity controls */}
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <IconButton onClick={decreaseQty} color="primary">
                                    <Remove />
                                </IconButton>
                                <Typography>{quantity}</Typography>
                                <IconButton onClick={increaseQty} color="primary">
                                    <Add />
                                </IconButton>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addItem({ ...product, quantity })}
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
                            <Grid size={{ xs: 12, md: 4, sm:6, lg:3}} key={rp.id}>
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