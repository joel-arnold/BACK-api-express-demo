const userService = require('../services/user.service');

const getUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    const response = {
      success: true,
      data: users,
      total: users.length
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

const getUser = (req, res) => {
  try {
    const user = userService.getUserById(req.params.id);
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
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

const createUser = (req, res) => {
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
    
    const newUser = userService.createUser({ name, email });
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
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

const updateUser = (req, res) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);
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
    res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor' 
    });
  }
};

const deleteUser = (req, res) => {
  try {
    const deletedUser = userService.deleteUser(req.params.id);
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
