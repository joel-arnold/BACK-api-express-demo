import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const router = express.Router();

// Configurar todas las rutas de la aplicación
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
