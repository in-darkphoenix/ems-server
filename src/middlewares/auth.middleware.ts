import { Request, Response, NextFunction } from "express-serve-static-core";
import { expressjwt } from "express-jwt";
import * as fs from "fs";

const RSA_PUBLIC_KEY = fs.readFileSync("keys/catsclub-public.key");

const checkIfAuthenticated = expressjwt({
  secret: RSA_PUBLIC_KEY,
  algorithms: ["RS256"],
});

const handleAuthError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Not Authorized..." });
  } else {
    next(err);
  }
};

export { checkIfAuthenticated, handleAuthError };
