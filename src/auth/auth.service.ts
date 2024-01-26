import { User } from 'src/database/entities';
import { IAuthService } from './auth.interface';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterUserDto) {
    try {
      const AlreadyRegisteredUser = await this.repository.findOneBy({
        email: body.email,
      });
      if (AlreadyRegisteredUser?.email === body.email) {
        throw new ConflictException('user already registered');
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const user = this.repository.create({
        ...body,
        password: hashedPassword,
        joinDate: new Date().toISOString(),
      });
      const savedUser = await this.repository.save(user);

      const token = await this.generateAuthToken(savedUser);

      return {
        ...savedUser,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async authenticate(body: LoginUserDto) {
    try {
      //check if user is available
      const savedUser = await this.repository.findOneBy({ email: body.email });
      if (!savedUser) {
        throw new UnauthorizedException('email or password is wrong');
      }

      //compare password
      const passwordMached = await bcrypt.compare(
        body.password,
        savedUser.password,
      );

      // check if password matches
      if (!passwordMached) {
        throw new UnauthorizedException('email or password is wrong');
      }

      //generate token
      const token = await this.generateAuthToken(savedUser);

      return {
        ...savedUser,
        token,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }

  async generateAuthToken(user: User): Promise<string> {
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    return token;
  }
  verifyAuthToken(token: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
