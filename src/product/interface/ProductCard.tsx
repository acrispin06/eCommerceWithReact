import React from 'react'
import {Card, CardMedia, CardContent, Typography, CardActionArea, Button, Box} from '@mui/material'
import type {Product} from "../domain/Product.ts"
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../cart/cartContext.tsx'

interface Props {
    product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    const navigate = useNavigate()
    const { addItem } = useCart()

    return (
        <Card sx={{ maxWidth: 300, height: '100%', margin: 'auto' }} onClick={() => navigate(`/products/${product.id}`)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    height="140"
                    sx={{ objectFit: 'contain', padding: 2 }}
                />

                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                    </Typography>
                    <Typography variant="body1" color="text.primary" noWrap sx={{ fontWeight: 'bold' }}>
                        S/. {product.price.toFixed(2)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Box display="flex" justifyContent="center" pb={2}>
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={(e) => {
                        e.stopPropagation() // ← evita que dispare la navegación
                        addItem({ ...product, quantity: 1 })
                    }}
                >
                    Agregar al carrito
                </Button>
            </Box>
        </Card>
    )
}