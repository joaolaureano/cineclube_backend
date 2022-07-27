import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { MovieTag, user_tag, Achievement } from ".";

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

  @OneToMany(() => user_tag, (user_tag) => user_tag.tag)
  @JoinColumn({
    name: "tagId",
  })
  user_tags: user_tag[];

  @OneToMany(() => Achievement, (achievement) => achievement.tag)
  achievements: Achievement[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
