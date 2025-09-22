import { Request, Response } from 'express';
import * as authController from './auth.controller';
import * as authService from '../services/auth.service';
import { ResponseHelper } from '../helpers/response.helper';
import { User } from '../entities/User';

// Extender el tipo Request para incluir user
interface RequestWithUser extends Request {
  user?: User;
}

// Mock de las dependencias
jest.mock('../services/auth.service');
jest.mock('../helpers/response.helper');

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockResponseHelper = ResponseHelper as jest.Mocked<typeof ResponseHelper>;

describe('AuthController', () => {
  let mockRequest: Partial<RequestWithUser>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('debería registrar un usuario exitosamente', async () => {
      // Arrange
      const userData = {
        name: 'Juan Pérez',
        email: 'juan@test.com',
        password: 'password123'
      };
      
      const mockResult = {
        user: {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@test.com'
        },
        token: 'jwt-token-123'
      };

      mockRequest.body = userData;
      mockAuthService.register.mockResolvedValue(mockResult);

      // Act
      await authController.register(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockAuthService.register).toHaveBeenCalledWith(userData);
      expect(mockResponseHelper.created).toHaveBeenCalledWith(mockResponse, mockResult, 'Usuario registrado exitosamente');
    });

    it('debería manejar errores de validación', async () => {
      // Arrange
      const userData = {
        name: 'Juan Pérez',
        email: 'juan@test.com',
        password: 'password123'
      };
      
      const error = new Error('El email ya está registrado');
      mockRequest.body = userData;
      mockAuthService.register.mockRejectedValue(error);

      // Act
      await authController.register(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.badRequest).toHaveBeenCalledWith(mockResponse, error.message);
    });

    it('debería manejar errores internos', async () => {
      // Arrange
      const userData = { name: 'Juan', email: 'juan@test.com', password: 'pass' };
      mockRequest.body = userData;
      mockAuthService.register.mockRejectedValue('Error desconocido');

      // Act
      await authController.register(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.error).toHaveBeenCalledWith(mockResponse, 'Error interno del servidor');
    });
  });

  describe('login', () => {
    it('debería iniciar sesión exitosamente', async () => {
      // Arrange
      const loginData = {
        email: 'juan@test.com',
        password: 'password123'
      };
      
      const mockResult = {
        user: {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@test.com'
        },
        token: 'jwt-token-123'
      };

      mockRequest.body = loginData;
      mockAuthService.login.mockResolvedValue(mockResult);

      // Act
      await authController.login(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockAuthService.login).toHaveBeenCalledWith(loginData);
      expect(mockResponseHelper.success).toHaveBeenCalledWith(mockResponse, mockResult, 'Inicio de sesión exitoso');
    });

    it('debería manejar credenciales inválidas', async () => {
      // Arrange
      const loginData = {
        email: 'juan@test.com',
        password: 'wrongpassword'
      };
      
      const error = new Error('Credenciales inválidas');
      mockRequest.body = loginData;
      mockAuthService.login.mockRejectedValue(error);

      // Act
      await authController.login(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.unauthorized).toHaveBeenCalledWith(mockResponse, error.message);
    });

    it('debería manejar errores internos en login', async () => {
      // Arrange
      const loginData = { email: 'juan@test.com', password: 'pass' };
      mockRequest.body = loginData;
      mockAuthService.login.mockRejectedValue('Error desconocido');

      // Act
      await authController.login(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.error).toHaveBeenCalledWith(mockResponse, 'Error interno del servidor');
    });
  });

  describe('getProfile', () => {
    it('debería retornar el perfil del usuario autenticado', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@test.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };
      
      mockRequest.user = mockUser;

      // Act
      await authController.getProfile(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.success).toHaveBeenCalledWith(mockResponse, mockUser, 'Perfil obtenido exitosamente');
    });

    it('debería retornar error si no hay usuario autenticado', async () => {
      // Arrange
      mockRequest.user = undefined;

      // Act
      await authController.getProfile(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.unauthorized).toHaveBeenCalledWith(mockResponse, 'Usuario no autenticado');
    });

    it('debería manejar errores internos en getProfile', async () => {
      // Arrange
      mockRequest.user = { id: 1 } as any;
      // Simular un error al acceder a ResponseHelper
      mockResponseHelper.success.mockImplementation(() => {
        throw new Error('Error interno');
      });

      // Act
      await authController.getProfile(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.error).toHaveBeenCalledWith(mockResponse, 'Error interno del servidor');
    });
  });

  describe('verifyToken', () => {
    it('debería verificar un token válido', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@test.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };
      
      mockRequest.user = mockUser;

      // Act
      await authController.verifyToken(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.success).toHaveBeenCalledWith(
        mockResponse, 
        { valid: true, user: mockUser }, 
        'Token válido'
      );
    });

    it('debería retornar error con token inválido', async () => {
      // Arrange
      mockRequest.user = undefined;

      // Act
      await authController.verifyToken(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.unauthorized).toHaveBeenCalledWith(mockResponse, 'Token inválido');
    });

    it('debería manejar errores internos en verifyToken', async () => {
      // Arrange
      mockRequest.user = { id: 1 } as any;
      mockResponseHelper.success.mockImplementation(() => {
        throw new Error('Error interno');
      });

      // Act
      await authController.verifyToken(mockRequest as RequestWithUser, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.error).toHaveBeenCalledWith(mockResponse, 'Error interno del servidor');
    });
  });
});