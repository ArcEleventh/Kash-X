const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const transactRoutes = require('./routes/transact');
const fiatRoutes = require('./routes/fiat');

const app = express();
const port = process.env.PORT || 3000;

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'kash_x',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes(pool));
app.use('/api/wallet', walletRoutes(pool));
app.use('/api/transact', transactRoutes(pool));
app.use('/api/fiat', fiatRoutes(pool));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Only start the server if we are NOT in a Vercel environment (module-level export)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;
