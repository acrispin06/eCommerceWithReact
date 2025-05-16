import React from 'react'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Box
} from '@mui/material'
import type {Product} from "../domain/Product.ts";

interface Props {
    product: Product
    onBack: () => void
}

export const ProductDetail: React.FC<Props> = ({ product, onBack }) => {
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

                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>

                            <Button variant="contained" color="primary">
                                Agregar al carrito
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}
