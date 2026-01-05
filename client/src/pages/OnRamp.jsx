import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';

import { useTransaction } from '../context/TransactionContext';

const OnRamp = () => {
    const [provider, setProvider] = useState('MTN');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('idle'); // idle, processing, success, error
    const { addTransaction } = useTransaction();

    const handleDeposit = (e) => {
        e.preventDefault();
        setStatus('processing');
        console.log(`Processing deposit for ${amount}`);
        // Simulate API call
        setTimeout(() => {
            addTransaction({
                type: 'DEPOSIT',
                amount: amount,
                asset: provider === 'MTN' ? 'UGXT' : 'KEST',
                details: `Deposit via ${provider}`,
                status: 'COMPLETED'
            });
            setStatus('success');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Deposit Fiat (On-Ramp)</h2>
            <div className="bg-surface/30 rounded-xl p-6 border border-white/5">
                <p className="text-slate-400 mb-6">Simulate depositing local currency (UGX, KES) to receive digital tokens.</p>

                {status === 'success' ? (
                    <div className="text-center py-10 bg-green-500/10 rounded-lg border border-green-500/30">
                        <div className="text-green-400 text-xl font-bold mb-2">Deposit Successful!</div>
                        <p className="text-slate-300">Your account has been credited with {amount} {provider === 'MTN' ? 'UGXT' : 'KEST'}.</p>
                        <button onClick={() => setStatus('idle')} className="mt-4 text-primary-light hover:text-white underline">Make another deposit</button>
                    </div>
                ) : (
                    <form onSubmit={handleDeposit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setProvider('MTN')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${provider === 'MTN'
                                    ? 'bg-yellow-500/20 border-yellow-500 text-white'
                                    : 'bg-surface/50 border-white/10 text-slate-400 hover:bg-surface'
                                    }`}
                            >
                                <Smartphone size={24} />
                                <span className="font-bold">MTN Mobile Money</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setProvider('AIRTEL')}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${provider === 'AIRTEL'
                                    ? 'bg-red-500/20 border-red-500 text-white'
                                    : 'bg-surface/50 border-white/10 text-slate-400 hover:bg-surface'
                                    }`}
                            >
                                <Smartphone size={24} />
                                <span className="font-bold">Airtel Money</span>
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Amount ({provider === 'MTN' ? 'UGX' : 'KES'})</label>
                            <input
                                type="number"
                                placeholder="50000"
                                className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'processing'}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Processing...' : 'Deposit Funds'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OnRamp;
