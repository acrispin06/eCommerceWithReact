import React, { useState } from 'react'
import { loginUser } from '../application/loginUser'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

export const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const { token } = await loginUser({ username, password })

            const res = await fetch(`https://fakestoreapi.com/users`)
            const users = await res.json()
            const foundUser = users.find((u: any) => u.username === username)

            if (!foundUser) {
                setError('Usuario no encontrado en la lista de usuarios')
                return
            }

            login(token, foundUser)
            navigate('/products', { replace: true })

        } catch (err) {
            console.error(err)
            setError('Usuario o contraseña incorrectos')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Log in</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
            />
            <button type="submit" style={styles.button}>LogIn</button>
            {error && <p style={styles.error}>{error}</p>}
        </form>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        maxWidth: 400,
        margin: 'auto',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#f4f4f4',
        borderRadius: 8
    },
    input: {
        padding: '10px',
        fontSize: '16px'
    },
    button: {
        padding: '10px',
        background: '#212121',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        borderRadius: 4
    },
    error: {
        color: 'red',
        marginTop: 10
    }
}
