import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/tasksRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import goalRoutes from './routes/goalsRoutes.js';
import habitRoutes from './routes/habitsRoutes.js';
import noteRoutes from './routes/notesRoutes.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Rotas públicas
app.use('/api/auth', authRoutes)

//Rotas privadas
app.use('/api/tasks', verifyToken, taskRoutes)
app.use('/api/finance', verifyToken, financeRoutes)
app.use('/api/goals', verifyToken, goalRoutes)
app.use('/api/habits', verifyToken, habitRoutes)
app.use('/api/notes', verifyToken, noteRoutes)

const PORT = process.env.PORT || 8888;
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Running on port: ${PORT}`)))
    .catch(err =>  console.error(err))