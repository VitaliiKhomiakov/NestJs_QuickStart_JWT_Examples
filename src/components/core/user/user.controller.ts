import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "../../../services/user.services";
import {UsersModel} from "../../../models/users.model";
import {User} from "../../../decorators/user.decorator";

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getCurrentUser(@User() user: UsersModel): Promise<UsersModel> {
    return this.usersService.findById(user.id);
  }



}
