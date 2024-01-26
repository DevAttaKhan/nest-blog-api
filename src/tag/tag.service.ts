import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {}

  async createTag(body: CreateTagDto) {
    // check if tag already exists
    const savedTag = await this.tagRepo.findOneBy({ tag: body.tag });
    if (savedTag.tag === body.tag) return savedTag;
    const tagModel = this.tagRepo.create(body);
    return await this.tagRepo.save(tagModel);
  }
}
