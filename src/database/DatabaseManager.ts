import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import config from '../config/mikro-orm.config';

class DatabaseManager {
  private static instance: DatabaseManager;
  private orm: MikroORM<MySqlDriver> | null = null;

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async initialize(): Promise<MikroORM<MySqlDriver>> {
    if (!this.orm) {
      console.log('Conectando a la base de datos...');
      this.orm = await MikroORM.init<MySqlDriver>(config);
      
      // Crear el esquema de la base de datos si no existe
      const generator = this.orm.getSchemaGenerator();
      await generator.updateSchema();
      
      console.log('Conexión a la base de datos establecida');
    }
    return this.orm;
  }

  public getORM(): MikroORM<MySqlDriver> {
    if (!this.orm) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.orm;
  }

  public async close(): Promise<void> {
    if (this.orm) {
      await this.orm.close();
      this.orm = null;
    }
  }
}

export default DatabaseManager;
