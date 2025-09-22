import { Request, Response } from 'express';
import * as userController from './user.controller';
import * as userService from '../services/user.service';
import { ResponseHelper } from '../helpers/response.helper';

// Mock de las dependencias
jest.mock('../services/user.service');
jest.mock('../helpers/response.helper');

const mockUserService = userService as jest.Mocked<typeof userService>;
const mockResponseHelper = ResponseHelper as jest.Mocked<typeof ResponseHelper>;

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('debería retornar todos los usuarios exitosamente', async () => {
      // Arrange
      const mockUsers = [
        { 
          id: 1, 
          name: 'Juan', 
          email: 'juan@test.com',
          password: 'hashedpassword',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        },
        { 
          id: 2, 
          name: 'Ana', 
          email: 'ana@test.com',
          password: 'hashedpassword',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ];
      mockUserService.getAllUsers.mockResolvedValue(mockUsers);

      // Act
      await userController.getUsers(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(mockResponseHelper.success).toHaveBeenCalledWith(mockResponse, mockUsers);
    });

    it('debería manejar errores correctamente', async () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const error = new Error('Database error');
      mockUserService.getAllUsers.mockRejectedValue(error);

      // Act
      await userController.getUsers(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith('Error en getUsers:', error);
      expect(mockResponseHelper.error).toHaveBeenCalledWith(mockResponse, 'Error interno del servidor');
      
      // Cleanup
      consoleSpy.mockRestore();
    });
  });

  describe('getUser', () => {
    it('debería retornar un usuario por ID', async () => {
      // Arrange
      const mockUser = { 
        id: 1, 
        name: 'Juan', 
        email: 'juan@test.com',
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };
      mockRequest.params = { id: '1' };
      mockUserService.getUserById.mockResolvedValue(mockUser);

      // Act
      await userController.getUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
      expect(mockResponseHelper.success).toHaveBeenCalledWith(mockResponse, mockUser);
    });

    it('debería retornar not found si el usuario no existe', async () => {
      // Arrange
      mockRequest.params = { id: '999' };
      mockUserService.getUserById.mockResolvedValue(null);

      // Act
      await userController.getUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponseHelper.notFound).toHaveBeenCalledWith(mockResponse, "Usuario no encontrado");
    });
  });

  describe('createUser', () => {
    it('debería crear un usuario exitosamente', async () => {
      // Arrange
      const userData = { name: 'Juan', email: 'juan@test.com', password: '123456' };
      const mockUser = { 
        id: 1, 
        name: 'Juan', 
        email: 'juan@test.com', 
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };
      mockRequest.body = userData;
      mockUserService.createUser.mockResolvedValue(mockUser);

      // Act
      await userController.createUser(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
      expect(mockResponseHelper.created).toHaveBeenCalledWith(mockResponse, mockUser, 'Usuario creado exitosamente');
    });
  });
});