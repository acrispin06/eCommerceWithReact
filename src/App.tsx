import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './auth/interface/LoginForm'
import { ProductList } from './product/interface/ProductList'
import { ProductDetailWrapper } from './product/interface/ProductDetailWrapper'
import { ProtectedLayout } from './shared/layout/ProtectedLayout'
import {CartView} from "./cart/interface/cartView.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginForm />} />

            <Route element={<ProtectedLayout />}>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetailWrapper />} />
                <Route path="/cart" element={<CartView />} />
            </Route>
        </Routes>
    )
}

export default App