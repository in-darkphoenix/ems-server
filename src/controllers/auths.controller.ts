import { Request, Response } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import { ILoginUser } from "../dtos/auths.dto";
import { validateUserCrendentials } from "../services/auth.service";

const RSA_PRIVATE_KEY = fs.readFileSync("keys/catsclub-private.key");

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password }: ILoginUser = req.body;
    let statusCode: number = 200;

    const validationResult = await validateUserCrendentials(username, password);
    if (!validationResult?.success) {
      statusCode = 401;
      res.status(statusCode).json({ message: validationResult?.message });
    }

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "30m",
      subject: validationResult?.payload?.user_id,
    });

    res.cookie("SESSIONID", jwtBearerToken, { httpOnly: true, secure: true });

    res.status(statusCode).json({
      message: validationResult?.message,
      id_token: jwtBearerToken,
      expires_in: "30m",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

export { loginHandler };
