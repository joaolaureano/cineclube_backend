import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Movie, User } from ".";

@Entity("user_movie")
export class UserMovie {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  movieId: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.movies)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.users)
  movie: Movie;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
