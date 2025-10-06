import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.post('/', verifyToken, createNote);
router.get('/', verifyToken, getNotes);
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote);

export default router;
