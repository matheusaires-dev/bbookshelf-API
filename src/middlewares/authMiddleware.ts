import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userServices from "../services/userServices";
import { IUser, role } from "../models/User";
import apiResponse from "../helpers/apiResponse";

const authMiddleware = {
    validateLoginBody: (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json(apiResponse.fail("Email and password are required"));
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },

    authenticate: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (token) {

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

                const { userId } = decoded as { userId: string }

                const user = await userServices.getUserById(userId) as IUser;

                req.user = user;

                next();

            } catch (error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    res.status(403).json(apiResponse.fail(`${error.name}: ${error.message}`));
                };
            }

        } else {
            res.status(401).json(apiResponse.fail("Token not provided"));
        }
    },

    checkUserRole: (role: role) => {
        return (req: Request, res: Response, next: NextFunction): void => {

            const user = req.user

            if (user.role === role || user.role === "adm") {
                next();
            } else {
                res.status(403).json(apiResponse.fail("Permission denied"));
            }
        }
    },

}

export default authMiddleware