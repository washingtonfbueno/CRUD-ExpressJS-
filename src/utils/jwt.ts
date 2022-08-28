import jsonwebtoken, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export interface Payload {
    id: number;
    username: string;
    email: string;
}

type Err = Error | null;

const jwtKey: string = process.env.JWT_KEY || "default";

export const generateJwt = (payload: Payload): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(
            payload,
            jwtKey,
            { expiresIn: "1hr" },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            }
        );
    });
};

export const verifyJwt = (
    token: any
): Promise<JwtPayload | JsonWebTokenError> => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, jwtKey, (err: any, decoded: any) => {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};
