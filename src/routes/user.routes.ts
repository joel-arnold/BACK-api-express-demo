import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// GET /users - Obtener todos los usuarios
router.get('/', userController.getUsers);

// GET /users/:id - Obtener un usuario por ID
router.get('/:id', userController.getUser);

// POST /users - Crear un nuevo usuario
router.post('/', userController.createUser);

// PUT /users/:id - Actualizar un usuario existente
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Eliminar un usuario
router.delete('/:id', userController.deleteUser);

export default router;
