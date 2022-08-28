import { NextFunction, Request, Response } from "express";
import joi, { Schema } from "joi";

export const validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password, email } = req.body;
    const validationSchema: Schema = joi.object({
        username: joi.string().min(6).max(30).required().alphanum(),
        password: joi.string().min(6).max(30).required().alphanum(),
        email: joi.string().email(),
    });

    try {
        await validationSchema.validateAsync({
            username,
            password,
            email,
        });
        next();
    } catch (err: any) {
        res.send(err.details[0].message);
    }
};
