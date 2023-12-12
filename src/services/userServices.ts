import { ObjectId } from "mongoose";
import UserModel, { IUser, IUserModel } from "../models/User";

const userServices = {
    createUser: async (userData: IUser): Promise<IUserModel> => {
        const newUser = new UserModel(userData);
        return await newUser.save();
    },

    getAllUsers: async (): Promise<IUserModel[]> => {
        try {
            return await UserModel.find().exec();
        } catch (error: any) {
            throw new Error(`Erro ao obter todos os usuários: ${error.message}`);
        }
    },

    getUserById: async (userId: string): Promise<IUserModel | null> => {
        try {
            return await UserModel.findById(userId).exec();
        } catch (error: any) {
            throw new Error(`Erro ao obter usuário por ID: ${error.message}`);
        }
    },

    getUserByEmail: async (email: string): Promise<IUserModel | null> => {
        try {
            return await UserModel.findOne({ email }).exec();
        } catch (error: any) {
            throw new Error(error.message);
        }
    },

    updateUserById: async (
        userId: string,
        userData: Partial<IUser>
    ): Promise<IUserModel | null> => {
        try {
            return await UserModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
        } catch (error: any) {
            throw new Error(`Erro ao atualizar usuário por ID: ${error.message}`);
        }
    },

    deleteUserById: async (userId: string): Promise<void> => {
        try {
            await UserModel.findByIdAndDelete(userId).exec();
        } catch (error: any) {
            throw new Error(`Erro ao excluir usuário por ID: ${error.message}`);
        }
    }

}



export default userServices;
