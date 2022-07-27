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

@Entity({ name: "app_user" })
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
    name: "user_id",
  })
  movies: UserMovie[];

  @OneToMany(() => UserTag, (userTag) => userTag.user)
  @JoinColumn({
    name: "user_id",
  })
  userTags: UserTag[];

  @OneToMany(() => UserAchievement, (userAchievemnt) => userAchievemnt.user)
  @JoinColumn({
    name: "user_id",
  })
  achievements: UserAchievement[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
