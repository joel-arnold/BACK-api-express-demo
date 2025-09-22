import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { ResponseHelper } from '../helpers/response.helper';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    
    ResponseHelper.success(res, users);
  } catch (error) {
    console.error('Error en getUsers:', error);
    
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      ResponseHelper.notFound(res, "Usuario no encontrado");
      return;
    }
    
    ResponseHelper.success(res, user);
  } catch (error) {
    console.error('Error en getUser:', error);
    
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.createUser({ name, email, password });

    ResponseHelper.created(res, newUser, 'Usuario creado exitosamente');
  } catch (error: any) {
    console.error('Error en createUser:', error);
    
    if (error.message.includes('registrado')) {
      ResponseHelper.badRequest(res, error.message);
      return;
    }
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    
    if (!updatedUser) {
      ResponseHelper.notFound(res, "Usuario no encontrado");
      return;
    }
    
    ResponseHelper.success(res, updatedUser, 'Usuario actualizado exitosamente');
  } catch (error: any) {
    console.error('Error en updateUser:', error);
    
    if (error.message.includes('registrado')) {
      ResponseHelper.badRequest(res, error.message);
      return;
    }
    
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    
    if (!deletedUser) {
      ResponseHelper.notFound(res, "Usuario no encontrado");
      return;
    }
    
    ResponseHelper.success(res, deletedUser, 'Usuario eliminado exitosamente');
  } catch (error) {
    console.error('Error en deleteUser:', error);
    
    ResponseHelper.error(res, 'Error interno del servidor');
  }
};
