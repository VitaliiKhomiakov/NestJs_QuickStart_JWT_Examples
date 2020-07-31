import {Body, Controller, HttpException, HttpStatus, Post, UseGuards, UsePipes} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import * as bcrypt from 'bcryptjs';
import {AuthService, Tokens} from '../../services/auth.service';
import {UsersService} from '../../services/user.services';
import {JoiValidationPipe} from '../../pipes/joi-validation.pipe';
import {signUpSchema} from '../../pipes/schemas/auth.schemas';
import {UsersModel} from "../../models/users.model";
import {User} from "../../decorators/user.decorator";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@User() user: UsersModel): Tokens {
    return this.authService.login(user);
  }

  @UsePipes(new JoiValidationPipe(signUpSchema))
  @Post('sign-up')
  async signUp(@Body() body): Promise<UsersModel> {
    const {firstName, middleName, lastName, email, phone, password} = body;

    if (await this.usersService.findUser(email, phone)) {
      throw new HttpException('REGISTRATION.USER_ALREADY_REGISTERED', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.createUser({
      firstName, middleName, lastName, email, password: await bcrypt.hash(password, 10), phone,
    });
  }
}
