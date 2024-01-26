import { IsEnum, IsString } from 'class-validator';

enum ReactionType {
  LIKE = 'like',
  UNICORN = 'unicorn',
  EXPLODING_HEAD = 'exploding-head',
  FIRE = 'fire',
}

export class ReactDto {
  @IsEnum(ReactionType, {
    message: 'Invalid reaction type',
  })
  @IsString()
  type: 'like' | 'unicorn' | 'exploding-head' | 'fire';
}
