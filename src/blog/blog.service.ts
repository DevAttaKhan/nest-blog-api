import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog, Tag, User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { createBlogDto } from './dtos/create-blog.dto';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    private tagService: TagService,
  ) {}

  async getPosts() {
    const blogs = await this.blogRepo.find({ relations: ['tags', 'author'] });

    return blogs;
  }

  async createBlog(body: createBlogDto, user: User) {
    const { tags, ...blog } = body;
    console.log(user);
    const savedTags: Tag[] = [];

    for (const tag of tags) {
      const savedTag = await this.tagService.createTag(tag);
      savedTags.push(savedTag);
    }

    const blogEntity = this.blogRepo.create(blog);
    blogEntity.tags = savedTags;
    blogEntity.createdAt = new Date();
    blogEntity.author = user;

    const savedBlog = await this.blogRepo.save(blogEntity);

    return savedBlog;
  }
}
