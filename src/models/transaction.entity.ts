import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TransactionType } from "./transaction_type.entity";
import { Account } from "./account.entity";
import { Category } from "./category.entity";
import { User } from "./user.entity";
import { TransactionOffset } from "../database/enums";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  transaction_id!: string;

  @Column({ length: 50 })
  title!: string;

  @Column({ nullable: true, length: 300 })
  description!: string;

  @Column({ nullable: true, length: 500 })
  notes!: string;

  @Column({
    type: "enum",
    enum: TransactionOffset,
    default: TransactionOffset.DEBIT,
  })
  transaction_offset!: TransactionOffset;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.transaction_type_id
  )
  @JoinColumn({ name: "transaction_type_id" })
  transactionType!: TransactionType;

  @ManyToOne(() => Account, (account) => account.account_id)
  @JoinColumn({ name: "account_id" })
  account!: Account;

  @ManyToOne(() => Category, (category) => category.category_id)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: "user_id" })
  user!: User;
}