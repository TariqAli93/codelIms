# CodeLIMS - Accounting & POS System

## Project Overview

Desktop application for accounting, point of sale, and installment management system built with Electron, Vue 3, Vuetify, and Fastify.

## Technology Stack

- **Frontend**: Electron + Vue 3 + Vuetify 3 + Vite
- **Backend**: Fastify + SQLite + Drizzle ORM
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod
- **Architecture**: Clean Architecture (routes, controllers, services, models)
- **Language**: JavaScript (No TypeScript)
- **Package Manager**: pnpm with workspaces

## Project Structure

```
codelIms/
├── packages/
│   ├── backend/          # Fastify API server
│   └── frontend/         # Electron + Vue 3 app
├── pnpm-workspace.yaml
└── package.json
```

## Key Features

- Multi-currency support (USD, IQD)
- RBAC system with roles and permissions
- Customer, product, and inventory management
- Sales with cash and installment payments
- Advanced reporting and analytics
- Modern Vuetify UI components

## Development Guidelines

- Use JavaScript only (no TypeScript)
- Follow Clean Architecture principles
- Avoid native modules to prevent rebuild issues
- Use ESLint and Prettier for code quality
- Implement comprehensive error handling
- Use Pino for logging

## Checklist Progress

- [x] Create copilot-instructions.md file
- [x] Get project setup information
- [x] Scaffold project structure
- [x] Configure backend dependencies
- [x] Configure frontend dependencies
- [x] Implement backend architecture
- [x] Implement database schema
- [x] Implement authentication & RBAC
- [x] Implement frontend views
- [x] Implement currency system
- [x] Configure Electron integration
- [x] Add reporting & analytics
- [x] Configure ESLint & Prettier
- [x] Create documentation
- [x] Test and verify build

## Project Status: ✅ COMPLETED

All features have been implemented successfully!

### What's Ready:

- Complete Backend API with Fastify
- Full Frontend with Vue 3 + Vuetify + Electron
- Authentication & RBAC System
- Multi-currency support (USD/IQD)
- All CRUD operations
- Dashboard with analytics
- Sales management system
- Customer & Product management
- Category management
- Reports & Settings pages

### Next Steps:

See SETUP_GUIDE.md for installation instructions.
The only requirement is installing build tools for better-sqlite3.
