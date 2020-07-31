import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './components/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CONF} from './conf';
import {CodeModule} from "./components/core/code.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        load: [CONF],
      },
    ),
    TypeOrmModule.forRoot({
      type: CONF().type as 'mysql',
      host: CONF().host,
      port: CONF().port,
      username: CONF().username,
      password: CONF().password,
      database: CONF().databaseName,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    CodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
