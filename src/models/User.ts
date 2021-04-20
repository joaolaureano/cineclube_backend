import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Movie, (movie) => movie.usersToWatch)
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
