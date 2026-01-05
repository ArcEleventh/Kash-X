import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';

const AssetCard = ({ code, balance, valueUsd, color }) => (
    <div className="bg-surface/50 border border-white/5 rounded-xl p-5 hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                <span className="font-bold text-white">{code[0]}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">{code}</span>
        </div>
        <div>
            <h3 className="text-2xl font-bold text-white">{balance}</h3>
            <p className="text-sm text-slate-400">≈ ${valueUsd}</p>
        </div>
    </div>
);

import { useNavigate } from 'react-router-dom';
import { useTransaction } from '../context/TransactionContext';

const Dashboard = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { transactions } = useTransaction();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBalances();
    }, []);

    const fetchBalances = async () => {
        try {
            // Mock data for now, replace with API call
            // const res = await axios.get('/api/wallet/balances');

            const mockAssets = [
                { code: 'XLM', balance: '100.50', valueUsd: '12.06', color: 'bg-slate-600' },
                { code: 'UGXT', balance: '50000', valueUsd: '13.50', color: 'bg-yellow-600' },
                { code: 'KEST', balance: '2000', valueUsd: '15.20', color: 'bg-green-600' },
                { code: 'USDT', balance: '10.00', valueUsd: '10.00', color: 'bg-blue-600' },
            ];

            setAssets(mockAssets);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch balances", error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
                <p className="text-slate-400">Your Stellar Testnet Portfolio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    [1, 2, 3, 4].map(i => (
                        <div key={i} className="h-40 bg-surface/30 animate-pulse rounded-xl"></div>
                    ))
                ) : (
                    assets.map((asset) => (
                        <AssetCard key={asset.code} {...asset} />
                    ))
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Mockup */}
                <div className="lg:col-span-2 bg-surface/30 rounded-2xl p-6 border border-white/5">
                    <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {transactions.length === 0 ? (
                            <div className="text-center text-slate-500 py-8">
                                No recent transactions
                            </div>
                        ) : (
                            transactions.map((tx) => (
                                <div key={tx.id} className="flex justify-between items-center p-4 bg-surface/40 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'DEPOSIT' ? 'bg-green-500/20 text-green-400' :
                                            tx.type === 'WITHDRAW' ? 'bg-red-500/20 text-red-400' :
                                                tx.type === 'SEND' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-purple-500/20 text-purple-400'
                                            }`}>
                                            {tx.type === 'DEPOSIT' && <ArrowDownLeft size={20} />}
                                            {tx.type === 'WITHDRAW' && <ArrowUpRight size={20} />}
                                            {tx.type === 'SEND' && <Wallet size={20} />}
                                            {tx.type === 'CONVERT' && <RefreshCw size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">{tx.details}</h4>
                                            <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className={`font-bold ${tx.type === 'DEPOSIT' ? 'text-green-400' :
                                        tx.type === 'WITHDRAW' ? 'text-slate-200' :
                                            'text-white'
                                        }`}>
                                        {tx.type === 'DEPOSIT' ? '+' : '-'} {tx.amount} {tx.asset}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-surface/30 rounded-2xl p-6 border border-white/5 h-fit">
                    <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => navigate('/on-ramp')} className="flex flex-col items-center justify-center p-4 bg-surface hover:bg-surface/80 rounded-xl transition-colors gap-2">
                            <ArrowDownLeft className="text-green-400" />
                            <span className="text-sm font-medium">Deposit</span>
                        </button>
                        <button onClick={() => navigate('/off-ramp')} className="flex flex-col items-center justify-center p-4 bg-surface hover:bg-surface/80 rounded-xl transition-colors gap-2">
                            <ArrowUpRight className="text-red-400" />
                            <span className="text-sm font-medium">Withdraw</span>
                        </button>
                        <button onClick={() => navigate('/convert')} className="flex flex-col items-center justify-center p-4 bg-surface hover:bg-surface/80 rounded-xl transition-colors gap-2">
                            <RefreshCw className="text-blue-400" />
                            <span className="text-sm font-medium">Swap</span>
                        </button>
                        <button onClick={() => navigate('/send')} className="flex flex-col items-center justify-center p-4 bg-surface hover:bg-surface/80 rounded-xl transition-colors gap-2">
                            <Wallet className="text-purple-400" />
                            <span className="text-sm font-medium">Wallet</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
