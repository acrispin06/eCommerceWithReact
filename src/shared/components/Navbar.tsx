import React, { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <nav style={styles.navbar}>
            <div>
                <span style={styles.welcome}>Welcome back, {user?.name.firstname}</span>
            </div>

            <div style={styles.icons}>
                <span style={styles.icon} onClick={() => navigate('/cart')}>cart</span>

                <div style={styles.userMenu}>
                    <span style={styles.icon} onClick={() => setDropdownOpen(!dropdownOpen)}>user</span>
                    {dropdownOpen && (
                        <div style={styles.dropdown}>
                            <p style={{ margin: 0 }}>{user?.email}</p>
                            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#212121',
        color: 'white',
        padding: '10px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    welcome: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    icons: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    icon: {
        cursor: 'pointer',
        fontSize: '22px',
    },
    userMenu: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: '30px',
        right: 0,
        background: '#fff',
        color: '#000',
        borderRadius: '6px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        padding: '10px',
        minWidth: '160px',
    },
    logoutBtn: {
        marginTop: '8px',
        padding: '6px 12px',
        width: '100%',
        cursor: 'pointer',
    },
}