// Datos simulados (en lugar de una DB)
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Carlos", email: "carlos@example.com" },
];

// Variable para generar IDs únicos
let nextId = 4;

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find(user => user.id === parseInt(id));
};

const createUser = (userData) => {
  // Validación básica
  if (!userData.name || !userData.email) {
    throw new Error('Nombre y email son requeridos');
  }
  
  // Verificar si el email ya existe
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }
  
  const newUser = {
    id: nextId++,
    name: userData.name,
    email: userData.email
  };
  
  users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = { ...users[userIndex], ...userData };
  return users[userIndex];
};

const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return null;
  }
  
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  return deletedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
