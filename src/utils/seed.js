require('reflect-metadata');
const { MikroORM } = require('@mikro-orm/core');
const mikroOrmConfig = require('../config/mikro-orm.config');
const { User } = require('../entities/User');

async function seedDatabase() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  try {
    // Verificar si ya existen usuarios
    const existingUsers = await em.count(User);
    if (existingUsers > 0) {
      console.log('La base de datos ya contiene usuarios. No se insertan datos de prueba.');
      return;
    }

    // Crear usuarios de ejemplo
    const users = [
      new User('Alice', 'alice@example.com'),
      new User('Bob', 'bob@example.com'),
      new User('Carlos', 'carlos@example.com'),
    ];

    for (const user of users) {
      em.persist(user);
    }

    await em.flush();
    console.log('Datos de prueba insertados exitosamente');
  } catch (error) {
    console.error('Error al insertar datos de prueba:', error);
  } finally {
    await orm.close();
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
