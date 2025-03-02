import { Knex } from 'knex';
import path from 'path';
import { app } from 'electron';

// 动态获取数据库路径（Electron 安全目录）
const dbPath = path.join(app.getPath('userData'), 'rest-now.db');
console.log('dbPath', dbPath);
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    migrations: {
      directory: './src/database/migrations',
      extension: 'mjs',
    },
    useNullAsDefault: true,
  },
};

export default config;
