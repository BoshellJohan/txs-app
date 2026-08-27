import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            success: false,
            code: error.code,
            message: error.message
        });
    }

    console.error(error);

    return res.status(500).json({
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error'
    });
}