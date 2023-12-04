import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

router.post('/login', UserController.login);


export default router;
