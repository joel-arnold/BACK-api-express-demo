require('reflect-metadata');
console.log('🚀 Iniciando verificación de la API...');

const { MikroORM } = require('@mikro-orm/core');
const config = require('./src/config/mikro-orm.config');

async function startApp() {
  try {
    console.log('📡 Conectando a la base de datos...');
    const orm = await MikroORM.init(config);
    console.log('✅ Conexión a MySQL establecida');
    
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    console.log('✅ Esquema de base de datos actualizado');
    
    // Cerrar conexión
    await orm.close();
    console.log('✅ Configuración validada correctamente');
    console.log('');
    console.log('🎉 ¡Tu API está lista para ejecutarse!');
    console.log('💡 Ejecuta: npm run dev');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('');
      console.error('🔧 Solución:');
      console.error('1. Abre MySQL Workbench');
      console.error('2. Ejecuta: CREATE DATABASE `api-express-demo`;');
      console.error('3. Vuelve a ejecutar este script');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('');
      console.error('🔧 Solución:');
      console.error('1. Asegúrate de que MySQL Server esté ejecutándose');
      console.error('2. Verifica las credenciales en src/config/mikro-orm.config.js');
    }
  }
}

startApp();
