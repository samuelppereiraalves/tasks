import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createHabit, getHabits, updateHabit, deleteHabit } from '../controllers/habitController.js';

const router = express.Router();

router.post('/', verifyToken, createHabit);
router.get('/', verifyToken, getHabits);
router.put('/:id', verifyToken, updateHabit);
router.delete('/:id', verifyToken, deleteHabit);

export default router;
