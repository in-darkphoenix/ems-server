import handlebars from "handlebars";
import fs from "fs";
import pdf from "html-pdf-node";
import { Transaction } from "../models/transaction.entity";

const generatePDF = async (data: Transaction[]) => {
  let total = 0;
  const bankStatementData = {
    accountHolder: "Ankit Kumar",
    accountNumber: "1234567890",
    statementDate: new Date().toLocaleString(),
    transactions: data.map((e) => {
      total += Number(e.amount);

      return {
        date: new Date(e.created_at).toLocaleString(),
        description: e.title,
        account: e.account.account_name,
        category: e.category.category_name,
        amount:
          e.transaction_offset === "DEBIT" ? "-" + e.amount : "+" + e.amount,
      };
    }),
    totalExpended: total,
  };

  const htmlTemplate = fs.readFileSync(
    "src/resources/bank_statement.html",
    "utf-8"
  );
  const template = handlebars.compile(htmlTemplate);
  const renderedHtml = template(bankStatementData);

  const options = { format: "A4" };
  const file = { content: renderedHtml };
  const pdfBuffer = pdf.generatePdf(file, options);

  return pdfBuffer;
};

export { generatePDF };
