import UserModel, { IUser, IUserModel } from "../models/User";

const createUser = async (userData: IUser): Promise<IUserModel> => {
    try {
        const newUser = new UserModel(userData);
        return await newUser.save();
    } catch (error: any) {
        if (error.code === 11000) {
            throw new Error(`Erro ao criar usuário: email já cadastrado na base`);
        }
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
};

const getAllUsers = async (): Promise<IUserModel[]> => {
    try {
        return await UserModel.find().exec();
    } catch (error: any) {
        throw new Error(`Erro ao obter todos os usuários: ${error.message}`);
    }
};

const getUserById = async (userId: string): Promise<IUserModel | null> => {
    try {
        return await UserModel.findById(userId).exec();
    } catch (error: any) {
        throw new Error(`Erro ao obter usuário por ID: ${error.message}`);
    }
};

const getUserByEmail = async (email: string): Promise<IUserModel | null> => {
    try {
        return await UserModel.findOne({ email }).exec();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const updateUserById = async (
    userId: string,
    userData: Partial<IUser>
): Promise<IUserModel | null> => {
    try {
        return await UserModel.findByIdAndUpdate(userId, userData, { new: true }).exec();
    } catch (error: any) {
        throw new Error(`Erro ao atualizar usuário por ID: ${error.message}`);
    }
};

const deleteUserById = async (userId: string): Promise<void> => {
    try {
        await UserModel.findByIdAndDelete(userId).exec();
    } catch (error: any) {
        throw new Error(`Erro ao excluir usuário por ID: ${error.message}`);
    }
};


export { createUser, getAllUsers, getUserById, getUserByEmail, updateUserById, deleteUserById };
