import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Tag, User } from ".";

@Entity("user_tag")
export class UserTag {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  tag_id: number;

  @Column()
  totalPoint: number;

  @ManyToOne(() => User, (user) => user.userTags)
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.userTags)
  tag: Tag;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
