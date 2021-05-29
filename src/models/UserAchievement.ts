import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { User, Achievement } from ".";

@Entity("user_achievement")
export class UserAchievement {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  achievementId: number;

  @Column()
  currentScore: number;

  @ManyToOne(() => User, (user) => user.achievements)
  user: User;

  @ManyToOne(() => Achievement, (achievement) => achievement.users)
  achievement: Achievement;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
