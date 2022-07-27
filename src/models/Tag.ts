import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { MovieTag, UserTag, Achievement } from ".";

@Entity({ name: "tag" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MovieTag, (movieTag) => movieTag.tag)
  @JoinColumn({
    name: "tag_id",
  })
  moviesTags: MovieTag[];

  @OneToMany(() => UserTag, (userTag) => userTag.tag)
  @JoinColumn({
    name: "tag_id",
  })
  userTags: UserTag[];

  @OneToMany(() => Achievement, (achievement) => achievement.tag)
  achievements: Achievement[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
