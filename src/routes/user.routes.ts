import express from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema, idParamSchema } from '../schemas/user.schema';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// GET /users - Obtener todos los usuarios (sin autenticación)
router.get('/', userController.getUsers);

// GET /users/:id - Obtener un usuario por ID (sin autenticación)
router.get('/:id', validate({ location: 'params', schema: idParamSchema }), userController.getUser);

// POST /users - Crear un nuevo usuario (requiere autenticación)
router.post('/', authMiddleware, validate({ location: 'body', schema: createUserSchema }), userController.createUser);

// PUT /users/:id - Actualizar un usuario existente (requiere autenticación)
router.put('/:id', authMiddleware, validate({ location: 'params', schema: idParamSchema }), validate({ location: 'body', schema: updateUserSchema }), userController.updateUser);

// DELETE /users/:id - Eliminar un usuario (requiere autenticación)
router.delete('/:id', authMiddleware, validate({ location: 'params', schema: idParamSchema }), userController.deleteUser);

export default router;
