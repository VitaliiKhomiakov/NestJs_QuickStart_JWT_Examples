import {registerAs} from "@nestjs/config";
export const CONF = registerAs('conf', () => ({
  type: 'mysql',
  host: 'localhost',
  port: 1234,
  username: 'username',
  password: 'password',
  databaseName: 'databaseName',
  secret: 'secret',
}));
