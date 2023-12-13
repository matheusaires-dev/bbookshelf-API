import { Request, Response, NextFunction } from 'express';
import UserServices from '../services/userServices';
import { IUser } from '../models/User';
import { MongoError, MongoServerError } from 'mongodb';
import apiResponse from '../helpers/apiResponse';
import { BadRequestError, ConflictError } from '../helpers/ApiError';
import { Error } from 'mongoose';

const usersController = {
    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const users = await UserServices.getAllUsers();
        const response = apiResponse.success(users);
        res.status(200).json(response);
    },

    getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
        const user = await UserServices.getUserById(userId);
        if (user) {
            res.status(200).json(apiResponse.success(user));
        } else {
            res.status(404).json(apiResponse.fail("User not found"));
        }
    },

    createUser: async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
        try {
            const userData = req.body;
            const newUser = await UserServices.createUser(userData);

            return res.status(201).json(apiResponse.success(newUser));

        } catch (error) {
            if (error instanceof MongoServerError) {
                if (error.code === 11000) {
                    throw new ConflictError("Error creating user: Email already registered in the database.");
                }
                next(error);
            };

            if (error instanceof Error.ValidationError) {
                throw new BadRequestError(error.message);
            }

            console.log(error)

            next(error);
        }
    },

    updateUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
        const userData = req.body;
        const updatedUser = await UserServices.updateUserById(userId, userData);
        if (updatedUser) {
            res.status(200).json(apiResponse.success(updatedUser));
        } else {
            res.status(404).json(apiResponse.fail("User not found"));
        }
    },

    deleteUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { userId } = req.params;
        await UserServices.deleteUserById(userId);
        res.status(204).end();
    },
};

export default usersController;
