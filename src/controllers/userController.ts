import { Request, Response } from "express";
import { userModel } from "../database/models/User";
import bcrypt from "bcrypt";
import { generateJwt, Payload, verifyJwt } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
    let {
        username,
        password,
        email,
    }: { username: string; password: string; email: string } = req.body;

    password = await bcrypt.hash(password, 10);

    try {
        const accountCreated = await userModel.create({
            username,
            password,
            email,
        });

        res.status(201).json(accountCreated);
    } catch (err) {
        res.status(401).send("Username or email being used already!");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    let { username, password }: { username: string; password: string } =
        req.body;

    let user: any = await userModel.findOne({
        where: { username },
    });

    if (!user) {
        return res.send("User not found");
    }

    const validPassword: boolean = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        return res.send("Wrong password");
    }

    const payload: Payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    const token = await generateJwt(payload);

    res.json(token);
};
