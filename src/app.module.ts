import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { TagModule } from './tag/tag.module';
import { JwtModule } from '@nestjs/jwt';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    AdminModule,
    BlogModule,
    CommentModule,
    TagModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '90d' },
    }),
    ReactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
