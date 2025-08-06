import { app } from './socket.js'; // from above file
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';
import cors from 'cors';

const allowedOrigins = ['http://localhost:5173', 'https://your-frontend.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});
