import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (verify token)
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');

            if (storedUser && storedToken) {
                try {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                } catch (error) {
                    console.error("Failed to parse stored user", error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (phoneNumber, otp) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock Verification
        // Accept any OTP for PoC to prevent "Invalid OTP" errors during demo
        if (otp && otp.trim().length > 0) {
            const mockUser = {
                id: 'user_12345',
                phoneNumber: phoneNumber,
                name: 'Test User'
            };

            const mockToken = 'mock_jwt_token_' + Date.now();

            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            setToken(mockToken);
            setUser(mockUser);

            return true;
        } else {
            throw new Error('Please enter an OTP');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
