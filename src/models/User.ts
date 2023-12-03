import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    favorites: number[];
    keepReading: { bookId: string; pag: number }[];
}

export interface IUserModel extends Document { }

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: Number }],
    keepReading: [
        {
            bookId: { type: String, required: true },
            pag: { type: Number, required: true },
        },
    ],
});

const UserModel = mongoose.model<IUserModel>('users', UserSchema);

export default UserModel;
