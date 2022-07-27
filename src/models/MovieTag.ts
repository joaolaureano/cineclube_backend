import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Movie, Tag } from ".";

@Entity({ name: "movie_tag" })
export class MovieTag {
  @PrimaryColumn()
  tag_id: number;

  @PrimaryColumn()
  movieId: number;

  @Column()
  super: boolean;

  @Column()
  weight: number;

  @ManyToOne(() => Tag, (tag) => tag.moviesTags)
  tag: Tag;

  @ManyToOne(() => Movie, (movie) => movie.moviesTags)
  movie: Movie;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
