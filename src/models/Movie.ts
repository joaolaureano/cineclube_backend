import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Platform, Tag, User } from ".";

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

  @ManyToMany((type) => Platform, (platform) => platform.movies, {
    cascade: true,
  })
  platforms: Platform[];

  @ManyToMany((type) => Tag, (tag) => tag.movies)
  tags: Tag[];

  @ManyToMany((type) => User, (user) => user.toWatch)
  usersToWatch: User[];

  @ManyToMany((type) => User, (user) => user.watched)
  usersWatched: User[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
