import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Tag } from 'src/database/entities';
import { BlogConroller } from './blog.controller';
import { BlogService } from './blog.service';
import { TagService } from 'src/tag/tag.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [BlogConroller],
  providers: [BlogService, TagService],
  imports: [
    TypeOrmModule.forFeature([Blog, Tag]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '90d' },
    }),
  ],
})
export class BlogModule {}
