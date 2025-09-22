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

// Esquemas
export const createUserSchema = Joi.object({
  name,
  email
});

export const registerUserSchema = Joi.object({
  name,
  email
});

export const loginUserSchema = Joi.object({
  name,
  email
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).messages({
    'string.base': 'El nombre debe ser un texto',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede superar {#limit} caracteres'
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).messages({
    'string.base': 'El email debe ser un texto',
    'string.email': 'El formato del email no es válido'
  })
}).min(1).messages({
  'object.min': 'Debe enviar al menos un campo para actualizar'
});

export const idParamSchema = Joi.object({
  id: idParam
});
