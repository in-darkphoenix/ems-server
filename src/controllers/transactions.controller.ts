import { Request, Response } from "express-serve-static-core";
import { datasource as ds } from "../database/data-source";
import { Transaction } from "../models/transaction.entity";
import { CreateTransaction } from "../dtos/transactions.dto";

/**
 * Gets todays (or queried date) all transaction data logged in database
 * @request_query date (optional)
 */
const getTransactions = async (req: Request, res: Response) => {
  try {
    const date: Date | any = req.query.date;
    const today: Date = date ? new Date(date) : new Date();

    const day = today.getDate(); // Day of the month (1-31)
    const month = today.getMonth() + 1; // Months are zero-based, so add 1 (0-11)
    const year = today.getFullYear(); // Full year (e.g., 2024)

    const transactions = await ds
      .getRepository(Transaction)
      .createQueryBuilder("t")
      .select([
        "t.transaction_id",
        "t.title",
        "t.amount",
        "t.description",
        "t.transaction_offset",
        "t.created_at",
      ])
      .leftJoin("t.account", "a")
      .addSelect(["a.account_id", "a.account_name"])
      .leftJoin("t.category", "c")
      .addSelect(["c.category_id", "c.category_name"])
      .where("extract(month from t.created_at) = :month", { month })
      .andWhere("extract(year from t.created_at) = :year", { year })
      .andWhere("extract(day from t.created_at) = :day", { day })
      .orderBy("t.created_at", "DESC")
      .getMany();

    res.status(200).json({
      message: "transactions fetch success",
      data: transactions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

const addTransaction = async (req: Request, res: Response) => {
  try {
    const transactionRequestBody: CreateTransaction = req.body;
    if (!transactionRequestBody.created_at) {
      delete transactionRequestBody.created_at;
    }

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
    const requestBody = req.body;
    const transactionUpdatedBody = {
      title: requestBody.title,
      description: requestBody.description,
      transaction_offset: requestBody.transaction_type,
      created_at: requestBody.transaction_date,
      account: requestBody.account,
      category: requestBody.category,
    };

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
