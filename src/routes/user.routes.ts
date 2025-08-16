import express from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// GET /users - Obtener todos los usuarios (sin autenticación)
router.get('/', userController.getUsers);

// GET /users/:id - Obtener un usuario por ID (sin autenticación)
router.get('/:id', userController.getUser);

// POST /users - Crear un nuevo usuario (requiere autenticación)
router.post('/', authMiddleware, userController.createUser);

// PUT /users/:id - Actualizar un usuario existente (requiere autenticación)
router.put('/:id', authMiddleware, userController.updateUser);

// DELETE /users/:id - Eliminar un usuario (requiere autenticación)
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;
