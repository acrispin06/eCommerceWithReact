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

interface Props {
    product: Product
    onBack: () => void
}

export const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
    const { addItem } = useCart()

    return (
        <Box padding={4}>
            <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
                Volver
            </Button>

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
                                Agregar al carrito
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}
