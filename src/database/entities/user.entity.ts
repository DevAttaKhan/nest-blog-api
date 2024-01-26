import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { Blog } from './blog.entity';
import { Comment } from './comment.entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Profile } from './profile.entity';
import { UserBlogReaction } from './user-blog-react.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column()
  joinDate: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @ManyToMany(() => Comment, (comment) => comment.likes)
  @JoinTable()
  likes: Comment[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @OneToMany(() => UserBlogReaction, (reaction) => reaction.blog)
  @JoinTable({
    name: 'user_blog_reaction',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'reaction_id', referencedColumnName: 'id' },
  })
  reactions: UserBlogReaction[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;
}
