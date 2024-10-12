import { Request, Response } from "express-serve-static-core";
import { datasource as ds } from "../database/data-source";
import { Transaction } from "../models/transaction.entity";
import { generatePDF } from "../services/pdf.service";

const generatePDFHandler = async (req: Request, res: Response) => {
  try {
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    const transactions = await ds
      .getRepository(Transaction)
      .createQueryBuilder("t")
      .select(["t.title", "t.amount", "t.transaction_offset", "t.created_at"])
      .leftJoin("t.account", "a")
      .addSelect(["a.account_name"])
      .leftJoin("t.category", "c")
      .addSelect(["c.category_name"])
      .where("extract(month from t.created_at) = :month", { month })
      .andWhere("extract(year from t.created_at) = :year", { year })
      .orderBy("t.created_at", "DESC")
      .getMany();

    const pdfBytes = await generatePDF(transactions);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=bank-statement.pdf");
    res.status(200).send(pdfBytes);
  } catch (err: any) {
    res.status(500).json({ message: "something went wrong", error: err });
  }
};

export { generatePDFHandler };
