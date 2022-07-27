import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Movie, Actor } from ".";

@Entity("movie_cast")
export class Cast {
  @PrimaryColumn()
  actorId: number;

  @PrimaryColumn()
  movieId: number;

  @Column()
  director: boolean;

  @ManyToOne(() => Actor, (actor) => actor.cast)
  actor: Actor;

  @ManyToOne(() => Movie, (movie) => movie.cast)
  movie: Movie;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
