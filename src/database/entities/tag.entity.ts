import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToMany(() => Blog, (blog) => blog.tags)
  @JoinTable()
  blogs: Blog[];
}
