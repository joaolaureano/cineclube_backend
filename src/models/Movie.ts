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
import { Platform, Tag, User, Watched } from ".";

@Entity({ name: "movie" })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  originalTitle: string;

  @Column()
  synopsis: string;

  @Column()
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

  @ManyToMany(() => Tag, (tag) => tag.movies)
  tags: Tag[];

  @ManyToMany(() => User, (user) => user.toWatch)
  usersToWatch: User[];

  @OneToMany(() => Watched, (watched) => watched.movie)
  @JoinColumn({
    name: "movieId",
  })
  usersWatched: Watched[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
