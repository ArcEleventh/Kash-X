const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = (pool) => {

    // POST /api/auth/send-otp
    router.post('/send-otp', async (req, res) => {
        const { phoneNumber } = req.body;
        // Mock OTP generation
        const otp = '123';
        const expiresAt = new Date(Date.now() + 5 * 60000); // 5 mins

        // In a real app, save to DB:
        // await pool.query(...)
        console.log(`[MOCK] OTP for ${phoneNumber} is ${otp}`);

        res.json({ message: 'OTP sent' });
    });

    // POST /api/auth/verify-otp
    router.post('/verify-otp', async (req, res) => {
        const { phoneNumber, otp } = req.body;

        // Mock Verification
        if (otp !== '123') {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Mock User Login/Registration success
        // In real app, we check DB, create wallet, etc.
        // For this blank PoC without running DB, we return a mock user.

        const mockUser = {
            id: 1,
            phone_number: phoneNumber
        };

        const token = jwt.sign(
            { userId: mockUser.id, phone: phoneNumber },
            'secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: mockUser.id,
                phoneNumber
            }
        });
    });

    return router;
};
