const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET /users - Obtener todos los usuarios
router.get('/', userController.getUsers);

// GET /users/:id - Obtener un usuario por ID
router.get('/:id', userController.getUser);

// POST /users - Crear un nuevo usuario
router.post('/', userController.createUser);

// PUT /users/:id - Actualizar un usuario existente
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
