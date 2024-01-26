import { Expose, Transform, Type } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { Comment, Reaction, User } from 'src/database/entities';
import { TagDto } from 'src/tag/dtos/tag.dto';

export class BlogDto {
  @Expose()
  id: number;

  //   @Transform(({ obj }) => obj.user.id)
  //   @Expose()
  //   userId: number;

  @Transform(({ obj }) => obj.author?.id)
  @Expose()
  author: number;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  body: string;

  @Expose()
  @IsEnum(['active', 'draft'])
  status: 'active' | 'draft';

  @Expose()
  @IsOptional()
  coverImage: string;

  @Expose()
  comments: Comment[];

  @Expose()
  reactions: Reaction[];

  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  publishDate: Date;
}
