import { Expose } from 'class-transformer';

export class TagDto {
  @Expose()
  tag: string;
}
