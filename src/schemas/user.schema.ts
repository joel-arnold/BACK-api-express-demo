import Joi from 'joi';

// Campos comunes
const idParam = Joi.number().integer().positive().required().messages({
  'number.base': 'El parámetro id debe ser numérico',
  'number.integer': 'El parámetro id debe ser un entero',
  'number.positive': 'El parámetro id debe ser positivo',
  'any.required': 'El parámetro id es requerido'
});

const name = Joi.string().trim().min(2).max(100).required().messages({
  'string.base': 'El nombre debe ser un texto',
  'string.empty': 'El nombre es requerido',
  'string.min': 'El nombre debe tener al menos {#limit} caracteres',
  'string.max': 'El nombre no puede superar {#limit} caracteres',
  'any.required': 'El nombre es requerido'
});

const email = Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
  'string.base': 'El email debe ser un texto',
  'string.email': 'El formato del email no es válido',
  'any.required': 'El email es requerido'
});

const password = Joi.string().min(6).max(18).required().messages({
  'string.base': 'La contraseña debe ser un texto',
  'string.empty': 'La contraseña es requerida',
  'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
  'string.max': 'La contraseña no puede superar {#limit} caracteres',
  'any.required': 'La contraseña es requerida'
});

// Esquemas
export const createUserSchema = Joi.object({
  name,
  email,
  password
});

export const registerUserSchema = Joi.object({
  name,
  email,
  password
});

export const loginUserSchema = Joi.object({
  email,
  password
});

export const updateUserSchema = Joi.object({
  name,
  email,
  password
});

export const idParamSchema = Joi.object({
  id: idParam
});
