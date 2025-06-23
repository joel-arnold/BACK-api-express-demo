const userService = require('../services/user.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const response = {
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

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
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

const createUser = async (req, res) => {
  try {
    // Validación manual de datos requeridos
    const { name, email } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'El campo "name" es requerido'
      });
    }
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'El campo "email" es requerido'
      });
    }
    
    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'El formato del email no es válido'
      });
    }
    
    const newUser = await userService.createUser({ name, email });
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('Error en createUser:', error);
    if (error.message.includes('requeridos') || error.message.includes('registrado')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
    }
    res.json({
      success: true,
      data: updatedUser,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error en updateUser:', error);
    if (error.message.includes('registrado')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ 
        success: false,
        error: "Usuario no encontrado" 
      });
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
