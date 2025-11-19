# nuqtaplus – Agent Guide

Concise instructions for AI coding agents to work productively on this Electron + Vue 3 + Fastify monorepo.

## Big Picture

- Monorepo: `packages/backend` (Fastify + SQLite + Drizzle) and `packages/frontend` (Vue 3 + Vuetify + Vite + Electron).
- Clean architecture on backend: `routes → controllers → services → models (drizzle)`. Validation via Zod, auth via JWT.
- RBAC is first-class: Backend enforces per-route permissions; Frontend gates routes, menus, and buttons reactively.

## RBAC Model (critical)

- Permission naming differs by layer:
  - Frontend uses `action:resource` (e.g., `view:products`, `read:products`, `manage:*`). Seed sets `permissions.name` this way (`src/seed.js`).
  - Backend checks `resource:action` strings (e.g., `products:read`) via `fastify.authorize(requiredPermission)` which compares against `permissions.resource` and `permissions.action` (`src/plugins/auth.js`).
- **View vs Read distinction**:
  - `view`: Frontend route/menu visibility — user can see the page/menu item.
  - `read`: Backend API data fetching — user can retrieve data via API.
  - Routes and menus check `view:resource`, API calls remain protected by `read:resource` on backend.
- Backend routes should call `fastify.authorize('resource:action')`. Example: `productRoutes.js` uses `products:create|read|update|delete`.
- Frontend checks permissions via `useAuthStore().hasPermission('action:resource')` and new `v-can` directive.

## Frontend Patterns

- Routing guard: `src/router/index.js` reads `meta.permission` (string or array) and redirects to `Forbidden` if missing.
- Menus: `src/layouts/MainLayout.vue` filters items using `authStore.hasPermission(item.permission)`.
- Buttons/controls: Prefer `v-can="'create:sales'"` or `v-can.hide="['update:products','manage:products']"` to auto-disable/hide based on live store state.
  - Implemented in `src/plugins/rbac.js` and registered in `src/main.js`.
- Axios auth: `src/stores/auth.js` manages token/user; `getProfile()` refreshes permissions after reload; `hasPermission` supports `manage:<resource>` and `manage:*`.

## Backend Patterns

- Register auth plugin in server: `src/plugins/auth.js` provides `authenticate` and `authorize(requiredPermission)`.
- Use `onRequest: [fastify.authorize('resource:action')]` per route where applicable (see `productRoutes.js`, `customerRoutes.js`, `saleRoutes.js`).
- Some routes currently use only `authenticate` (e.g., roles/permissions/settings) — tighten with `authorize` if restricting to specific roles is desired.

## Dev Workflows

- Start both apps (recommended): `pnpm dev` from repo root (uses `concurrently`).
- Individually:
  - Backend: `pnpm --filter @nuqtaplus/backend dev`
  - Frontend: `pnpm --filter @nuqtaplus/frontend electron:dev`
- Database:
  - Seed: `pnpm seed`
  - Drizzle: `pnpm db:generate` then `pnpm db:migrate`
- Build desktop app: `pnpm build` (packs backend into Electron via `extraResources`).

## Conventions & Examples

- Add a secure endpoint: in `routes/fooRoutes.js` use `onRequest: [fastify.authorize('foo:create')]` → controller → service.
- Add a gated view: set `meta: { permission: 'read:foo' }` in router, hide side-menu via `permission` key in menu definition, and guard buttons with `v-can`.
- Permission labels: Frontend displays and groups permissions in `views/permissions/Permissions.vue` and `views/roles/Roles.vue`.

## Quick References

- RBAC seed matrix: `src/seed.js` (`permissionsList` and default role mappings for `admin`, `manager`, `sales`).
- Models (Drizzle): `src/models/schema.js`; DB access via `src/db.js`.
- Error types: `src/utils/errors.js`; global error handler plugin: `src/plugins/errorHandler.js`.

Notes: Keep JavaScript only (no TS). Use Zod for request validation, Pinia for state, and prefer `v-can` over ad-hoc `:disabled` checks for consistent UX.
