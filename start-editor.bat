@echo off
echo 🚗 Starting AutoCare Config Editor...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo 🔧 Starting backend server...
start /b node config-editor-backend.js

REM Wait for backend to start
timeout /t 3 /nobreak >nul

echo 🌐 Opening config editor in browser...
start "" "config-editor.html"

echo ✅ Config Editor is running!
echo 📝 Editor: file://%~dp0config-editor.html
echo 🔧 Backend: http://localhost:3001
echo.
echo Press any key to stop the editor...
pause >nul

echo ⏹️  Stopping editor...
taskkill /f /im node.exe 2>nul
echo ✅ Editor stopped