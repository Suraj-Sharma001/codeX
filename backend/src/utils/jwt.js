import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
export function generateAccessToken(payload) {
    const options = { expiresIn: config.jwt.expiresIn };
    return jwt.sign(payload, config.jwt.secret, options);
}
export function generateRefreshToken(payload) {
    const options = { expiresIn: config.jwt.refreshExpiresIn };
    return jwt.sign(payload, config.jwt.refreshSecret, options);
}
export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, config.jwt.secret);
    }
    catch {
        return null;
    }
}
export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, config.jwt.refreshSecret);
    }
    catch {
        return null;
    }
}
