import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfigs from './db.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfigs)],
})
export class DatabaseModule {}
