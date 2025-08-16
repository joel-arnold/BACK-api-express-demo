import { Request, Response, NextFunction } from 'express';
import { verifyToken, getUserByIdForAuth } from '../services/auth.service';
import { ResponseHelper } from '../helpers/response.helper';

// Extender la interfaz Request para incluir el usuario autenticado
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
        email: string;
      };
    }
  }
}

// Middleware de autenticación
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      ResponseHelper.unauthorized(res, 'Token de acceso requerido');
      return;
    }

    // Verificar formato Bearer token
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      ResponseHelper.unauthorized(res, 'Formato de token inválido. Use: Bearer <token>');
      return;
    }

    const token = tokenParts[1];

    // Verificar el token
    const decoded = verifyToken(token);
    
    // Obtener los datos del usuario
    const user = await getUserByIdForAuth(decoded.userId);
    
    if (!user) {
      ResponseHelper.unauthorized(res, 'Usuario no encontrado');
      return;
    }

    // Agregar el usuario a la request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    next();
  } catch (error) {
    if (error instanceof Error) {
      ResponseHelper.unauthorized(res, error.message);
    } else {
      ResponseHelper.unauthorized(res, 'Token inválido');
    }
  }
};

// Middleware opcional de autenticación (no bloquea si no hay token)
export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // Si no hay token, continúa sin usuario
      next();
      return;
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      // Si el formato es inválido, continúa sin usuario
      next();
      return;
    }

    const token = tokenParts[1];
    const decoded = verifyToken(token);
    const user = await getUserByIdForAuth(decoded.userId);
    
    if (user) {
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };
    }

    next();
  } catch (error) {
    // En caso de error, continúa sin usuario
    next();
  }
};
