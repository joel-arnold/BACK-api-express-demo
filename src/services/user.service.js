const { User } = require('../entities/User');

const getAllUsers = async () => {
  const em = global.orm.em.fork();
  return await em.find(User, {});
};

const getUserById = async (id) => {
  const em = global.orm.em.fork();
  return await em.findOne(User, { id: parseInt(id) });
};

const createUser = async (userData) => {
  // Validación básica
  if (!userData.name || !userData.email) {
    throw new Error('Nombre y email son requeridos');
  }
  
  const em = global.orm.em.fork();
  
  // Verificar si el email ya existe
  const existingUser = await em.findOne(User, { email: userData.email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }
  
  // Crear nuevo usuario
  const newUser = new User(userData.name, userData.email);
  
  // Asegurar que los timestamps estén establecidos
  newUser.createdAt = new Date();
  newUser.updatedAt = new Date();
  
  // Persistir en la base de datos
  await em.persistAndFlush(newUser);
  
  return newUser;
};

const updateUser = async (id, userData) => {
  const em = global.orm.em.fork();
  
  const user = await em.findOne(User, { id: parseInt(id) });
  if (!user) {
    return null;
  }
  
  // Actualizar los campos proporcionados
  if (userData.name !== undefined) {
    user.name = userData.name;
  }
  if (userData.email !== undefined) {
    // Verificar si el nuevo email ya existe (excepto el usuario actual)
    const existingUser = await em.findOne(User, { 
      email: userData.email,
      id: { $ne: parseInt(id) }
    });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }
    user.email = userData.email;
  }
  
  user.updatedAt = new Date();
  
  await em.persistAndFlush(user);
  return user;
};

const deleteUser = async (id) => {
  const em = global.orm.em.fork();
  
  const user = await em.findOne(User, { id: parseInt(id) });
  if (!user) {
    return null;
  }
  
  await em.removeAndFlush(user);
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
