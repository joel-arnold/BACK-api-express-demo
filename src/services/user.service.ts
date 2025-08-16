import DatabaseManager from '../database/DatabaseManager';
import { User } from '../entities/User';
import { hashPassword } from './auth.service';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

const dbManager = DatabaseManager.getInstance();

export const getAllUsers = async (): Promise<User[]> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  return await em.find(User, {});
};

export const getUserById = async (id: string): Promise<User | null> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  return await em.findOne(User, { id: parseInt(id) });
};

export const createUser = async (userData: CreateUserData): Promise<User> => {
  // Validación básica
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error('Nombre, email y contraseña son requeridos');
  }
  
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  
  // Verificar si el email ya existe
  const existingUser = await em.findOne(User, { email: userData.email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }
  
  // Encriptar la contraseña
  const hashedPassword = await hashPassword(userData.password);
  
  // Crear nuevo usuario
  const newUser = new User(userData.name, userData.email, hashedPassword);
  
  // Asegurar que los timestamps estén establecidos
  newUser.createdAt = new Date();
  newUser.updatedAt = new Date();
  
  // Persistir en la base de datos
  await em.persistAndFlush(newUser);
  
  return newUser;
};

export const updateUser = async (id: string, userData: UpdateUserData): Promise<User | null> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  
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
  
  if (userData.password !== undefined) {
    // Encriptar la nueva contraseña
    const hashedPassword = await hashPassword(userData.password);
    user.password = hashedPassword;
  }
  
  user.updatedAt = new Date();
  
  await em.persistAndFlush(user);
  return user;
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  
  const user = await em.findOne(User, { id: parseInt(id) });
  if (!user) {
    return null;
  }
  
  await em.removeAndFlush(user);
  return user;
};
