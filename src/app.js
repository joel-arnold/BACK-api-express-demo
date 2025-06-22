const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware de logger personalizado
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware para parsear JSON
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
