import 'dotenv/config';

const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '127.0.0.1',
    env: process.env.NODE_ENV || 'development',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
    expiresIn: '7d',
  },
  database: {
    path: process.env.DATABASE_PATH || './packages/backend/data/codelims.db',
  },
  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || '1000000', 10),
    timeWindow: parseInt(process.env.RATE_LIMIT_TIMEWINDOW || '900000', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    pretty: process.env.NODE_ENV === 'development',
  },
  cors: {
    origin: true,
    credentials: true,
  },
};

export default config;
