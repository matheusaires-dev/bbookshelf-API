import { NextFunction, Request, Response } from "express";
import userServices from "../services/userServices";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from "../helpers/ApiError";

const authController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await userServices.getUserByEmail(email);

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "");
                    return res.status(200).json({ success: true, token });
                } else {
                    throw new UnauthorizedError("Invalid credentials");
                }
            } else {
                throw new UnauthorizedError("Invalid credentials")
            }
        } catch (error) {
            next(error);
        }
    },
};

export default authController;
