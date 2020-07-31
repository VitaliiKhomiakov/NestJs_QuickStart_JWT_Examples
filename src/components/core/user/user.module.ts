import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from "./user.controller";
import {UsersService} from "../../../services/user.services";
import {UsersEntity} from "../../../entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
