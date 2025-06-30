import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';

declare global {
  namespace NodeJS {
    interface Global {
      orm: MikroORM<MySqlDriver>;
    }
  }
  
  // Para Node.js moderno
  var orm: MikroORM<MySqlDriver>;
}

// Para compatibilidad con globalThis
declare var globalThis: typeof global & {
  orm: MikroORM<MySqlDriver>;
};

export {};
