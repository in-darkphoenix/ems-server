import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("passwords")
export class Password {
  @PrimaryGeneratedColumn("uuid")
  password_id!: string;

  @Column({ length: 100 })
  account_name!: string;

  @Column({ nullable: true, type: "text" })
  account_url!: URL;

  @Column({ length: 150 })
  hashed_password!: string;

  @Column({ length: 100 })
  original_password!: string;

  @Column({ nullable: true, length: 500 })
  description!: string;

  @CreateDateColumn({ nullable: true, type: "timestamptz", default: null })
  expiry_date!: Date;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;
}
