import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createFinance, getFinances, updateFinance, deleteFinance } from '../controllers/financeController.js';

const router = express.Router();

router.post('/', verifyToken, createFinance);
router.get('/', verifyToken, getFinances);
router.put('/:id', verifyToken, updateFinance);
router.delete('/:id', verifyToken, deleteFinance);

export default router;
