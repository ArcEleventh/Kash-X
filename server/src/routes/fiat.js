const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    router.post('/on-ramp', async (req, res) => {
        // Interact with Soroban Contract here
        res.json({ status: 'success', type: 'on-ramp' });
    });

    router.post('/off-ramp', async (req, res) => {
        res.json({ status: 'success', type: 'off-ramp' });
    });

    return router;
};
