import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Serialze } from 'src/interceptors/serialize.interceptors';
import { BlogDto } from './dtos/blog.dto';
import { BlogService } from './blog.service';
import { createBlogDto } from './dtos/create-blog.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/database/entities';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/blog')
@Serialze(BlogDto)
@UseGuards(AuthGuard)
export class BlogConroller {
  constructor(private blogService: BlogService) {}

  @Get('/')
  getAllBlogs() {
    return this.blogService.getPosts();
  }

  @Post('/')
  createPost(@Body() body: createBlogDto, @CurrentUser() user: User) {
    return this.blogService.createBlog(body, user);
  }
}
