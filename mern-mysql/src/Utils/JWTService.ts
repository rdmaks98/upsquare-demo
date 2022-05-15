import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../../Config";

const privateKey = JWT_SECRET as string;

export default class Jwtservice {
    static sign(payload: Object, expiry = JWT_EXPIRE, secret = privateKey) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
    static verify(token: string, secret = privateKey) {
        return jwt.verify(token, secret);
    }
}