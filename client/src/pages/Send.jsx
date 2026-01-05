import React, { useState } from 'react';
import { Send as SendIcon } from 'lucide-react';

import { useTransaction } from '../context/TransactionContext';

const Send = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [asset, setAsset] = useState('XLM');
    const [status, setStatus] = useState('idle');
    const { addTransaction } = useTransaction();

    const handleSend = (e) => {
        e.preventDefault();
        setStatus('processing');
        setTimeout(() => {
            addTransaction({
                type: 'SEND',
                amount: amount,
                asset: asset,
                details: `Sent to ${recipient.substring(0, 8)}...`,
                status: 'COMPLETED'
            });
            setStatus('success');
        }, 2000);
    };

    const assets = [
        { code: 'XLM', name: 'Stellar Lumens', balance: '100.50', value: '$12.06', color: 'bg-slate-600' },
        { code: 'UGXT', name: 'Uganda Shilling', balance: '50,000', value: '$13.50', color: 'bg-yellow-600' },
        { code: 'KEST', name: 'Kenya Shilling', balance: '2,000', value: '$15.20', color: 'bg-green-600' },
        { code: 'USDT', name: 'Tether USD', balance: '10.00', value: '$10.00', color: 'bg-blue-600' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Wallet</h2>
                <p className="text-slate-400">Manage your assets and make transfers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets List */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Your Assets</h3>
                    <div className="space-y-3">
                        {assets.map((item) => (
                            <div key={item.code} className="bg-surface/30 border border-white/5 p-4 rounded-xl flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer" onClick={() => setAsset(item.code)}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color} text-white font-bold`}>
                                        {item.code[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{item.name}</div>
                                        <div className="text-xs text-slate-400 font-mono">{item.code}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-white">{item.balance}</div>
                                    <div className="text-xs text-slate-400">{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Send Form */}
                <div className="bg-surface/30 rounded-xl p-6 border border-white/5 h-fit">
                    <h3 className="text-xl font-semibold text-white mb-6">Send Assets</h3>

                    {status === 'success' ? (
                        <div className="text-center py-10 bg-green-500/10 rounded-lg border border-green-500/30">
                            <div className="text-green-400 text-xl font-bold mb-2">Transaction Sent!</div>
                            <p className="text-slate-300">You successfully sent {amount} {asset} to {recipient}.</p>
                            <button onClick={() => setStatus('idle')} className="mt-4 text-primary-light hover:text-white underline">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSend} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Recipient</label>
                                <input
                                    type="text"
                                    placeholder="Phone or Public Key"
                                    className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Asset</label>
                                    <select
                                        className="w-full bg-background/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={asset}
                                        onChange={(e) => setAsset(e.target.value)}
                                    >
                                        <option value="XLM">XLM</option>
                                        <option value="UGXT">UGXT</option>
                                        <option value="KEST">KEST</option>
                                        <option value="USDT">USDT</option>
                                    </select>
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
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'processing'}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                            >
                                <SendIcon size={20} className="mr-2" />
                                {status === 'processing' ? 'Sending...' : 'Send Assets'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Send;
