import { Request, Response } from "express-serve-static-core";
import { datasource as ds } from "../database/data-source";
import { Account } from "../models/account.entity";
import { CreateAccount } from "../dtos/accounts.dto";

const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await ds.getRepository(Account).find();

    res.status(200).json({ message: "account add success", data: accounts });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const getAccountById = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    const accounts = await ds
      .getRepository(Account)
      .findOneBy({ account_id: accountId });

    res.status(200).json({ message: "account add success", data: accounts });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const addAccount = async (req: Request, res: Response) => {
  try {
    const accountRequestBody: CreateAccount = req.body;

    const accountRepository = ds.getRepository(Account);
    const account = accountRepository.create(accountRequestBody);
    await accountRepository.save(account);

    res.status(201).json({ message: "account add success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const editAccount = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    const accountUpdatedBody = req.body;
    await ds.getRepository(Account).update(accountId, accountUpdatedBody);

    res.status(200).json({ message: "account edit success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    await ds.getRepository(Account).delete(accountId);

    res.status(200).json({ message: "account delete success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

export { getAccounts, addAccount, editAccount, deleteAccount, getAccountById };
