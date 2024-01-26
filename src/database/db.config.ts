import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User, Profile, Tag, Reaction, Comment, Blog } from './entities';
import { UserBlogReaction } from './entities/user-blog-react.entity';

const dbConfigs: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'blog',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  synchronize: false,
  entities: [User, Profile, Tag, Reaction, Comment, Blog, UserBlogReaction],
  migrations: ['migrations/*.js'],
  migrationsRun: true,
};
export default dbConfigs;
