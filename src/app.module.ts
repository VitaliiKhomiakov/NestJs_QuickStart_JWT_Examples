import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './components/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CONF} from './conf';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: CONF.type as 'mysql',
      host: CONF.host,
      port: CONF.port,
      username: CONF.username,
      password: CONF.password,
      database: 'fit',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
