import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { MovieTag, UserTag, AchievementTag } from ".";

@Entity({ name: "tag" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MovieTag, (movieTag) => movieTag.tag)
  @JoinColumn({
    name: "tagId",
  })
  moviesTags: MovieTag[];

  @OneToMany(() => UserTag, (userTag) => userTag.tag)
  @JoinColumn({
    name: "tagId",
  })
  userTags: UserTag[];

  @OneToMany(() => AchievementTag, (achievementTag) => achievementTag.tag)
  @JoinColumn({
    name: "tagId",
  })
  achievements: AchievementTag[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
