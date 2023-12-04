import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  favorites?: string[];
  reading?: { bookId: string; pag: number }[];
}

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  favorites?: string[];
  reading?: { bookId: string; pag: number }[];
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: { type: [String], default: undefined },
    reading: { type: [{ bookId: String, pag: Number }], default: undefined },
  },
);

const UserModel = mongoose.model<IUserModel>('users', UserSchema);

export default UserModel;
