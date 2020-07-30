import {MiddlewareConsumer, Module} from '@nestjs/common';
import {LocalStrategy} from './local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import {CONF} from '../../conf';
import {AuthService} from '../../services/auth.service';
import {AuthController} from './auth.controller';
import {UsersService} from '../../services/user.services';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersEntity} from '../../entities/users.entity';
import {AuthMiddleware} from '../../middlewares/auth.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: CONF.secret,
      signOptions: CONF.signOptions,
    }),
    TypeOrmModule.forFeature([UsersEntity])
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, AuthService, UsersService],
  exports: [],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('auth/sign-up');
  }
}
