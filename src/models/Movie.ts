import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MovieTag, Platform, User, UserMovie, Cast } from ".";

@Entity({ name: "movie" })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column({
    type: "text",
  })
  synopsis: string;

  @Column({
    type: "text",
  })
  critic: string;

  @Column()
  curator: string;

  @Column({
    length: 4,
    type: "varchar",
  })
  year: number;

  @Column({
    type: "text",
  })
  pathBanner: string;

  @Column()
  duration: number;

  @ManyToMany(() => Platform, (platform) => platform.movies, {
    cascade: true,
  })
  platforms: Platform[];

  @OneToMany(() => UserMovie, (userMovie) => userMovie.movie)
  @JoinColumn({
    name: "movieId",
  })
  users: UserMovie[];

  @OneToMany(() => MovieTag, (movieTag) => movieTag.movie)
  @JoinColumn({
    name: "movieId",
  })
  moviesTags: MovieTag[];

  @OneToMany(() => Cast, (cast) => cast.movie)
  @JoinColumn({
    name: "movieId",
  })
  cast: Cast[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
