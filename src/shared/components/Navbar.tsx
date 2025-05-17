import React, { useState } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Box,
    Drawer,
    List,
    ListItem,
    Divider,
    Button
} from '@mui/material'
import { ShoppingCart, AccountCircle, Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { useCart } from '../../cart/cartContext'

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    const [ drawerOpen, setDrawerOpen ] = useState(false)
    const { cartItems, getTotal, getItemCount, addItem, removeItem, clearCart, decreaseItemQuantity } = useCart()

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <>
            <AppBar position="sticky" sx={{ backgroundColor: '#212121' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        Welcome back, {user?.name.firstname}
                    </Typography>

                    <Box>
                        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                            <Badge badgeContent={getItemCount()} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>

                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem disabled>{user?.email}</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 400, padding: 2 }}>
                    <Typography variant="h6" gutterBottom>Your Cart</Typography>

                    {cartItems.length === 0 ? (
                        <Typography variant="body2">Your cart is empty</Typography>
                    ) : (
                        <>
                            <List>
                                {cartItems.map(item => (
                                    <ListItem key={item.id} alignItems="flex-start" divider>
                                        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                                            {/* Image */}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{ width: 64, height: 64, objectFit: 'contain' }}
                                            />

                                            {/* Details */}
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle2" noWrap>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2">
                                                    S/ {item.price.toFixed(2)} x {item.quantity}
                                                </Typography>
                                                <Typography variant="body2" fontWeight="bold">
                                                    Subtotal: S/ {(item.price * item.quantity).toFixed(2)}
                                                </Typography>

                                                {/* Quantity Controls */}
                                                <Box mt={1} display="flex" alignItems="center" gap={1}>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => decreaseItemQuantity(item.id)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Typography variant="body2">{item.quantity}</Typography>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => addItem({ ...item, quantity: 1 })}
                                                    >
                                                        +
                                                    </Button>
                                                </Box>
                                            </Box>

                                            {/* Delete */}
                                            <IconButton onClick={() => removeItem(item.id)}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>

                            <Divider sx={{ my: 2 }} />
                            <Typography fontWeight="bold" gutterBottom>
                                Total: S/ {getTotal().toFixed(2)}
                            </Typography>

                            <Box display="flex" flexDirection="column" gap={1}>
                                <Button variant="outlined" color="error" onClick={clearCart}>
                                    Empty cart
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setDrawerOpen(false)
                                        navigate('/cart')
                                    }}
                                >
                                    Go to complete cart
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    )
}