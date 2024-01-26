import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactDto } from './dtos/reaction.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reaction')
@UseGuards(AuthGuard)
export class ReactionController {
  constructor(private ReactionService: ReactionService) {}

  @Post('/')
  async insertReaction(@Body() body: ReactDto) {
    return await this.ReactionService.createReaction(body);
  }
}
