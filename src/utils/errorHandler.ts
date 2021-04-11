import { Response, Request, NextFunction } from "express";

export function errorhandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: err.message,
    });
  }
  next();
}
