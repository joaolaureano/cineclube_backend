import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Tag, Achievement } from ".";

@Entity("achievement_tag")
export class AchievementTag {
  @PrimaryColumn()
  achievementId: number;

  @PrimaryColumn()
  tagId: number;

  @Column()
  totalPoint: number;

  @ManyToOne(() => Tag, (tag) => tag.achievements)
  tag: Tag;

  @OneToOne(() => Achievement, (achievement) => achievement.tag)
  achievement: Achievement;

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
