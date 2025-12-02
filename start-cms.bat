@echo off
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install --legacy-peer-deps
)

echo.
echo 🚀 Starting Decap CMS local development...
echo 📝 CMS Admin: http://localhost:5173/admin
echo 🖥️  Dev Server: http://localhost:5173
echo 📡 Proxy Server: http://localhost:8081
echo.
echo Usage: Edit content ^→ Save ^→ git push origin main ^→ Auto-deploy
echo.
call npm run cms