require('reflect-metadata');
const { MikroORM } = require('@mikro-orm/core');
const config = require('./src/config/mikro-orm.config');

async function testConnection() {
  try {
    console.log('Intentando conectar a la base de datos...');
    console.log('Configuración:', {
      host: config.host,
      port: config.port,
      user: config.user,
      dbName: config.dbName
    });
    
    const orm = await MikroORM.init(config);
    console.log('✅ Conexión exitosa a la base de datos');
    
    // Crear/actualizar el esquema
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    console.log('✅ Esquema de base de datos actualizado');
    
    await orm.close();
    console.log('✅ Test completado exitosamente');
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('La base de datos "api-express-demo" no existe. Por favor créala en MySQL Workbench.');
    }
    process.exit(1);
  }
}

testConnection();
