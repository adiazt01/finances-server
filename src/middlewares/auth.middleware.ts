import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Verifies the token in the request header and sets the user ID in the request object.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.cookie?.split("=")[1];
        const JWT_SECRET = process.env.JWT_KEY
        const decoded = await jwt.verify(token, JWT_SECRET, { expiresIn: "30d", algorithm: "HS256"});
        req.userId = decoded.id;
        console.log(req.userId);
        next();
    } catch (err) {
        res.status(401).json({ message: err});
    }
}