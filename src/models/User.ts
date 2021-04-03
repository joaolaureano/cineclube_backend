import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Movie } from ".";

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

  @ManyToMany((type) => Movie, (movie) => movie.usersToWatch)
  @JoinTable({
    name: "toWatch",
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "movie",
      referencedColumnName: "id",
    },
  })
  toWatch: Movie[];

  @ManyToMany((type) => Movie, (movie) => movie.usersWatched)
  @JoinTable({
    name: "watched",
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "movie",
      referencedColumnName: "id",
    },
  })
  watched: Movie[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}

@Entity("watched")
export class Watched {
  @PrimaryColumn()
  user: number;

  @PrimaryColumn()
  movie: number;

  @Column()
  liked: boolean;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
