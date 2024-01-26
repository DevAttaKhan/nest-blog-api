import { Column, Entity, ManyToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UserBlogReaction } from './user-blog-react.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type: 'like' | 'unicorn' | 'exploding-head' | 'fire';

  @ManyToMany(() => UserBlogReaction, (reaction) => reaction)
  user: UserBlogReaction[];
}
