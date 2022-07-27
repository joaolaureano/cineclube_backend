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
    name: "tagId",
  })
  moviesTags: MovieTag[];

  @OneToMany(() => UserTag, (user_tag) => user_tag.tag)
  @JoinColumn({
    name: "tagId",
  })
  user_tags: UserTag[];

  @OneToMany(() => Achievement, (achievement) => achievement.tag)
  achievements: Achievement[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
