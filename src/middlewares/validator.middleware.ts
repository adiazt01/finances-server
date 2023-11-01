import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * Middleware function that validates the request body against a given schema using Zod.
 * If the validation fails, it sends a 400 response with the error message.
 * If the validation succeeds, it sets the validated data as the new request body and calls the next middleware.
 * @param schema - The Zod schema to validate the request body against.
 * @returns An Express middleware function.
 */
export const validatorSchema = (schema:ZodSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction, 
) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    res.status(400).json({error: error.errors.map((err: any) => err.message)});
  }
};
