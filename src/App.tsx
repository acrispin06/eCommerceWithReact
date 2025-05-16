import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { ProductList } from './product/interface/ProductList'
import { LoginForm } from './auth/interface/LoginForm'
import { useAuth } from './auth/AuthContext'
import {PrivateRoute} from "./auth/PrivateRoute.tsx";

function App() {
    const { token, login, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div>
            {token && (
                <button onClick={() => { logout(); navigate('/login', { replace: true }) }}>
                    Logout
                </button>
            )}

            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginForm onLogin={(t) => {
                    login(t)
                    navigate('/products', { replace: true })
                }} />} />
                <Route path="/products" element={
                    <PrivateRoute>
                        <ProductList onSelectProduct={() => {}} />
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    )
}

export default App