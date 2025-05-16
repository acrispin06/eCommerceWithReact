import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { PrivateRoute } from '../../auth/PrivateRoute'

export const ProtectedLayout: React.FC = () => {
    return (
        <PrivateRoute>
            <>
                <Navbar />
                <main style={{ padding: '20px' }}>
                    <Outlet />
                </main>
            </>
        </PrivateRoute>
    )
}