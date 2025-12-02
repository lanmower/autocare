#!/bin/bash

if [ ! -d "node_modules" ]; then
  npm install --legacy-peer-deps
fi

echo "🚀 Starting Decap CMS local development..."
echo "📝 CMS Admin: http://localhost:5173/admin"
echo "🖥️  Dev Server: http://localhost:5173"
echo "📡 Proxy Server: http://localhost:8081"
echo ""
echo "Usage: Edit content → Save → git push origin main → Auto-deploy"
echo ""
npm run cms