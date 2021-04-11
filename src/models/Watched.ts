import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Movie, User } from ".";

@Entity("watched")
export class Watched {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  movieId: number;

  @Column()
  liked: boolean;

  @ManyToOne(() => User, (user) => user.watched)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.usersWatched)
  movie: Movie;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
