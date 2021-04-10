import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { Movie } from ".";

@Entity({ name: "tag" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Movie, (movie) => movie.tags)
  @JoinTable({
    name: "movie_tag",
    joinColumn: {
      name: "movie",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag",
      referencedColumnName: "id",
    },
  })
  movies: Movie[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
@Entity({ name: "movie_tag" })
export class MovieTag {
  @PrimaryColumn()
  tag: number;

  @PrimaryColumn()
  movie: number;

  @Column()
  super: boolean;

  @Column()
  weight: number;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
