#!/bin/bash

# AutoCare Config Editor Startup Script
echo "🚗 Starting AutoCare Config Editor..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Start the backend server
echo "🔧 Starting backend server..."
node config-editor-backend.js &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Open the editor in default browser
echo "🌐 Opening config editor in browser..."
if command -v xdg-open &> /dev/null; then
    xdg-open config-editor.html
elif command -v open &> /dev/null; then
    open config-editor.html
elif command -v start &> /dev/null; then
    start config-editor.html
else
    echo "📝 Please open config-editor.html in your browser"
fi

echo "✅ Config Editor is running!"
echo "📝 Editor: file://$(pwd)/config-editor.html"
echo "🔧 Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the editor"

# Wait for Ctrl+C
trap "echo '⏹️  Stopping editor...'; kill $BACKEND_PID 2>/dev/null; exit 0" SIGINT
wait $BACKEND_PID