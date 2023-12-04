import { Request, Response } from 'express';
import * as UserServices from '../services/userServices';

// Controller para manipular operações relacionadas a usuários
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserServices.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        const user = await UserServices.getUserById(userId);
        if (user) {
            user.password
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'User not fould' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await UserServices.getUserByEmail(email);
        if (user) {
            if(user.password === password){
                res.status(200).json({ success: true, data: user });
            }else{
                res.status(401).json({ success: false, message: 'not authorized' });
            };
            
        } else {
            res.status(404).json({ success: false, message: 'user not fould' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    try {
        const newUser = await UserServices.createUser(userData);
        res.status(201).json({ success: true, data: newUser });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await UserServices.updateUserById(userId, userData);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        await UserServices.deleteUserById(userId);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, login };
