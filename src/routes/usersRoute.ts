import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/users', authMiddleware.authenticate, authMiddleware.checkUserRole('adm'), userController.getAllUsers);
router.get('/users/:userId', authMiddleware.authenticate, authMiddleware.checkUserRole('adm'), userController.getUserById);
router.post('/users', authMiddleware.authenticate, authMiddleware.checkUserRole('adm'), userController.createUser);
router.put('/users/:userId', authMiddleware.authenticate, authMiddleware.checkUserRole('adm'), userController.updateUserById);
router.delete('/users/:userId', authMiddleware.authenticate, authMiddleware.checkUserRole('adm'), userController.deleteUserById);

export default router;
