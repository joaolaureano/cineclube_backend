import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserMovie, UserTag, UserAchievement } from ".";

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

  @OneToMany(() => UserMovie, (userMovie) => userMovie.user)
  @JoinColumn({
    name: "userId",
  })
  movies: UserMovie[];

  @OneToMany(() => UserTag, (userTag) => userTag.user)
  @JoinColumn({
    name: "userId",
  })
  userTags: UserTag[];

  @OneToMany(() => UserAchievement, (userAchievemnt) => userAchievemnt.user)
  @JoinColumn({
    name: "userId",
  })
  achievements: UserAchievement[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
