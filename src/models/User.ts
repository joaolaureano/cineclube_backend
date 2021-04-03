import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  photoPath: string;

  @Column()
  randomness: number;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
