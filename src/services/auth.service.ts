import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import DatabaseManager from '../database/DatabaseManager';
import { User } from '../entities/User';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

const dbManager = DatabaseManager.getInstance();

// Obtener la clave secreta del JWT
const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno');
  }
  return secret;
};

// Obtener el tiempo de expiración del JWT
const getJWTExpiresIn = (): string => {
  return process.env.JWT_EXPIRES_IN || '1h';
};

// Generar un token JWT
export const generateToken = (userId: number): string => {
  const payload = { userId };
  const secret = getJWTSecret();
  const expiresIn = getJWTExpiresIn();
  
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

// Verificar un token JWT
export const verifyToken = (token: string): { userId: number } => {
  try {
    const decoded = jwt.verify(token, getJWTSecret()) as { userId: number };
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

// Encriptar contraseña
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Comparar contraseñas
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Registrar un nuevo usuario
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
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

  // Generar token
  const token = generateToken(newUser.id);

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    token
  };
};

// Iniciar sesión
export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  // Validaciones básicas
  if (!loginData.email || !loginData.password) {
    throw new Error('Email y contraseña son requeridos');
  }

  const orm = dbManager.getORM();
  const em = orm.em.fork();

  // Buscar usuario por email
  const user = await em.findOne(User, { email: loginData.email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // Verificar contraseña
  const isPasswordValid = await comparePassword(loginData.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  // Generar token
  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    token
  };
};

// Obtener usuario por ID (para el middleware)
export const getUserByIdForAuth = async (id: number): Promise<User | null> => {
  const orm = dbManager.getORM();
  const em = orm.em.fork();
  return await em.findOne(User, { id });
};
