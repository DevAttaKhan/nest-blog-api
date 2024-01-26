import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Blog } from './blog.entity';
import { Reaction } from './reaction.entity';

@Entity()
export class UserBlogReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Blog, (blog) => blog.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(() => Reaction, (reaction) => reaction, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reaction_id' })
  reaction: Reaction;

  // Additional columns if needed
  @Column()
  additionalColumn: string;

  // ... other properties and relationships
}
