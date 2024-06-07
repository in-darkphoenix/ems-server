import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("monthly_summaries")
export class MonthlySummary {
  @PrimaryGeneratedColumn("uuid")
  summary_id!: string;

  @Column({ length: 2 })
  month!: string;

  @Column({ length: 4 })
  year!: string;

  @Column("decimal", { precision: 5, scale: 2 })
  opening_balance!: number;

  @Column("decimal", { precision: 5, scale: 2 })
  transacted_balance!: number;

  @Column("decimal", { precision: 5, scale: 2 })
  closing_balance!: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;
}
