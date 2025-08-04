import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from '../entities/User';

const config: Options<MySqlDriver> = {
  driver: MySqlDriver,
  host: 'base-de-datos-mysql-api-express-demo.d.aivencloud.com',
  port: 26759,
  user: 'avnadmin',
  password: 'AVNS_39ylc3ReuR39PNfdInN',
  dbName: 'defaultdb',
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
