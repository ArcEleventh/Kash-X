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
// Database Connection
const poolConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for Render's managed Postgres
        }
    }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'kash_x',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
    };

const pool = new Pool(poolConfig);

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'https://kash-x.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the origin is in the allowed list or if we're allowing all origins
        if (process.env.CORS_ORIGIN === '*' || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // In development, allow all origins
            if (process.env.NODE_ENV !== 'production') {
                callback(null, true);
            } else {
                console.warn(`Blocked CORS origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Kash X API is running',
        timestamp: new Date(),
        version: '1.0.0'
    });
});

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
