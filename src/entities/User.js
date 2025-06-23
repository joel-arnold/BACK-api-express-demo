const { EntitySchema } = require('@mikro-orm/core');

/**
 * Entidad User usando EntitySchema (compatible con JavaScript)
 */
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const UserSchema = new EntitySchema({
  class: User,
  tableName: 'users',
  properties: {
    id: {
      type: 'number',
      primary: true,
      autoincrement: true,
    },
    name: {
      type: 'string',
      length: 255,
    },
    email: {
      type: 'string',
      unique: true,
      length: 255,
    },
    createdAt: {
      type: 'Date',
      fieldName: 'created_at',
      columnType: 'datetime',
      defaultRaw: 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'Date',
      fieldName: 'updated_at',
      columnType: 'datetime',
      defaultRaw: 'CURRENT_TIMESTAMP',
      onUpdate: () => new Date(),
    },
  },
});

module.exports = { User, UserSchema };
