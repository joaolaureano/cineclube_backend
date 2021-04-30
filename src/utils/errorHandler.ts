import { Response, Request, NextFunction } from "express";
import { ValidateError } from "tsoa";

export function errorhandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    return res.status(err.status).json({ ...err, success: false });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: err.message,
      success: false,
    });
  }

  next();
}
