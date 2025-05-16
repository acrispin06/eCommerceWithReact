import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext<any>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)

    const login = (newToken: string) => setToken(newToken)
    const logout = () => setToken(null)

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
