import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models/index.js',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './data/codelims.db',
  },
  verbose: true,
  strict: true,
});
