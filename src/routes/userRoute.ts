import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

// Definir rotas para operações relacionadas a usuários
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getUserById);
router.get('/users/:userId', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:userId', UserController.updateUserById);
router.delete('/users/:userId', UserController.deleteUserById);

export default router;
