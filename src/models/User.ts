import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export type role = 'adm' | 'mod' | 'usr';
export type favorites = string[];
export type reading = Array<{ bookId: string; pag: number }>

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: role;
  favorites?: favorites;
  reading?: reading;
}

export interface IUserModel extends IUser, Document { }

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'usr' },
    favorites: { type: [String], default: undefined },
    reading: { type: [{ bookId: String, pag: Number }], default: undefined },
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

const UserModel = mongoose.model<IUserModel>('users', UserSchema);

export default UserModel;
