import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { User } from './user.entity';
import { Blog } from './blog.entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;

  @ManyToOne(() => Comment, (comment) => comment.id)
  parent: Comment;

  @ManyToMany(() => User, (user) => user.likes)
  likes: User[];
}
