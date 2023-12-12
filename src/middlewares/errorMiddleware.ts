import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/ApiError";
import apiResponse from "../helpers/apiResponse";

const errorMiddleware = {
    apiError: (error: Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
        const statuscode = error.statuscode ?? 500;
        const message = error.statuscode ? (error.message ?? "") : 'Internal Server Error'
        return res.status(statuscode).json(apiResponse.fail(message))
    }
}

export default errorMiddleware;