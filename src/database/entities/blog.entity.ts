import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { UserBlogReaction } from './user-blog-react.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.blogs)
  author: User;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  body: string;

  @Column()
  status: 'active' | 'draft';

  @Column({ nullable: true })
  coverImage: string;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @OneToMany(() => UserBlogReaction, (reaction) => reaction.blog, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'user_blog_reaction',
    joinColumn: { name: 'blog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'reaction_id', referencedColumnName: 'id' },
  })
  reactions: UserBlogReaction[];

  @ManyToMany(() => Tag, (tag) => tag.blogs)
  tags: Tag[];

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  publishDate: Date;
}
