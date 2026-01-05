const express = require('express');
const router = express.Router();
const { Horizon } = require('stellar-sdk');

// const server = new Horizon.Server('https://horizon-testnet.stellar.org');

module.exports = (pool) => {
    router.get('/balance', async (req, res) => {
        // Mock Response for demo if Server offline, else implementation detail
        // In PoC without full env, we return mock
        res.json({
            balances: [
                { asset_type: 'native', balance: '100.0000000' },
                { asset_code: 'UGXT', balance: '50000.0000000' }
            ]
        });
    });

    return router;
};
