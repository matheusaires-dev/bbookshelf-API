import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authMiddleware.validateLoginBody , authController.login);


export default router;
