# Start both frontend and backend servers for Kash X DApp
# This script will start the servers in separate terminal windows

Write-Host "Starting Kash X DApp Servers..." -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Newton\Documents\Kash X\Dapp\server'; Write-Host 'Backend Server Starting...' -ForegroundColor Green; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start Frontend Server
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Newton\Documents\Kash X\Dapp\client'; Write-Host 'Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Clear your Brave browser cache before testing!" -ForegroundColor Red
Write-Host "Press Ctrl+Shift+Delete in Brave and clear cached images and files." -ForegroundColor Red
Write-Host ""
Write-Host "If you still get CORS errors, check Brave Shields settings:" -ForegroundColor Magenta
Write-Host "1. Click the Brave icon in the address bar" -ForegroundColor White
Write-Host "2. Set Shields to Down for localhost" -ForegroundColor White
Write-Host "3. Or allow all cookies for localhost" -ForegroundColor White
