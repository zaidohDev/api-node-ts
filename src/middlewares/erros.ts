import { Request, Response, NextFunction } from "express";
import { ApiErrors } from "../helpers/api-errors";

export const errorMiddleWare = (
  error: Error & Partial<ApiErrors>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Interna Server Error";

  return res.status(statusCode).json({ message });
};
