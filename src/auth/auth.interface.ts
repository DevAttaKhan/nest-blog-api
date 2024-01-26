import { User } from 'src/database/entities';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

export interface IAuthService {
  // Register a new user
  register(body: RegisterUserDto): Promise<User>;

  // Authenticate a user based on credentials
  authenticate(body: LoginUserDto): Promise<User | null>;

  // Generate and return an authentication token for a user
  generateAuthToken(user: User): Promise<string>;

  // Verify an authentication token and return the associated user
  verifyAuthToken(token: string): Promise<User | null>;
}
