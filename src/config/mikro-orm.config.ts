import { Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from '../entities/User';

const config: Options<MySqlDriver> = {
  driver: MySqlDriver,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  dbName: process.env.DB_NAME || 'api-express-db',
  charset: 'utf8mb4',
  debug: process.env.NODE_ENV !== 'production' && process.env.DB_DEBUG === 'true',
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
