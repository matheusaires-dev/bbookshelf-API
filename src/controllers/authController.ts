import { NextFunction, Request, Response } from "express";
import userServices from "../services/userServices";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const authController = {
    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;

            const user = await userServices.getUserByEmail(email);

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "", { expiresIn: '1h'});

                    res.status(200).json({ success: true, token });
                } else {
                    res.status(401).json({ success: false, message: 'Invalid credentials' });
                }
            } else {
                res.status(401).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            next(error)
        }
    },
};

export default authController;
