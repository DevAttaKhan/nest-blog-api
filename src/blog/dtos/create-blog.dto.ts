import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTagDto } from 'src/tag/dtos/create-tag.dto';

enum blogStatus {
  active,
  draft,
}

export class createBlogDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  body: string;

  @IsEnum(blogStatus)
  status: 'active';

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags: CreateTagDto[];
}
