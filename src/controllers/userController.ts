import { Request, Response, NextFunction } from 'express';
import UserServices from '../services/userServices';
import { IUser } from '../models/User';
import { MongoError, MongoServerError } from 'mongodb';
import apiResponse from '../helpers/apiResponse';

const usersController = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await UserServices.getAllUsers();
      const response = apiResponse.success(users);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;
    try {
      const user = await UserServices.getUserById(userId);
      if (user) {
        res.status(200).json(apiResponse.success(user));
      } else {
        res.status(404).json(apiResponse.fail("User not found"));
      }
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction): Promise<void> => {
    const userData = req.body;
    try {
      const newUser = await UserServices.createUser(userData);
      res.status(201).json(apiResponse.success(newUser));
    } catch (error: any) {
      if (error instanceof MongoServerError) {
        if (error.code === 11000) {
          res.status(409).json(apiResponse.fail("Error creating user: Email already registered in the database."));
        } else {
          next(error);
        }
      } else {
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
        res.status(200).json(apiResponse.success(updatedUser));
      } else {
        res.status(404).json(apiResponse.fail("User not found"));
      }
    } catch (error) {
      next(error);
    }
  },

  deleteUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;
    try {
      await UserServices.deleteUserById(userId);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
