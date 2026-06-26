import type { NextFunction, Request, Response } from "express";

export const customMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    console.log("Metodo: " + req.method + " - path: "+ req.path +" - Time: " + new Date());
    next();
};
