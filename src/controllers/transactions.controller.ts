import { Request, Response } from "express-serve-static-core";
import { datasource as ds } from "../database/data-source";
import { Transaction } from "../models/transaction.entity";
import { CreateTransaction } from "../dtos/transactions.dto";
import { Between } from "typeorm";
import { getEndOfDay, getStartOfDay } from "../utils/datetime.utils";

const getTransactions = async (req: Request, res: Response) => {
  try {
    const date: Date | any = req.query.date;
    const today: Date = date ? new Date(date) : new Date();

    const startOfDay = getStartOfDay(today);
    const endOfDay = getEndOfDay(today);

    const transactions = await ds.getRepository(Transaction).find({
      select: {
        account: { account_id: true, account_name: true },
        category: { category_id: true, category_name: true },
      },
      relations: {
        account: true,
        category: true,
      },
      where: {
        created_at: Between(startOfDay, endOfDay),
      },
      order: { created_at: "DESC" },
    });

    res.status(200).json({
      message: "transactions fetch success",
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const addTransaction = async (req: Request, res: Response) => {
  try {
    const transactionRequestBody: CreateTransaction = req.body;

    const transactionRepository = ds.getRepository(Transaction);
    const transaction = transactionRepository.create(transactionRequestBody);
    await transactionRepository.save(transaction);

    res.status(201).json({ message: "transaction add success" });
  } catch (err: any) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const editTransaction = async (req: Request, res: Response) => {
  try {
    const transactionId: string = req.params.id;
    const transactionUpdatedBody: CreateTransaction = req.body;

    await ds
      .getRepository(Transaction)
      .update(transactionId, transactionUpdatedBody);

    res.status(200).json({ message: "transaction edit success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transactionId: string = req.params.id;
    await ds.getRepository(Transaction).delete(transactionId);

    res.status(200).json({ message: "transaction delete success" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

export { getTransactions, addTransaction, editTransaction, deleteTransaction };
