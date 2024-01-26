import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  websiteUrl: string;

  @Column()
  location: string;

  @Column()
  availableFor: string;

  @Column()
  skill: string;

  @Column()
  currentProjects: string;

  @Column()
  pronouns: string;

  @Column()
  work: string;

  @Column()
  education: string;

  @Column()
  brandingColor: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
