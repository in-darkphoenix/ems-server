import { TransactionOffset } from "../database/enums";

export interface CreateTransaction {
  title: string;
  description: string;
  transaction_offset: TransactionOffset;
  created_at?: Date;
  account_id: string;
  category_id: string;
  user_id: string;
}
