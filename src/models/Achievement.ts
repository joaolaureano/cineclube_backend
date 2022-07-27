import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAchievement, Tag } from ".";

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

  @ManyToOne(() => Tag, (tag) => tag.achievements, {
    cascade: true,
  })
  @JoinTable({
    name: "achievement_tag",
    joinColumn: {
      name: "achievement",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag",
      referencedColumnName: "id",
    },
  })
  tag: Tag;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
