# Kash X - Stellar Testnet PoC Platform

A web-based proof-of-concept platform for East Aftrica running on the **Stellar Testnet**. 
Demonstrates phone-based onboarding, soroban smart contracts, on/off ramps, and path payments.

## Features
- **Phone Login**: Users sign up with a phone number (Mock OTP: `123456`).
- **Stellar Wallet**: Automatically generated and funded via Friendbot.
- **Soroban Treasury**: Secure asset management using Rust smart contracts.
- **On/Off Ramp**: Simulate deposits/withdrawals via Mobile Money (MTN/Airtel).
- **Cross-Currency**: Convert between UGXT, KEST, USDT using Stellar Path Payments.

## Quick Start (No Installation Required)
If you do not have Node.js installed, you can view the fully functional standalone version immediately:
1. Open the file `client/preview.html` in your browser.
2. This runs the full UI using CDNs without needing a build step.

## Project Structure
- `client/`: React + Vite + Tailwind CSS Frontend.
- `server/`: Node.js + Express Backend + PostgreSQL.
- `contracts/`: Rust Soroban Contracts.

## Prerequisites
- Node.js (v18+)
- Rust & Soroban CLI (for contracts)
- PostgreSQL

## Setup Instructions

### 1. Database
Create a PostgreSQL database named `kash_x`:
```bash
createdb kash_x
# Run schema
psql -d kash_x -f server/db/schema.sql
```

### 2. Backend
```bash
cd server
npm install
# Set env variables in .env if needed
npm run dev
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Smart Contract (Rust)
To build the Soroban contract:
```bash
cd contracts/treasury
cargo build --target wasm32-unknown-unknown --release
# Deploy to Testnet
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/soroban_treasury_contract.wasm --source-account <YOUR_SECRET_KEY> --network testnet
```

## Environment Variables
Create a `.env` file in `server/`:
```
DB_NAME=kash_x
DB_USER=postgres
DB_PASSWORD=password
HORIZON_URL=https://horizon-testnet.stellar.org
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
```

## Disclaimer
This project runs strictly on **Stellar Testnet** with mock assets. No real money is involved.
