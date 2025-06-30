import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

export class ResponseHelper {
  static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message
    };
    
    if (Array.isArray(data)) {
      response.total = data.length;
    }
    
    res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode: number = 500): void {
    const response: ApiResponse = {
      success: false,
      error
    };
    
    res.status(statusCode).json(response);
  }

  static notFound(res: Response, message: string = 'Recurso no encontrado'): void {
    this.error(res, message, 404);
  }

  static badRequest(res: Response, message: string = 'Datos inválidos'): void {
    this.error(res, message, 400);
  }

  static created<T>(res: Response, data: T, message?: string): void {
    this.success(res, data, message, 201);
  }
}
