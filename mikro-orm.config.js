const { Options } = require('@mikro-orm/core');
const { MySqlDriver } = require('@mikro-orm/mysql');

const config = {
  entities: ['./src/entities/**/*.js'],
  entitiesTs: ['./src/entities/**/*.ts'],
  dbName: 'api-express-demo',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  charset: 'utf8mb4',
  debug: process.env.NODE_ENV !== 'production',
  allowGlobalContext: true,
  discovery: {
    warnWhenNoEntities: false,
  },
  migrations: {
    path: './src/migrations',
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
};

module.exports = config;
