import 'dotenv/config';
import { connectDB } from '../src/db/db.js';
import { app } from '../src/socket.js';
import '../src/app.js';
import serverless from 'serverless-http';

connectDB().catch(err => console.log('Error connecting to DB', err));

export default serverless(app);