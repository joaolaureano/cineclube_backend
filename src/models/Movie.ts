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
  originalTitle: string;

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
    type: "nchar",
  })
  year: number;

  @Column()
  pathBanner: string;

  @Column()
  duration: number;

  @ManyToMany(() => Platform, (platform) => platform.movies, {
    cascade: true,
  })
  platforms: Platform[];

  @ManyToMany(() => User, (user) => user.toWatch)
  usersToWatch: User[];

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

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
