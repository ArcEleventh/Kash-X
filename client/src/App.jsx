import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OnRamp from './pages/OnRamp';
import OffRamp from './pages/OffRamp';
import Send from './pages/Send';
import Convert from './pages/Convert';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Dashboard />} />
                        <Route path="on-ramp" element={<OnRamp />} />
                        <Route path="off-ramp" element={<OffRamp />} />
                        <Route path="send" element={<Send />} />
                        <Route path="convert" element={<Convert />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
