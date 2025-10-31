import Fastify from 'fastify';
import config from './config.js';
// Plugins
import securityPlugin from './plugins/security.js';
import authPlugin from './plugins/auth.js';
import errorHandlerPlugin from './plugins/errorHandler.js';
// import ensureDatabasePlugin from './plugins/ensureDatabase.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import rbacRoutes from './routes/rbacRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';

// Initialize Fastify
const fastify = Fastify({
  logger: {
    level: config.logging.level,
    transport: config.logging.pretty
      ? {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
    options: { colorize: true },
  },
});

// Register plugins
await fastify.register(securityPlugin);
await fastify.register(authPlugin);
await fastify.register(errorHandlerPlugin);

// Health check route
fastify.get('/', async () => {
  return {
    status: 'ok',
    service: 'CodeLIMS Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  };
});

fastify.get('/health', async () => {
  return {
    status: 'healthy',
    database: 'connected',
    timestamp: new Date().toISOString(),
  };
});

// Register API routes
await fastify.register(authRoutes, { prefix: '/api/auth' });
await fastify.register(customerRoutes, { prefix: '/api/customers' });
await fastify.register(productRoutes, { prefix: '/api/products' });
await fastify.register(saleRoutes, { prefix: '/api/sales' });
await fastify.register(categoryRoutes, { prefix: '/api/categories' });
await fastify.register(rbacRoutes, { prefix: '/api/rbac' });
await fastify.register(userRoutes, { prefix: '/api/users' });
await fastify.register(roleRoutes, { prefix: '/api/roles' });
await fastify.register(permissionRoutes, { prefix: '/api/permissions' });
await fastify.register(currencyRoutes, { prefix: '/api/currencies' });

// Start server
const start = async () => {
  try {
    await fastify.listen({
      port: config.server.port,
      host: config.server.host,
    });

    fastify.log.info(`Server running on http://${config.server.host}:${config.server.port}`);
    fastify.log.info(`Environment: ${config.server.env}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle shutdown gracefully
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    fastify.log.info(`Received ${signal}, closing server...`);
    await fastify.close();
    process.exit(0);
  });
});

start();
