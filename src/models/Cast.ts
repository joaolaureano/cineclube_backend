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
  actor_id: number;

  @PrimaryColumn()
  movie_id: number;

  @Column()
  director: boolean;

  @ManyToOne(() => Actor, (actor) => actor.cast)
  actor: Actor;

  @ManyToOne(() => Movie, (movie) => movie.cast)
  movie: Movie;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
