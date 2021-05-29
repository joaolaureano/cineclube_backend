import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAchievement, AchievementTag } from ".";

@Entity({ name: "achievement" })
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  pathImage: string;

  @Column()
  targetScore: number;

  @OneToMany(
    () => UserAchievement,
    (userAchievemnt) => userAchievemnt.achievement
  )
  @JoinColumn({
    name: "achievementId",
  })
  users: UserAchievement[];

  @OneToOne(
    () => AchievementTag,
    (achievementTag) => achievementTag.achievement
  )
  tag: AchievementTag;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
