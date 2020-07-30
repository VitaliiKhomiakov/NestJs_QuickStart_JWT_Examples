import {Injectable} from '@nestjs/common';
import {UsersService} from '../services/user.services';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {UsersModel} from '../models/users.model';

export interface Tokens {
  accessToken: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(emailOrPhone: string, pass: string): Promise<UsersModel> {
    const user = await this.usersService.findUser(emailOrPhone, emailOrPhone);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  login(user: UsersModel): Tokens {
    return {
      accessToken: this.jwtService.sign({ email: user.email, id: user.id }),
    };
  }

  async register(user: UsersModel): Promise<UsersModel> {
    return this.usersService.create(user);
  }
}
