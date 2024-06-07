import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("transaction_types")
export class TransactionType {
  @PrimaryGeneratedColumn("uuid")
  transaction_type_id!: string;

  @Column({ length: 50 })
  transaction_type_name!: string;

  @Column({ nullable: true, length: 500 })
  description!: string;

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
}
