import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { verifyAccessToken } from "../utils/jwt.js";
export function authMiddleware(req, res, next) {
    try {
        const bearer = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.slice(7)
            : undefined;
        const cookieToken = req.cookies && typeof req.cookies === "object"
            ? req.cookies.token
            : undefined;
        const token = bearer || cookieToken;
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" });
            return;
        }
        const decoded = verifyAccessToken(token);
        if (!decoded) {
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ success: false, message: "Token expired" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
        else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    }
}
export function errorHandlerMiddleware(err, req, res, next) {
    logger.error(`Error: ${err.message}`);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        ...(config.server.isDev && { stack: err.stack }),
    });
}
export function notFoundMiddleware(req, res, next) {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
}
