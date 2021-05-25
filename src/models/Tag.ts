import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { MovieTag, UserTag } from ".";

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

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
