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
import { Delete } from '@mui/icons-material'
import { useCart } from '../cartContext'

export const CartView: React.FC = () => {
    const { cartItems, removeItem, clearCart, getTotal } = useCart()

    const handleCheckout = () => {
        alert('Pasarela de pagos aún no implementada')
    }

    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>
                Tu carrito
            </Typography>

            {cartItems.length === 0 ? (
                <Typography variant="body1">Tu carrito está vacío.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cartItems.map(item => (
                            <Grid size={{ xs: 12, md: 6, lg:4 }}  key={item.id}>
                                <Card sx={{ display: 'flex', gap: 2 }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.title}
                                        sx={{ width: 120, objectFit: 'contain', p: 1 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" noWrap>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                Precio: S/ {item.price.toFixed(2)}
                                            </Typography>
                                            <Typography variant="body2">
                                                Cantidad: {item.quantity}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold">
                                                Subtotal: S/ {(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                    <IconButton onClick={() => removeItem(item.id)}>
                                        <Delete />
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" fontWeight="bold">
                        Total: S/ {getTotal().toFixed(2)}
                    </Typography>

                    <Box mt={2} display="flex" gap={2}>
                        <Button variant="outlined" color="error" onClick={clearCart}>
                            Vaciar carrito
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>
                            Ir a pagar
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}
