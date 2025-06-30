import { Request, Response } from 'express';
import * as userService from '../services/user.service';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    const response: ApiResponse<typeof users> = {
      success: true,
      data: users,
      total: users.length
    };

    res.json(response);
  } catch (error) {
    console.error('Error en getUsers:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
      return;
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error en getUser:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validación manual de datos requeridos
    const { name, email } = req.body;
    
    if (!name) {
      res.status(400).json({
        success: false,
        error: 'El campo "name" es requerido'
      });
      return;
    }
    
    if (!email) {
      res.status(400).json({
        success: false,
        error: 'El campo "email" es requerido'
      });
      return;
    }
    
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'El formato del email no es válido'
      });
      return;
    }
    
    const newUser = await userService.createUser({ name, email });
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'Usuario creado exitosamente'
    });
  } catch (error: any) {
    console.error('Error en createUser:', error);
    if (error.message.includes('requeridos') || error.message.includes('registrado')) {
      res.status(400).json({
        success: false,
        error: error.message
      });
      return;
    }
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
      return;
    }
    res.json({
      success: true,
      data: updatedUser,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error: any) {
    console.error('Error en updateUser:', error);
    if (error.message.includes('registrado')) {
      res.status(400).json({
        success: false,
        error: error.message
      });
      return;
    }
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
      return;
    }
    res.json({
      success: true,
      data: deletedUser,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error en deleteUser:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};
