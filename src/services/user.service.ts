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
  // Por defecto, el filtro softDelete está activo y excluye registros con deletedAt != null
  return await em.find(User, {});
};

export const getUserById = async (id: string): Promise<User | null> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  return await em.findOne(User, { id: parseInt(id) });
};

export const createUser = async (userData: CreateUserData): Promise<User> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  
  // Verificar si el email ya existe
  // Buscar incluyendo potenciales registros borrados (para decidir si permitir reuso de email)
  const existingUser = await em.findOne(User, { email: userData.email }, { filters: { softDelete: false } });
  if (existingUser) {
    // Si existe y no está borrado lógicamente, no permitir duplicado
    if (!existingUser.deletedAt) {
      throw new Error('El email ya está registrado');
    }
    // Si está borrado lógicamente, permitir reusar el email (opcional: también podríamos restaurar)
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
    const existingUser = await em.findOne(User, { email: userData.email, id: { $ne: parseInt(id) } }, { filters: { softDelete: false } });
    
    if (existingUser) {
      if (existingUser.deletedAt !== null) {
        throw new Error('El email ya está registrado en usuario eliminado');
      }

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
  
  // Incluir también los borrados para poder retornar 404 si no existe en absoluto
  const user = await em.findOne(User, { id: parseInt(id) }, { filters: { softDelete: false } });
  if (!user) {
    return null;
  }
  
  // Borrado lógico
  user.deletedAt = new Date();
  user.updatedAt = new Date();
  await em.persistAndFlush(user);
  return user;
};
