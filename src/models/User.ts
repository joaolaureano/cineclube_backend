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
import { Movie, Watched } from ".";

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

  @OneToMany(() => Watched, (watched) => watched.user)
  @JoinColumn({
    name: "userId",
  })
  watched: Watched[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
