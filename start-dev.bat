@echo off
echo Starting Portfolio Development Environment...

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3003
echo Frontend: http://localhost:5173
echo Visitor Entry: http://localhost:5173/visitor-entry
echo.
pause