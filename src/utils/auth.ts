import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_KEY

/**
 * Generates a JSON Web Token (JWT) with the given user ID and a 30-day expiration time.
 * @param id - The user ID to include in the JWT payload.
 * @returns The generated JWT.
 */
export const generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

/**
 * Verifies a JWT token using the JWT_SECRET.
 * @param token - The JWT token to verify.
 * @returns The decoded payload of the JWT token.
 */
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns A Promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

/**
 * Compares a plain text password with a hashed password using bcrypt.
 * @param password The plain text password to compare.
 * @param hashedPassword The hashed password to compare against.
 * @returns A Promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
}