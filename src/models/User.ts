import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Index("idx-email", { unique: true })
  @Column()
  email: string;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
