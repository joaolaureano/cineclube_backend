import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cast } from ".";

@Entity({ name: "actor" })
export class Actor {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Cast, (cast) => cast.actor)
  @JoinColumn({
    name: "actorId",
  })
  cast: Cast[];

  @CreateDateColumn({ name: "created_At" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_At" })
  updatedAt: Date;
}
