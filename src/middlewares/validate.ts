import { Request, Response, NextFunction } from 'express';
import Joi, { Schema, ValidationError } from 'joi';

// Tipo de ubicación a validar
type Location = 'body' | 'params' | 'query';

interface ValidateOptions {
  location?: Location; // por defecto 'body'
  schema: Schema;
  abortEarly?: boolean; // por defecto false
  stripUnknown?: boolean; // por defecto true
}

export function validate({ location = 'body', schema, abortEarly = false, stripUnknown = true }: ValidateOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[location as keyof Request];
      const value = await schema.validateAsync(data, { abortEarly, stripUnknown });

      // Reemplazar con la versión sanitizada
      // @ts-ignore - index signature para Request
      req[location] = value;
      next();
    } catch (err) {
      const error = err as ValidationError;
      const details = error?.details?.map(d => d.message.replace(/"/g, '')) || ['Datos inválidos'];
      res.status(400).json({
        success: false,
        error: details[0],
        errors: details
      });
    }
  };
}
