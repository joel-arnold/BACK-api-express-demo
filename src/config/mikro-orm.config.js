const { MySqlDriver } = require('@mikro-orm/mysql');
const { UserSchema } = require('../entities/User');

const mikroOrmConfig = {
  driver: MySqlDriver,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  dbName: 'api-express-demo',
  charset: 'utf8mb4',
  debug: process.env.NODE_ENV !== 'production',
  allowGlobalContext: true,
  entities: [UserSchema],
  discovery: {
    warnWhenNoEntities: false,
  },
};

module.exports = mikroOrmConfig;
