import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Movie, UserMovie } from ".";

@Entity({ name: "user" })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  photoPath: string;

  @Column()
  randomness: number;

  @OneToMany(() => UserMovie, (userMovie) => userMovie.user)
  @JoinColumn({
    name: "userId",
  })
  movies: UserMovie[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
