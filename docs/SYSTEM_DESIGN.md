==============================
SYSTEM_DESIGN.md
==============================
🏗️ TradeMind — System Design Document
1. High-Level Architecture (HLD)
Frontend (React + TypeScript)
          ↓
Backend API (Express)
          ↓
--------------------------------
| Stock Service               |
| Detection Engine            |
| News Service                |
| AI Service                  |
--------------------------------
          ↓
Prisma ORM
          ↓
Neon PostgreSQL
2. Low-Level Architecture (LLD)
Request Lifecycle
Frontend Request
      ↓
Controller
      ↓
Stock Service
      ↓
Detection Engine
      ↓
News Service
      ↓
AI Service
      ↓
Database Persistence
      ↓
API Response
3. Frontend Architecture
Layers
Components

UI rendering only.

Hooks

Business logic orchestration.

Services

Networking abstraction.

Types

Centralized TypeScript contracts.

4. Backend Architecture
Controllers

Handle:

requests
responses
validation
Services

Handle:

business logic
external APIs
AI generation
Utilities

Handle:

shared logic
temporary state
5. Realtime Monitoring Design
Current Architecture
Frontend polling every 5 seconds
Realtime Flow
Poll
  ↓
Fetch Data
  ↓
Detect Event
  ↓
Persist History
  ↓
Update Dashboard
6. Symbol State Architecture
Critical Refactor

Separated:

query state
vs
confirmed symbol state

This prevented:

symbol corruption
stale UI
invalid DB writes
7. History Tracking System
Previous Problem
Global history feed
Final Architecture
/history?symbol=AAPL

Benefits:

correct chart synchronization
stock-specific history
stable dashboards
8. Scalability Design
Current State
polling architecture
single backend instance
direct API communication
Future State
WebSockets
Redis caching
queue systems
distributed services
9. Failure Handling
Problems Considered
API rate limits
AI failures
database errors
stale polling
invalid symbols
Current Strategy
fallback handling
error-safe responses
defensive validation
10. Production Tradeoffs
Polling Chosen Over WebSockets

Reason:

simpler MVP
easier debugging
lower infrastructure complexity
Rule-Based AI Chosen Initially

Reason:

faster iteration
lower cost
deterministic behavior
11. Future Architecture Evolution
Planned Infrastructure
WebSockets
Redis
BullMQ
Microservices
AI Streaming
Planned Features
multi-stock monitoring
AI trading assistant
realtime analytics
portfolio intelligence