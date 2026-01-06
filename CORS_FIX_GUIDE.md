# CORS Fix for Brave Browser - Setup Guide

## Problem
Brave browser has stricter CORS and privacy policies compared to other browsers, which can cause CORS errors when making API requests from your frontend to backend.

## Changes Made

### 1. Server-Side Changes (`server/src/app.js`)
- ✅ Enhanced CORS configuration with explicit allowed origins
- ✅ Added support for multiple origins (comma-separated)
- ✅ Configured proper HTTP methods and headers
- ✅ Added credentials support
- ✅ Set preflight options for Brave compatibility

### 2. Client-Side Changes (`client/src/context/AuthContext.jsx`)
- ✅ Enabled `withCredentials` for axios
- ✅ Set proper default headers for all requests
- ✅ Configured Accept and Content-Type headers

## Setup Instructions

### Step 1: Create Server `.env` File

You need to create a `.env` file in the `server` directory. Run this command:

```powershell
cd "c:\Users\Newton\Documents\Kash X\Dapp\server"
```

Then create the `.env` file with this content:

```env
# Environment Variables for Server

# Server Port
PORT=3000

# Node Environment (development/production)
NODE_ENV=development

# Database Configuration (Optional - currently using mock data)
# DB_USER=postgres
# DB_HOST=localhost
# DB_NAME=kash_x
# DB_PASSWORD=password
# DB_PORT=5432

# JWT Secret (Important: Change this in production!)
JWT_SECRET=your_secret_key_here_change_in_production

# CORS Origin - Multiple origins separated by commas
# For development, allow localhost on different ports
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173

# For production, set to your Vercel frontend URL:
# CORS_ORIGIN=https://kashx.vercel.app
```

### Step 2: Restart Your Backend Server

After creating the `.env` file, restart your backend server:

```powershell
cd "c:\Users\Newton\Documents\Kash X\Dapp\server"
npm run dev
```

### Step 3: Restart Your Frontend Development Server

Restart your frontend to pick up the axios configuration changes:

```powershell
cd "c:\Users\Newton\Documents\Kash X\Dapp\client"
npm run dev
```

### Step 4: Clear Brave Browser Cache (Important!)

1. Open Brave browser
2. Press `Ctrl + Shift + Delete`
3. Select "Cached images and files"
4. Click "Clear data"
5. Alternatively, open DevTools (F12) → Network tab → Check "Disable cache"

### Step 5: Check Brave Shields Settings

Brave's Shields can block requests. To check:

1. Click the Brave icon (lion) in the address bar
2. Make sure "Shields" is set to "Down" for `localhost` (for development)
3. Or set "Cross-site cookies blocked" to "All cookies allowed" for localhost

## Testing

1. Open Brave browser
2. Navigate to `http://localhost:5173` (or your frontend URL)
3. Open DevTools (F12) → Console tab
4. Try logging in or making an API request
5. Check the Network tab for the request/response headers

### Expected Headers in Network Tab

**Request Headers:**
- `Origin: http://localhost:5173`
- `Content-Type: application/json`
- `Accept: application/json`

**Response Headers:**
- `Access-Control-Allow-Origin: http://localhost:5173`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH`

## Troubleshooting

### Still Getting CORS Errors?

1. **Check server is running**: Make sure your backend is running on `http://localhost:3000`
2. **Check .env file**: Verify the `.env` file exists in the server directory
3. **Check console logs**: Look for any error messages in the browser console
4. **Verify API URL**: Check that `VITE_API_URL` in client `.env.development` is `http://localhost:3000`

### Brave-Specific Issues

If you're still having issues with Brave:

1. **Disable Brave Shields** for localhost during development
2. **Allow all cookies** for localhost in Brave settings
3. **Try in Chrome/Edge** to confirm it's Brave-specific
4. **Check Brave version**: Update to the latest version

### Production Deployment

When deploying to production:

1. Update `server/.env` with:
   ```env
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

2. Update `client/.env.production` with:
   ```env
   VITE_API_URL=https://your-backend-domain.onrender.com/api
   ```

## Additional Brave Browser Considerations

Brave has additional privacy features that might interfere:

- **Fingerprinting protection**: Can block some headers
- **Ad/tracker blocking**: Might block certain requests
- **Cookie blocking**: Blocks third-party cookies by default
- **HTTPS upgrade**: Forces HTTPS in some cases

For development on localhost, these are usually not an issue, but keep them in mind.

## Summary

The CORS configuration has been updated to:
1. ✅ Explicitly allow your frontend origin
2. ✅ Support credentials (cookies, auth headers)
3. ✅ Allow all necessary HTTP methods
4. ✅ Expose proper headers
5. ✅ Work with Brave's strict security policies

After following the setup instructions above, your CORS errors should be resolved!
