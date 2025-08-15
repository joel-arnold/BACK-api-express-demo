// ! Si las variables de entorno no se cargan al inicio, mikro-orm no podrá conectarse a la base de datos.
import dotenv from 'dotenv'
dotenv.config()
 // ! Asegúrate de que las variables de entorno estén definidas en un archivo .env o en el entorno del sistema.

import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { RequestContext } from '@mikro-orm/core';
import DatabaseManager from './database/DatabaseManager';
import userRoutes from './routes/user.routes';

const app = express();
const dbManager = DatabaseManager.getInstance();

// Middleware de logger personalizado
const logger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware para parsear JSON
app.use(express.json());

// Middleware de logger
app.use(logger);

// Ruta de prueba en la raíz
app.get('/', (req: Request, res: Response) => {
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
const initializeApp = async (): Promise<void> => {
  try {
    // Inicializar la base de datos
    const orm = await dbManager.initialize();
    
    // Configurar middleware de RequestContext después de inicializar la BD
    app.use((req: Request, res: Response, next: NextFunction) => {
      RequestContext.create(orm.em, next);
    });
    
    // Configurar rutas después de inicializar la BD
    app.use('/users', userRoutes);
    
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
  await dbManager.close();
  process.exit(0);
});

// Inicializar la aplicación
initializeApp();

export default app;
