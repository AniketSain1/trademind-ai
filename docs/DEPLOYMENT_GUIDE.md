==============================
DEPLOYMENT_GUIDE.md
==============================
🚀 TradeMind — Production Deployment Guide
1. Production Architecture
Frontend (Vercel)
        ↓
Render Backend API
        ↓
Prisma ORM
        ↓
Neon PostgreSQL
2. GitHub Repository Setup
Repository
https://github.com/AniketSain1/trademind-ai
Monorepo Structure
trademind/
├── backend/
├── frontend/
└── docs/
3. Backend Deployment (Render)
Root Directory
backend
Build Command
npm install && npx prisma generate
Start Command
npm start
4. Dynamic Port Handling
Problem

Hardcoded ports fail in cloud deployments.

Correct Architecture
const PORT = process.env.PORT || 5001;
5. Node Version Stabilization
Problem

Render attempted using unstable Node versions.

Fix

Added:

"engines": {
  "node": "20.x"
}
6. Prisma Deployment Workflow
Generate Prisma Client
npx prisma generate
Sync Schema
npx prisma db push
7. Neon PostgreSQL Setup
Advantages
serverless PostgreSQL
Prisma compatibility
free tier support
production-ready architecture
8. Frontend Deployment (Vercel)
Root Directory
frontend
Framework Preset
Vite
9. Environment Variables
Frontend
VITE_API_URL=https://trademind-ai-y0kk.onrender.com/api/stocks
Important Note

Vite only exposes variables prefixed with:

VITE_
10. API Environment Refactor
Previous Architecture
const BASE_URL = "http://localhost:5001/api/stocks";
Final Architecture
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001/api/stocks";
11. TypeScript Production Build Failures
Error
TS6133 variable declared but never read
Root Cause

Unused variables inside:

MarketHeat.tsx
Fix
removed unused references
stabilized memoized return structure
12. Common Deployment Issues
Problems Encountered
incorrect root directory
missing environment variables
Node version instability
TypeScript build failures
Prisma generation failures
13. CI/CD Workflow
Git Push
    ↓
GitHub
    ↓
Auto Deploy

Frontend:

Vercel

Backend:

Render
14. Production Monitoring Suggestions

Recommended future additions:

Sentry
LogRocket
UptimeRobot
Prometheus
Grafana
15. Future Infrastructure Improvements

Planned:

Redis caching
WebSockets
BullMQ queues
analytics engine
CDN optimization
distributed monitoring