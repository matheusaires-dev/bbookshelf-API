import { Request, Response, NextFunction } from 'express';
import UserServices from '../services/userServices';
import { IUser } from '../models/User';
import { MongoError, MongoServerError } from 'mongodb';

const usersController = {

    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users = await UserServices.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
        try {
            const user = await UserServices.getUserById(userId);
            if (user) {
                user.password
                res.status(200).json({ success: true, data: user });
            } else {
                res.status(404).json({ success: false, message: 'User not fould' });
            }
        } catch (error) {
            next(error);
        }
    },

    createUser: async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction): Promise<void> => {
        const userData = req.body;
        try {
            const newUser = await UserServices.createUser(userData);
            res.status(201).json({ success: true, data: newUser });
        } catch (error:any) {
            if (error instanceof MongoServerError) {
                if (error.code === 11000) {
                    res.status(409).json({ success: true, message: "Error creating user: Email already registered in the database." });
                } else {
                    next(error);
                }
            } else {
                console.log(error.message)
                next(error);
            }
        }
    },

    updateUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
        const userData = req.body;
        try {
            const updatedUser = await UserServices.updateUserById(userId, userData);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            next(error);
        }
    },

    deleteUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
        try {
            await UserServices.deleteUserById(userId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
}


export default usersController;
