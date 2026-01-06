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
        console.log("Attempting login with", phoneNumber, otp);

        try {
            // DIRECT LOCAL LOGIN - NO DELAY
            const mockUser = {
                id: 'user_po_concept',
                phoneNumber: phoneNumber || '+000000000',
                name: 'Demo User'
            };

            const mockToken = 'mock_jwt_token_' + Date.now();

            console.log("Setting localStorage...");
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            console.log("Setting state...");
            setToken(mockToken);
            setUser(mockUser);

            console.log("Login successful, returning true");
            return true;
        } catch (e) {
            console.error("Login Error in Context:", e);
            throw e;
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
