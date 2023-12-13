import { NextFunction, Request, Response } from "express";
import { ApiError, BadRequestError } from "../helpers/ApiError";
import apiResponse from "../helpers/apiResponse";

const errorMiddleware = {
    logError: (error: Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        throw error
    },
    apiError: (error: Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
        const statuscode = error.statusCode ?? 500;
        const message = error.statusCode ? (error.message ?? "") : 'Internal Server Error'
        return res.status(statuscode).json(apiResponse.fail(message))
    },
}

export default errorMiddleware;