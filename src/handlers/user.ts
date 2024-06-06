import { NextFunction, Request, Response } from "express-serve-static-core";
import { AddUserDTO } from "../dtos/AddUser.dto";
import { AddUserQueryParams } from "../types/user.query-params";

const getUsers = (req: Request, res: Response) => {
  // extend interface
  // console.log(req.customField);
  // use express-session
  console.log(req.session, req.sessionID, req.sessionStore);
  // use passport
  console.log(req.user);
  // res.status(200).json([{ message: "get users" }]);
  res.send([]);
};

const getUserById = (req: Request, res: Response) => {
  res.status(200).json({ message: "get user by id" });
};

const addUser = (
  req: Request<{}, {}, AddUserDTO, AddUserQueryParams>,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const loginAfterCreate = req.query.login_after_create;

  console.log({ username, email, password, loginAfterCreate });

  res.status(201).json({ message: "user created" });
};

export { getUsers, getUserById, addUser };
