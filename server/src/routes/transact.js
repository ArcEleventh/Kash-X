const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/send', async (req, res) => {
        res.json({ status: 'success', tx_hash: 'mock_hash_123' });
    });

    router.post('/convert', async (req, res) => {
        res.json({ status: 'success', from: 'UGXT', to: 'KEST', amount: 100 });
    });

    router.get('/history', async (req, res) => {
        // Mock history data
        const history = [
            { id: 1, type: 'onramp', asset: 'UGXT', amount: '50000', date: '2023-11-01T10:00:00Z', status: 'success', tx_hash: '3389e9f0...' },
            { id: 2, type: 'convert', from: 'UGXT', to: 'KEST', amount_in: '10000', amount_out: '360', date: '2023-11-02T14:30:00Z', status: 'success', tx_hash: '55667788...' },
            { id: 3, type: 'send', asset: 'KEST', amount: '100', to: '+254700000000', date: '2023-11-03T09:15:00Z', status: 'success', tx_hash: '99aabbcc...' },
        ];
        res.json({ transactions: history });
    });

    return router;
};
