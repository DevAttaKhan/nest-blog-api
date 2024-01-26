import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    {
      ...JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '90d' },
      }),
      global: true,
    },
  ],
  exports: [],
})
export class AuthModule {}
