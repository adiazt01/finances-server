import { Request, Response } from "express";
import { User } from "../models/User";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email: email } });
    if (!userFound) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(userFound.id.toString());
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login success", user: userFound });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { email: email } });
    if (userFound) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = generateToken(newUser.id.toString());
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Register success", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout success" });
};
