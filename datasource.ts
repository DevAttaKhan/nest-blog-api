// import { Blog, Profile, Reaction, Tag, User } from 'src/database/entities';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfigs: DataSourceOptions = {
  type: 'postgres',
  database: 'blog',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['migration/*.ts'],
  migrationsRun: true,
  migrationsTableName: 'custom_migration_table',
};

export const dataSource = new DataSource(dbConfigs);
