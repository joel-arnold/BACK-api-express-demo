import { Request, Response } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import * as authService from '../services/auth.service';

// Controlador para registro de usuarios
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    
    ResponseHelper.created(res, result, 'Usuario registrado exitosamente');
  } catch (error) {
    if (error instanceof Error) {
      ResponseHelper.badRequest(res, error.message);
    } else {
      ResponseHelper.error(res, 'Error interno del servidor');
    }
  }
};

// Controlador para inicio de sesión
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = req.body;
    const result = await authService.login(loginData);
    
    ResponseHelper.success(res, result, 'Inicio de sesión exitoso');
  } catch (error) {
    if (error instanceof Error) {
      ResponseHelper.unauthorized(res, error.message);
    } else {
      ResponseHelper.error(res, 'Error interno del servidor');
    }
  }
};

// Controlador para obtener perfil del usuario autenticado
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHelper.unauthorized(res, 'Usuario no autenticado');
      return;
    }

    ResponseHelper.success(res, req.user, 'Perfil obtenido exitosamente');
  } catch (error) {
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};

// Controlador para verificar si el token es válido
export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      ResponseHelper.unauthorized(res, 'Token inválido');
      return;
    }

    ResponseHelper.success(res, { valid: true, user: req.user }, 'Token válido');
  } catch (error) {
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};
