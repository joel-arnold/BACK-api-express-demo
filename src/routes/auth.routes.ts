import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// POST /auth/register - Registrar un nuevo usuario
router.post('/register', authController.register);

// POST /auth/login - Iniciar sesión
router.post('/login', authController.login);

// GET /auth/profile - Obtener perfil del usuario autenticado (requiere autenticación)
router.get('/profile', authMiddleware, authController.getProfile);

// GET /auth/verify - Verificar si el token es válido (requiere autenticación)
router.get('/verify', authMiddleware, authController.verifyToken);

export default router;
