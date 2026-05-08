import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";

export const errorHandler = (
  err: AxiosError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AxiosError) {
    return res.status(err.response?.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};
