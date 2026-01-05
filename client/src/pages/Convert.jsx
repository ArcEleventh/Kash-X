import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

import { useTransaction } from '../context/TransactionContext';

const Convert = () => {
    const [fromAsset, setFromAsset] = useState('UGXT');
    const [toAsset, setToAsset] = useState('KEST');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('idle');
    const { addTransaction } = useTransaction();

    const handleConvert = (e) => {
        e.preventDefault();
        setStatus('preview');
        setTimeout(() => {
            addTransaction({
                type: 'CONVERT',
                amount: amount,
                asset: fromAsset,
                details: `Swapped ${fromAsset} to ${toAsset}`,
                status: 'COMPLETED'
            });
            setStatus('success');
        }, 1500); // skip preview for simple mock
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Convert Assets</h2>
            <div className="bg-surface/30 rounded-xl p-6 border border-white/5">
                <p className="text-slate-400 mb-6">Swap between currencies using Stellar Path Payments.</p>

                {status === 'success' ? (
                    <div className="text-center py-10 bg-green-500/10 rounded-lg border border-green-500/30">
                        <div className="text-green-400 text-xl font-bold mb-2">Conversion Successful!</div>
                        <p className="text-slate-300">You successfully converted {amount} {fromAsset} to {toAsset}.</p>
                        <button onClick={() => setStatus('idle')} className="mt-4 text-primary-light hover:text-white underline">New Conversion</button>
                    </div>
                ) : (
                    <form onSubmit={handleConvert} className="space-y-6">
                        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">From</label>
                                <select
                                    className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    value={fromAsset}
                                    onChange={(e) => setFromAsset(e.target.value)}
                                >
                                    <option value="UGXT">UGXT</option>
                                    <option value="KEST">KEST</option>
                                    <option value="USDT">USDT</option>
                                    <option value="XLM">XLM</option>
                                </select>
                            </div>
                            <div className="pb-3 text-slate-500">
                                <ArrowRightLeft size={24} />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">To</label>
                                <select
                                    className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                    value={toAsset}
                                    onChange={(e) => setToAsset(e.target.value)}
                                >
                                    <option value="KEST">KEST</option>
                                    <option value="UGXT">UGXT</option>
                                    <option value="USDT">USDT</option>
                                    <option value="XLM">XLM</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Amount to Convert</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>

                        <div className="p-4 bg-background/30 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Estimated Rate</span>
                                <span className="text-white font-mono">1 {fromAsset} ≈ 0.035 {toAsset}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Network Fee</span>
                                <span className="text-white font-mono">0.00001 XLM</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'preview'}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                            {status === 'preview' ? 'Calculating...' : 'Preview Conversion'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
export default Convert;
