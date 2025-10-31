import db from './db.js';
import { users, roles, permissions, rolePermissions } from './models/index.js';
import { hashPassword } from './utils/helpers.js';
import { sql, eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Helper: Count rows of a table
    const countTable = async (table) => {
      const result = await db
        .select({ count: sql`count(*)` })
        .from(table)
        .get();
      return Number(result?.count || 0);
    };

    // Helper: Insert if table empty
    const insertIfEmpty = async (table, data, label) => {
      const count = await countTable(table);
      if (count === 0) {
        await db.insert(table).values(data);
        console.log(`✓ ${label} inserted`);
      } else {
        console.log(`↩️ ${label} already exist`);
      }
    };

    // ========== ROLES ==========
    console.log('→ Creating roles...');
    await insertIfEmpty(
      roles,
      [
        { name: 'admin', description: 'Administrator with full access' },
        { name: 'manager', description: 'Manager with limited access' },
        { name: 'sales', description: 'Sales staff' },
      ],
      'Roles'
    );
    const permissionsList = {
      users: ['manage', 'create', 'read', 'update', 'delete'],
      permissions: ['manage', 'create', 'read', 'update', 'delete'],
      roles: ['manage', 'create', 'read', 'update', 'delete'],
      customers: ['manage', 'create', 'read', 'update', 'delete'],
      products: ['manage', 'create', 'read', 'update', 'delete'],
      sales: ['manage', 'create', 'read', 'update', 'delete'],
      categories: ['manage', 'create', 'read', 'update', 'delete'],
      reports: ['read'],
      dashboard: ['read'],
    };
    // ========== PERMISSIONS ==========
    console.log('\n→ Creating permissions...');
    await insertIfEmpty(
      permissions,
      Object.entries(permissionsList).flatMap(([resource, actions]) =>
        actions.map((action) => ({
          resource,
          action,
          name: `${action}:${resource}`,
          description: `${action.charAt(0).toUpperCase() + action.slice(1)} permission for ${resource}`,
        }))
      ),
      'Permissions'
    );

    // ========== ROLES ↔ PERMISSIONS ==========
    console.log('\n→ Assigning permissions to roles...');

    const allRoles = await db.select().from(roles).all();
    const allPerms = await db.select().from(permissions).all();
    const rolePermCount = await countTable(rolePermissions);

    if (rolePermCount === 0) {
      const adminRole = allRoles.find((r) => r.name === 'admin');
      const managerRole = allRoles.find((r) => r.name === 'manager');
      const salesRole = allRoles.find((r) => r.name === 'sales');

      const adminPerms = allPerms.map((p) => ({
        roleId: adminRole.id,
        permissionId: p.id,
      }));

      const managerPerms = allPerms
        .filter((p) => p.resource !== 'users' && p.action !== 'delete')
        .map((p) => ({
          roleId: managerRole.id,
          permissionId: p.id,
        }));

      const salesPerms = allPerms
        .filter(
          (p) => ['sales', 'products', 'customers'].includes(p.resource) && p.action !== 'delete'
        )
        .map((p) => ({
          roleId: salesRole.id,
          permissionId: p.id,
        }));

      await db.insert(rolePermissions).values([...adminPerms, ...managerPerms, ...salesPerms]);
      console.log('✓ Role-permission mapping completed');
    } else {
      console.log('↩️ Role-permissions already exist');
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    console.error(error.stack);
  }
}

seed();
