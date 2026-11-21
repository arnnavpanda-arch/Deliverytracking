import { app } from '../server/server.js';
import { connectDB } from '../server/config/db.js';
import { seedDatabase } from '../server/utils/seed.js';

let isReady = false;

export default async function handler(req, res) {
  if (!isReady) {
    try {
      await connectDB();
      await seedDatabase();
      isReady = true;
    } catch (err) {
      console.error('[Vercel Serverless] DB connection error:', err.message);
    }
  }
  return app(req, res);
}
