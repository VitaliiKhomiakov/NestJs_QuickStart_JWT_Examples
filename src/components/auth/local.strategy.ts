import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from '../../services/auth.service';
import {UsersModel} from '../../models/users.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'emailOrPhone',
      passwordField: 'password',
    });
  }

  async validate(emailOrPhone: string, password: string): Promise<UsersModel> {
    const user = await this.authService.validateUser(emailOrPhone, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
