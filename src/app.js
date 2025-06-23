require('reflect-metadata');
const express = require('express');
const { MikroORM, RequestContext } = require('@mikro-orm/core');
const mikroOrmConfig = require('./config/mikro-orm.config');
const userRoutes = require('./routes/user.routes');

const app = express();

// Variable global para almacenar la instancia de MikroORM
let orm;

// Middleware de logger personalizado
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware para parsear JSON
app.use(express.json());

// Middleware de MikroORM RequestContext
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

// Middleware de logger
app.use(logger);

// Rutas
app.use('/users', userRoutes);

// Ruta de prueba en la raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Express Demo - UTN',
    endpoints: {
      users: 'GET /users',
      user: 'GET /users/:id',
      createUser: 'POST /users',
      updateUser: 'PUT /users/:id',
      deleteUser: 'DELETE /users/:id'
    }
  });
});

const PORT = 3000;

// Función para inicializar la aplicación
const initializeApp = async () => {
  try {
    // Inicializar MikroORM
    console.log('Conectando a la base de datos...');
    orm = await MikroORM.init(mikroOrmConfig);
    
    // Crear el esquema de la base de datos si no existe
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
    
    console.log('Conexión a la base de datos establecida');
    
    // Hacer la instancia de ORM disponible globalmente
    global.orm = orm;
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
    process.exit(1);
  }
};

// Manejar el cierre graceful de la aplicación
process.on('SIGINT', async () => {
  console.log('Cerrando la aplicación...');
  if (orm) {
    await orm.close();
  }
  process.exit(0);
});

// Inicializar la aplicación
initializeApp();

module.exports = app;
