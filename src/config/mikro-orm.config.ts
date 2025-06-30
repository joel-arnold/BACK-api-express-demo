import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from '../entities/User';

const config: Options<MySqlDriver> = {
  driver: MySqlDriver,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  dbName: 'api-express-demo',
  charset: 'utf8mb4',
  debug: process.env.NODE_ENV !== 'production',
  allowGlobalContext: true,
  entities: [User],
  discovery: {
    warnWhenNoEntities: false,
  },
  migrations: {
    path: './src/migrations',
  },
};

export default config;
