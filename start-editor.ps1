# AutoCare Config Editor - PowerShell Version
Write-Host "🚗 Starting AutoCare Config Editor..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Start the backend server
Write-Host "🔧 Starting backend server..." -ForegroundColor Blue
$backendProcess = Start-Process -FilePath "node" -ArgumentList "config-editor-backend.js" -PassThru -WindowStyle Hidden

# Wait for backend to start
Start-Sleep -Seconds 2

# Open the editor in default browser
Write-Host "🌐 Opening config editor in browser..." -ForegroundColor Blue
$currentPath = Get-Location
$editorPath = Join-Path $currentPath "config-editor.html"
Start-Process "file:///$($editorPath.Replace('\', '/'))"

Write-Host "✅ Config Editor is running!" -ForegroundColor Green
Write-Host "📝 Editor: file:///$($editorPath.Replace('\', '/'))" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Enter to stop the editor..." -ForegroundColor Yellow

# Wait for user input
Read-Host

# Stop the backend process
Write-Host "⏹️  Stopping editor..." -ForegroundColor Yellow
try {
    Stop-Process -Id $backendProcess.Id -Force
    Write-Host "✅ Editor stopped" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Backend may still be running. Check Task Manager if needed." -ForegroundColor Yellow
}