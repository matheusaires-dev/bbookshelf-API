import { Types } from "mongoose";
import UserModel, { IUser, IUserModel } from "../models/User";

const userServices = {
    createUser: async (userData: IUser): Promise<IUserModel> => {
        try {
            const newUser = new UserModel(userData);
            return await newUser.save();
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    },

    getAllUsers: async (): Promise<IUserModel[]> => {
        try {
            return await UserModel.find().exec();
        } catch (error: any) {
            throw new Error(`Error getting all users: ${error.message}`);
        }
    },

    getUserById: async (userId: string): Promise<IUserModel | null> => {
        try {
            return await UserModel.findById(userId).exec();
        } catch (error: any) {
            throw new Error(`Error getting user by ID: ${error.message}`);
        }
    },

    getUserByEmail: async (email: string): Promise<IUserModel | null> => {
        try {
            return await UserModel.findOne({ email }).exec();
        } catch (error: any) {
            throw new Error(`Error getting user by email: ${error.message}`);
        }
    },

    updateUserById: async (
        userId: string,
        userData: Partial<IUser>
    ): Promise<IUserModel | null> => {
        try {
            return await UserModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
        } catch (error: any) {
            throw new Error(`Error updating user by ID: ${error.message}`);
        }
    },

    deleteUserById: async (userId: string): Promise<void> => {
        try {
            await UserModel.findByIdAndDelete(userId).exec();
        } catch (error: any) {
            throw new Error(`Error deleting user by ID: ${error.message}`);
        }
    },
};

export default userServices;
