import React, { useState } from 'react'
import { loginUser } from '../application/loginUser'

export const LoginForm: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await loginUser({ username, password })
            onLogin(res.token)
        } catch (err) {
            setError('Usuario o contraseña incorrectos')
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h2>Iniciar sesión</h2>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: 8, marginBottom: 10 }}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: 8, marginBottom: 10 }}
            />
            <button type="submit" style={{ width: '100%', padding: 10 }}>
                Entrar
            </button>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </form>
    )
}
