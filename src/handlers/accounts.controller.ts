import { NextFunction, Request, Response } from "express-serve-static-core";
import { datasource } from "../database/data-source";
import { Account } from "../entity/account.entity";

const getAccounts = async (req: Request, res: Response) => {
  const accounts = await datasource.getRepository(Account).find();
  res.status(200).json({ message: "account add success", data: accounts });
};

const addAccount = async (req: Request, res: Response) => {
  const account = datasource.getRepository(Account).create(req.body);
  const results = await datasource.getRepository(Account).save(account);
  res.status(201).json({ message: "account add success", data: results });
};

export { getAccounts, addAccount };
