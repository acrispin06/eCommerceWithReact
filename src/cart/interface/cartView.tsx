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
    Divider
} from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'
import { useCart } from '../cartContext'
import { useNavigate } from 'react-router-dom'

export const CartView: React.FC = () => {
    const { cartItems, addItem, decreaseItemQuantity, removeItem, clearCart, getTotal } = useCart()
    const navigate = useNavigate()

    const handleCheckout = () => {
        alert('Proceeding to checkout...')
    }

    return (
        <Box padding={4}>
            <Button variant="outlined" onClick={() => navigate('/products')} sx={{ mb: 2 }}>
                Go back
            </Button>

            <Typography variant="h4" gutterBottom>
                Your shopping cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cartItems.map(item => (
                            <Grid size={{xs:12, md:6, lg:4}} key={item.id}>
                                <Card sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.title}
                                        sx={{ width: 100, objectFit: 'contain', p: 1 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <CardContent sx={{ paddingBottom: '8px' }}>
                                            <Typography variant="subtitle1" noWrap>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                Precio: S/ {item.price.toFixed(2)}
                                            </Typography>
                                            <Box mt={1} display="flex" alignItems="center" gap={1}>
                                                <IconButton size="small" onClick={() => decreaseItemQuantity(item.id)}>
                                                    <Remove />
                                                </IconButton>
                                                <Typography>{item.quantity}</Typography>
                                                <IconButton size="small" onClick={() => addItem({ ...item, quantity: 1 })}>
                                                    <Add />
                                                </IconButton>
                                            </Box>
                                            <Typography fontWeight="bold">
                                                Subtotal: S/ {(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                    <IconButton onClick={() => removeItem(item.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button variant="outlined" color="error" onClick={clearCart}>
                            Empty cart
                        </Button>
                        <Typography variant="h6" fontWeight="bold">
                            Total: S/ {getTotal().toFixed(2)}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>
                            Let's go to checkout
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}
