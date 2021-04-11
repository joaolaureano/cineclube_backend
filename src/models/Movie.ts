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
import { MovieTag, Platform, Tag, User, Watched } from ".";

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

  @ManyToMany(() => Platform, (platform) => platform.movies, {
    cascade: true,
  })
  platforms: Platform[];

  @ManyToMany(() => User, (user) => user.toWatch)
  usersToWatch: User[];

  @OneToMany(() => Watched, (watched) => watched.movie)
  @JoinColumn({
    name: "movieId",
  })
  usersWatched: Watched[];

  @OneToMany(() => MovieTag, (movieTag) => movieTag.movie)
  @JoinColumn({
    name: "movieId",
  })
  moviesTags: MovieTag[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
