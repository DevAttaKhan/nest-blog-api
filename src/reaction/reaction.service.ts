import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/database/entities';
import { Repository } from 'typeorm';
import { ReactDto } from './dtos/reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  async createReaction(body: ReactDto) {
    try {
      const reactionModel = this.reactionRepository.create(body);
      const savedReaction = await this.reactionRepository.save(reactionModel);
      return savedReaction;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
