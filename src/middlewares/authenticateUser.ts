import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send("You are not logged");
    }

    try {
        const jwtPayload = await verifyJwt(token);
        console.log(jwtPayload);
        next();
    } catch (err) {
        res.status(401).send("Invalid token, you can't be authenticated!");
    }
};
