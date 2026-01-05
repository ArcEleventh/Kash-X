import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ArrowRightLeft,
    Send as SendIcon,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    LogOut
} from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/send', icon: SendIcon, label: 'Send' },
        { to: '/convert', icon: ArrowRightLeft, label: 'Convert' },
        { to: '/on-ramp', icon: ArrowDownLeft, label: 'Deposit (On-Ramp)' },
        { to: '/off-ramp', icon: ArrowUpRight, label: 'Withdraw (Off-Ramp)' },
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-surface bg-surface/50 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-light to-primary-dark bg-clip-text text-transparent">
                        Kash X
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Stellar Testnet PoC</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary/20 text-primary-light'
                                    : 'text-slate-400 hover:bg-surface hover:text-white'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-surface">
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">User</span>
                            <span className="text-xs text-slate-400">{user?.phoneNumber || 'Guest'}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="p-4 md:hidden flex items-center justify-between border-b border-surface bg-surface/50">
                    <h1 className="text-xl font-bold text-primary-light">Kash X</h1>
                    <button onClick={handleLogout} className="text-slate-400">
                        <LogOut size={20} />
                    </button>
                </header>
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
