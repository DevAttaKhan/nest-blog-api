import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Serialze } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from 'src/database/entities';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialze(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getUsers(@CurrentUser() user: User) {
    console.log(user);
  }

  @Post('/register')
  async registerUser(@Body() body: RegisterUserDto) {
    return await this.authService.register(body);
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserDto) {
    return await this.authService.authenticate(body);
  }
}
