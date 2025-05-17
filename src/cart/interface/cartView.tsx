import React from 'react'
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Button,
    Grid,
    Divider,
    Stack
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useCart } from '../cartContext'
import { useNavigate } from 'react-router-dom'

export const CartView: React.FC = () => {
    const { cartItems, removeItem, clearCart, getTotal } = useCart()
    const navigate = useNavigate()

    const handleCheckout = () => {
        alert('Proceeding to checkout...')
    }

    return (
        <Box px={4} py={6}>
            <Button variant="outlined" onClick={() => navigate('/products')} sx={{ mb: 3 }}>
                Go back
            </Button>

            <Typography variant="h4" gutterBottom>
                Your shopping cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {cartItems.map(item => (
                            <Grid size={{ xs: 12, md: 6, lg:4}} key={item.id}>
                                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.title}
                                        sx={{
                                            width: { xs: '100%', sm: 140 },
                                            height: { xs: 200, sm: 'auto' },
                                            objectFit: 'contain',
                                            p: 2,
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2">Precio: S/ {item.price.toFixed(2)}</Typography>
                                            <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                Subtotal: S/ {(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </CardContent>
                                        <Box textAlign="right" pr={2} pb={1}>
                                            <IconButton onClick={() => removeItem(item.id)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Box textAlign="right" mb={2}>
                        <Typography variant="h6" fontWeight="bold">
                            Total: S/ {getTotal().toFixed(2)}
                        </Typography>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" color="error" onClick={clearCart}>
                            Empty cart
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>
                            Let's go to checkout
                        </Button>
                    </Stack>
                </>
            )}
        </Box>
    )
}
