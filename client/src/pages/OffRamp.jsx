import React, { useState } from 'react';

import { useTransaction } from '../context/TransactionContext';

const OffRamp = () => {
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('idle');
    const { addTransaction } = useTransaction();

    const handleWithdraw = (e) => {
        e.preventDefault();
        setStatus('processing');
        setTimeout(() => {
            addTransaction({
                type: 'WITHDRAW',
                amount: amount,
                asset: 'UGXT',
                details: `Withdraw to Mobile Money`,
                status: 'COMPLETED'
            });
            setStatus('success');
        }, 2000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Withdraw Fiat (Off-Ramp)</h2>
            <div className="bg-surface/30 rounded-xl p-6 border border-white/5">
                <p className="text-slate-400 mb-6">Simulate withdrawing digital tokens to mobile money.</p>

                {status === 'success' ? (
                    <div className="text-center py-10 bg-green-500/10 rounded-lg border border-green-500/30">
                        <div className="text-green-400 text-xl font-bold mb-2">Withdrawal Initiated!</div>
                        <p className="text-slate-300">You have withdrawn {amount} UGXT. You will receive mobile money shortly.</p>
                        <button onClick={() => setStatus('idle')} className="mt-4 text-primary-light hover:text-white underline">New Withdrawal</button>
                    </div>
                ) : (
                    <form onSubmit={handleWithdraw} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Withdraw Asset</label>
                            <select className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors">
                                <option>UGXT (Uganda Shilling)</option>
                                <option>KEST (Kenya Shilling)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number</label>
                            <input
                                type="tel"
                                placeholder="+256..."
                                className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                defaultValue="+256 700 123456"
                                readOnly
                            />
                            <p className="text-xs text-slate-500 mt-1">Funds will be sent to your registered phone number.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                            <input
                                type="number"
                                placeholder="0.00"
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
                            {status === 'processing' ? 'Processing...' : 'Confirm Withdrawal'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
export default OffRamp;
