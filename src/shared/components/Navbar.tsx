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
    ListItemText,
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
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { cartItems, getTotal, getItemCount, removeItem, clearCart } = useCart()

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
                <Box sx={{ width: 350, padding: 2 }}>
                    <Typography variant="h6" gutterBottom>Your Cart</Typography>

                    {cartItems.length === 0 ? (
                        <Typography variant="body2">Your cart is empty</Typography>
                    ) : (
                        <>
                            <List>
                                {cartItems.map(item => (
                                    <ListItem
                                        key={item.id}
                                        divider
                                        secondaryAction={
                                            <IconButton edge="end" onClick={() => removeItem(item.id)}>
                                                <Delete />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={`${item.title} (x${item.quantity})`}
                                            secondary={`S/ ${(item.price * item.quantity).toFixed(2)}`}
                                        />
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
                                <Button variant="contained" color="primary" onClick={() => {
                                    setDrawerOpen(false)
                                    navigate('/cart')
                                }}>
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